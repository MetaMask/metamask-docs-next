import { GetStaticPaths, GetStaticProps } from 'next';
import getPages, { getGuideContent, getGuideList } from '../../lib/getPages';

export default function Guide({ pageContent }: any) {
  return (
    <article>
    Hello world!
    {/* <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
        <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} /> */}
      </article>
  );
}

export const getStaticPaths: GetStaticPaths = async() => {
  const paths = await getGuideList();
  console.log(paths);
  return {
    paths,
    fallback: false
  };
}

export const getStaticProps: GetStaticProps = async({ params }) => {
  const pages = await getPages();
  const content = await getGuideContent((params as any).guide);

  return { props: { pages, pageContent: content }};
}
