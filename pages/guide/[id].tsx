import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import Editor from '@monaco-editor/react';
import React, { useCallback, useRef, useState } from 'react';
import * as monacoEditor from 'monaco-editor/esm/vs/editor/editor.api';
import Sidenav from '../../layout/Sidenav';
import { getPages, getGuideList, Page } from '../../lib/getPages';

interface PropTypes {
  defaultValue: string;
}

function CodeBlock(props: PropTypes) {
  const editorOptions = {
    scrollbar: {
      verticalHasArrows: true,
      horizontalHasArrows: true,
      vertical: 'hidden',
      horizontal: 'hidden',
      verticalScrollbarSize: 17,
      horizontalScrollbarSize: 17,
      arrowSize: 30,
      useShadows: false,
    },
    minimap: {
      enabled: false,
    },
    peekWidgetDefaultFocus: 'editor',
    scrollBeyondLastLine: false,
    lineNumbers: 'off',
    fixedOverflowWidgets: true,
  } as monacoEditor.editor.IEditorConstructionOptions;

  const MAX_HEIGHT = 600;
  const MIN_COUNT_OF_LINES = 3;
  const LINE_HEIGHT = 20;

  const [height, setHeight] = useState(170);
  const valueGetter = useRef();

  const handleEditorChange = useCallback(() => {
    const countOfLines = (valueGetter as any).current
      .getValue()
      .split('\n').length;
    if (countOfLines >= MIN_COUNT_OF_LINES) {
      const currentHeight = countOfLines * LINE_HEIGHT;
      if (MAX_HEIGHT > currentHeight) {
        setHeight(currentHeight);
      }
    }
  }, []);

  const handleEditorDidMount = useCallback(
    (editor: any) => {
      valueGetter.current = editor;
      handleEditorChange();
      editor.onDidChangeModelContent(handleEditorChange);
    },
    [handleEditorChange],
  );

  const code = props.children.props.children;
  return (
    <Editor
      height={height}
      language="javascript"
      onMount={handleEditorDidMount}
      defaultValue={code}
      options={editorOptions}
    />
  );
}

export default function Guide({ pages, pageData }: any) {
  return (
    <div className="docs">
      <Sidenav pages={pages} />
      <div className="guide">
        <MDXRemote
          {...pageData.result}
          components={{
            pre: CodeBlock,
          }}
        />
      </div>
    </div>
  );
}

export const getStaticPaths = async () => {
  const paths = await getGuideList();
  console.log(paths);
  return {
    paths,
    fallback: false,
  };
};

export async function getStaticProps({ params }: any): Promise<any> {
  const pages = await getPages();

  const currentPage = pages.find((page) => page.id === params.id);
  const result = await serialize((currentPage as Page).content);

  return {
    props: {
      pages,
      pageData: {
        id: params.id,
        result,
      },
    },
  };
}
