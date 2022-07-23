import 'normalize.css'
import '../styles/globals.scss'
import '../styles/Hamburger.scss'
import '../styles/Logo.scss'
import '../styles/Sidenav.scss'
import '../styles/Toggle.scss'
import '../styles/Topnav.scss'

import type { AppProps } from 'next/app'
import Layout from '../layout';

const MyApp = ({ Component, pageProps }: AppProps) => {

  return (
    <Layout {...pageProps}>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp
