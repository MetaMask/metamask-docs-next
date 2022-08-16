import { GetStaticPaths, GetStaticProps } from 'next';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { getPageForSlug, getPages, getTOC, Page } from '../lib/getPages';
import getCodeBlockModules, {
  extractCodeBlocks,
  getCompiledWebpack,
} from '../lib/getCodeBlockModules';
import Sidenav from '../layout/Sidenav';
import Tip from '../components/Tip';
import Warning from '../components/Warning';
import makeCodeBlock from '../components/mdx/CodeBlock';

export default function Guide({
  toc,
  serializedPage,
  depModules,
  codeBlockMap,
}: any) {
  return (
    <div className="docs">
      <Sidenav toc={toc} />
      <div className="guide">
        <MDXRemote
          {...serializedPage}
          components={{
            pre: makeCodeBlock(depModules, codeBlockMap),
            Tip,
            Warning,
          }}
        />
      </div>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = (await getPages()).map((page: Page) => {
    return {
      params: {
        slug: page.slug,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<any, any> = async (context) => {
  const page = await getPageForSlug(context.params.slug);
  console.log(page);

  const serializedPage = await serialize(page.content);

  const codeBlocks = await extractCodeBlocks(page.content);
  const depModules = await getCodeBlockModules(codeBlocks);

  const codeBlockMap: any = {};

  for (const block of codeBlocks) {
    const { code, language } = block;
    const codeBlockStrings = await getCompiledWebpack(code, language as any);
    codeBlockMap[code.toString()] = codeBlockStrings;
  }

  return {
    props: {
      toc: await getTOC(),
      page,
      serializedPage,
      depModules,
      codeBlockMap,
    },
  };
};
