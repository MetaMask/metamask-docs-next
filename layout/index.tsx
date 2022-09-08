import Head from "next/head";

import Logo from "./Logo";
import Foot from "./Foot";
import Nav from "../components/Nav";

interface PropTypes {
  children: React.ReactNode;
  pages: string[];
}

const Layout = ({ children }: PropTypes) => {
  return (
    <>
      <Head>
        <title>MetaMask Docs</title>
        <meta
          name="description"
          content="MetaMask API Methods in Real World React Components"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <div className="app-container">
        <main>
          <Nav>
            <section className="flex flex-1 flex-col lg:pl-64">
              {children}
            </section>
          </Nav>
          <footer>
            <Foot />
          </footer>
        </main>
      </div>
    </>
  );
};

export default Layout;
