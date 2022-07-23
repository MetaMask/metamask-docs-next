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
