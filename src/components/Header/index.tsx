import Link from "next/link";
import {Logo} from "../icons/Logo";
import "./style.scss";
import {Source_Code_Pro} from "next/font/google";

const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-header-code",
});

export const Header = () => {
  return (
    <header className={sourceCodePro.variable}>
      <div id="logo-block">
        <Logo width={60} height={60} />
        <Link href="/">Coin Scraper</Link>
      </div>
    </header>
  );
};
