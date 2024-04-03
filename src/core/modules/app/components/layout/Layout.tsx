import "./layout.scss";

import { FC, ReactNode } from "react";

import Footer from "../footer/Footer";
import Header from "../header/Header";

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
