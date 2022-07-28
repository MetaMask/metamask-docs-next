import { useContext, useState } from 'react'
import Head from 'next/head';
import { AppContext } from '../context/AppContext';
import { useRouter } from 'next/router'

import Logo from './Logo';
import Topnav from './Topnav';
import Foot from './Foot';

type PropTypes = {
  children: React.ReactNode,
  pages: string[],
};

const Layout = ({ children, pages }: PropTypes) => {
  const context = useContext(AppContext)
  const { asPath } = useRouter()
  let subRouteTitle:string, match:any
  let rootPath = true

  // this is horrible, just trying to find out how to find the route so we can display in <title>
  if (asPath !== '/') {
    rootPath = false
    const regexMatchPathGroups = /^\/(?=\S*['-])([a-zA-Z'-]+)\/(?=\S*['-])([a-zA-Z'-]+)$/
    match = regexMatchPathGroups.exec(asPath)
    subRouteTitle = match[2].replace('-', ' ')
  }

  return (
    <>
      <Head>
        <title>MetaMask Docs{!rootPath ? ` | ${subRouteTitle}` : ''}</title>
        <meta name="description" content="MetaMask API Methods in Real World React Components" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <div className="app-container" data-theme={context.themeMode}>
        <main>
          <header>
            <Logo />
            <Topnav />
          </header>
          <section>
            {children}
          </section>
          <footer>
            <Foot />
          </footer>
        </main>
      </div>

    </>
  );
}

export default Layout;
