import 'normalize.css';
import '../styles/index.scss'

import { AppProvider } from '../context/AppContext'

import type { AppProps } from 'next/app';
import Layout from '../layout';

const MyApp = ({ Component, pageProps }: AppProps) => {

  return (
    <AppProvider>
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    </AppProvider>
  );
}

export default MyApp;
