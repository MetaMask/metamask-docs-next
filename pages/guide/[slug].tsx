import fs from 'fs-extra';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import matter from 'gray-matter';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { serialize } from 'next-mdx-remote/serialize';

import type { PageMeta } from 'lib/getPages';
import { CodeBlockComponent } from 'components/mdx/CodeBlock';
import Tip from 'components/Tip';
import Warning from 'components/Warning';
import DocsLayout from 'components/DocsLayout';
import getCodeBlockModules, {
  CodeBlock,
  extractCodeBlocks,
  MonacoModule,
} from 'lib/getCodeBlockModules';

interface Props {
  meta: PageMeta;
  content: string;
  serializedPage: MDXRemoteSerializeResult;
  codeBlocks: CodeBlock[];
  depModules: MonacoModule[];
}

const Page: NextPage<Props> = ({
  meta,
  // content,
  serializedPage,
  codeBlocks,
  depModules,
}) => {
  return (
    <DocsLayout title={meta.title}>
      <MDXRemote
        {...serializedPage}
        components={{
          pre: (props: any) => (
            <CodeBlockComponent
              {...props}
              codeBlocks={codeBlocks}
              depModules={depModules}
            />
          ),
          Tip: (props) => <Tip {...props} />,
          Warning,
        }}
      />
    </DocsLayout>
  );
};

export default Page;

/**
 * It reads the `/guide` directory, filters out all files that don't end with `.mdx`, and then returns
 * an array of objects with the `slug` property
 *
 * @returns An object with a paths property.
 */
export const getStaticPaths: GetStaticPaths = async () => {
  const pagesFiles = await fs.readdir('content/guide');
  const pages = pagesFiles
    .filter((file) => file.endsWith('mdx'))
    .map((file) => file.replace('.mdx', ''));
  const paths = pages.map((page) => ({
    params: { slug: page },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params?.slug) {
    return {
      notFound: true,
    };
  }

  const file = await fs.readFile(`content/guide/${params.slug}.mdx`);

  const result = matter(file);

  const serializedPage = await serialize(result.content);

  const codeBlocks = await extractCodeBlocks(result.content);
  const depModules = await getCodeBlockModules(codeBlocks);

  return {
    props: {
      meta: result.data,
      content: result.content,
      serializedPage,
      codeBlocks,
      depModules,
    },
  };
};
