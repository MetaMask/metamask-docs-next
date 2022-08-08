/* eslint-disable import/no-unassigned-import */
import { ThemeProvider } from 'next-themes';
import 'normalize.css';
import '../styles/index.scss';

import type { AppProps } from 'next/app';
import Layout from '../layout';


const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider>
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
};

export default MyApp;
