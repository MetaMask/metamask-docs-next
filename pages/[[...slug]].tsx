import { GetStaticPaths, GetStaticProps } from 'next';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { useRouter } from 'next/router';
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
  redirectClientSide,
  toc,
  serializedPage,
  depModules,
  codeBlockMap,
}: any) {
  const router = useRouter();

  if (redirectClientSide && typeof window !== 'undefined') {
    router.push(redirectClientSide);
    return null;
  }

  if (!toc && !serializedPage) {
    return null;
  }
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
  // params slug: 'guide'

  return {
    paths: paths.concat([
      { params: { slug: [] } },
      { params: { slug: ['guide'] } },
    ]),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<any, any> = async (context) => {
  if (!context.params.slug || context.params.slug?.length === 0) {
    return {
      props: {
        redirectClientSide: 'home',
      },
    };
  }

  const toc = await getTOC();

  if (context.params.slug?.length === 1) {
    const tocGroup = toc.find((g) => g.pathPrefix === context.params.slug[0]);
    const newRouteItem = tocGroup?.items.find((p) => p.order === 0);
    return {
      props: {
        redirectClientSide: newRouteItem?.route,
      },
    };
  }
  const page = await getPageForSlug(context.params.slug);

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
      toc,
      page,
      serializedPage,
      depModules,
      codeBlockMap,
    },
  };
};
