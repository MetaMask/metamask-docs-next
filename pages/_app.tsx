/* import '../styles/globals.css'
 * import type { AppProps } from 'next/app'
 * import Layout from '../layout';
 * import getPages from "../lib/getPages";
 *
 * export async function getInitialProps(Component: any) {
 *   return {
 *     props: {
 *       foo: "lol wtf"
 *     },
 *   }
 * }
 *
 * function MyApp({ Component, pageProps}: AppProps) {
 *   return (
 *     <Layout>
 *       <Component {...pageProps} />
 *     </Layout>
 *   );
 * }
 *
 * MyApp.getInitialProps = getInitalProps;
 *
 * export default MyApp; */
import React from 'react'
import App from 'next/app'
import Layout from '../layout';

export default class MyApp extends App {
  render () {
    const { Component, pageProps } = this.props

    return (
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    );

  }

}
