import React from 'react'
import App from 'next/app'
import Layout from '../../layout';
import getPages, { getGuideList } from '../../lib/getPages';

export default function Guide({ pages }: any) {
  return (
    <article>
    Hello world!
    {/* <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
        <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} /> */}
      </article>
  )
}

export async function getStaticPaths() {
  const paths = await getGuideList();
  console.log(paths);
  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps() {
  const pages = await getPages();

  return { props: { pages }};
}
