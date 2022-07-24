import getPages, { getGuideList } from '../../lib/getPages';
import Sidenav from '../../layout/Sidenav'

export default function Guide({ pages }: any) {
  return (
    <div className="docs">
      <Sidenav pages={pages} />
      <div className="guide">
        <span>Markdown goes here?</span>
      </div>
      {/* <h1 className={utilStyles.headingXl}>{postData.title}</h1>
          <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
          </div>
          <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} /> */}
    </div>
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
