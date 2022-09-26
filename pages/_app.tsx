import type { AppProps } from 'next/app';
import { CmdProvider } from '../components/CmdProvider';
import Layout from '../components/MainLayout';
import 'styles/globals.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <CmdProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CmdProvider>
  );
};

export default MyApp;
