import getPages, { getGuideList } from '../../lib/getPages';
import Sidenav from '../../layout/Sidenav';
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import path from 'path';
import fs from "fs";

const pagesDirectory = path.join(process.cwd(), 'guide')

export default function Guide({ pages, pageData }: any) {
  console.log('pageData', pageData);
  return (
    <div className="docs">
      <Sidenav pages={pages} />
      <div className="guide">
          <MDXRemote {...pageData.result} />
      </div>
    </div>
  );
}

export const getStaticPaths = async() => {
  const paths = await getGuideList();
  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({ params }: any) {
  const pages = await getPages();
  const fullPath = path.join(pagesDirectory, `${params.id}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const result = await serialize(fileContents);
  // TODO: get frontmatter

  return { 
    props: {
      pages,
      pageData: {
        id: params.id,
        result
      }
    }
  };
}
