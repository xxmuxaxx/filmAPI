import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const root = path.resolve("src");
const layers = ["app", "pages", "widgets", "features", "entities", "shared"];
const violations = [];

function filesIn(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory()
      ? filesIn(file)
      : /\.tsx?$/.test(file)
        ? [file]
        : [];
  });
}

function checkImport(file, source, node, specifier) {
  const from = path.relative(root, file).split(path.sep);
  if (!layers.includes(from[0])) return;

  const isRelative = specifier.startsWith(".");
  const target = isRelative
    ? path
        .relative(root, path.resolve(path.dirname(file), specifier))
        .split(path.sep)
    : specifier.split("/");

  const report = (message) => {
    const { line } = source.getLineAndCharacterOfPosition(
      node.getStart(source)
    );
    violations.push(
      `${path.relative(process.cwd(), file)}:${line + 1}: ${message}: ${specifier}`
    );
  };

  if (["core", "modules", "config"].includes(target[0])) {
    report("Импорт удалённой архитектуры");
    return;
  }
  if (!layers.includes(target[0])) return;

  const sameSlice = from[0] === target[0] && from[1] === target[1];
  if (layers.indexOf(target[0]) < layers.indexOf(from[0])) {
    report("Импорт из вышестоящего слоя");
  } else if (
    from[0] === target[0] &&
    !["app", "shared"].includes(from[0]) &&
    !sameSlice
  ) {
    report("Импорт соседнего среза");
  }

  if (sameSlice && !["app", "shared"].includes(from[0]) && !isRelative) {
    report("Внутри среза нужен относительный импорт");
  }
  if (from[0] !== target[0] || !sameSlice) {
    if (
      ["pages", "widgets", "features", "entities"].includes(target[0]) &&
      target.length !== 2
    ) {
      report("Внешний импорт должен использовать публичный API среза");
    }
    if (target[0] === "shared" && target[1] === "ui" && target.length !== 3) {
      report("Используйте публичный API UI-компонента");
    }
    if (
      target[0] === "shared" &&
      ["api", "config"].includes(target[1]) &&
      target.length !== 2
    ) {
      report("Используйте публичный API shared-сегмента");
    }
  }
}

for (const file of filesIn(root)) {
  const source = ts.createSourceFile(
    file,
    fs.readFileSync(file, "utf8"),
    ts.ScriptTarget.Latest,
    true
  );
  const visit = (node) => {
    if (
      (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) &&
      node.moduleSpecifier &&
      ts.isStringLiteral(node.moduleSpecifier)
    ) {
      checkImport(file, source, node, node.moduleSpecifier.text);
    }
    if (
      ts.isCallExpression(node) &&
      node.expression.kind === ts.SyntaxKind.ImportKeyword &&
      node.arguments[0] &&
      ts.isStringLiteral(node.arguments[0])
    ) {
      checkImport(file, source, node, node.arguments[0].text);
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
}

if (violations.length) {
  console.error(violations.join("\n"));
  process.exitCode = 1;
} else {
  console.log("Границы слоёв и публичные API: OK");
}
