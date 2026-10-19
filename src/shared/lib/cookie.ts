const getCookie = (name: string) => {
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" + name.replace(/([.$?*|{}()[\]\\/+^])/g, "\\$1") + "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

type CookieOptions = Record<string, string | number | boolean | Date>;

const setCookie = (
  name: string,
  value: string,
  options: CookieOptions = {}
) => {
  const allOptions: CookieOptions = { path: "/", ...options };

  let updatedCookie =
    encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (const [optionKey, optionValue] of Object.entries(allOptions)) {
    updatedCookie += "; " + optionKey;
    if (optionValue !== true) {
      updatedCookie +=
        "=" +
        (optionValue instanceof Date ? optionValue.toUTCString() : optionValue);
    }
  }

  document.cookie = updatedCookie;
};

const deleteCookie = (name: string) => {
  setCookie(name, "", {
    "max-age": -1,
  });
};

export { deleteCookie, getCookie, setCookie };
