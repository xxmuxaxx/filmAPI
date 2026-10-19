import "./footer.scss";

import { Logo } from "shared/ui/logo";
import { FC } from "react";

const Footer: FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__wrapper">
          <Logo variant="black" />
          <div className="footer__copyright">
            <span>Разработано в студии</span>
            <span>Не твоих собачьих дел</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
