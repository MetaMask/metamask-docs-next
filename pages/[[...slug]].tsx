import { GetStaticPaths, GetStaticProps } from 'next';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { useRouter } from 'next/router';
import * as mdx from '@mdx-js/react';
import { getPageForSlug } from '../lib/getPages';
import getCodeBlockModules, {
  CodeBlock,
  extractCodeBlocks,
  MonacoModule,
} from '../lib/getCodeBlockModules';
import Sidenav from '../layout/Sidenav';
import Tip from '../components/Tip';
import Warning from '../components/Warning';
import makeCodeBlock from '../components/mdx/CodeBlock';
import { getTOC, TOCGroup } from '../lib/getTOC';

type MDXComponents = React.ComponentProps<typeof mdx.MDXProvider>['components'];

interface Props {
  redirectClientSide?: string;
  toc?: TOCGroup[];
  serializedPage?: MDXRemoteSerializeResult;
  depModules?: MonacoModule[];
  codeBlocks?: CodeBlock[];
}

export default function Guide({
  redirectClientSide,
  toc,
  serializedPage,
  depModules,
  codeBlocks,
}: Props) {
  const router = useRouter();
  if (redirectClientSide && typeof window !== 'undefined') {
    router.push(redirectClientSide);
    return null;
  }

  if (
    toc === undefined ||
    serializedPage === undefined ||
    depModules === undefined ||
    codeBlocks === undefined
  ) {
    return null;
  }

  return (
    <div className="docs">
      <Sidenav toc={toc} />
      <div className="guide">
        <MDXRemote
          {...serializedPage}
          components={
            {
              pre: makeCodeBlock(depModules, codeBlocks),
              Tip,
              Warning,
            } as MDXComponents
          }
        />
      </div>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const toc = await getTOC();
  const paths = [{ params: { slug: [] } }] as any;

  toc.forEach((group) => {
    paths.push({ params: { slug: [group.pathPrefix] } });

    group.items.forEach((page) => {
      paths.push({
        params: {
          slug: page.slug,
        },
      });
    });
  });

  return {
    paths,
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

  return {
    props: {
      toc,
      page,
      serializedPage,
      depModules,
      codeBlocks,
    },
  };
};
