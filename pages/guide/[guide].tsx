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
  );
}

export const getStaticPaths = async() => {
  const paths = await getGuideList();
  console.log(paths);
  return {
    paths,
    fallback: false
  };
}

export const getStaticProps = async() => {
  const pages = await getPages();

  return { props: { pages }};
}
