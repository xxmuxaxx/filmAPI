import "./layout.scss";

import { FC, ReactNode } from "react";

import { Footer } from "widgets/footer";
import { Header } from "widgets/header";

const Layout: FC<{ children?: ReactNode }> = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
