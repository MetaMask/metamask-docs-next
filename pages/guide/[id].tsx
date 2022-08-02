import getPages, { getGuideList, Page } from '../../lib/getPages';
import Sidenav from '../../layout/Sidenav';
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import Editor from "@monaco-editor/react";
import React, {useCallback, useRef, useState} from 'react';
import * as monacoEditor from 'monaco-editor/esm/vs/editor/editor.api';

type PropTypes = {
  defaultValue: string,
};

function CodeBlock(props: any) {
  const editorOptions = {
    scrollbar: {
      // Render vertical arrows. Defaults to false.
      verticalHasArrows: true,
      // Render horizontal arrows. Defaults to false.
      horizontalHasArrows: true,
      // Render vertical scrollbar.
      // Accepted values: 'auto', 'visible', 'hidden'.
      // Defaults to 'auto'
      vertical: "hidden",
      // Render horizontal scrollbar.
      // Accepted values: 'auto', 'visible', 'hidden'.
      // Defaults to 'auto'
      horizontal: "hidden",
      verticalScrollbarSize: 17,
      horizontalScrollbarSize: 17,
      arrowSize: 30,
      useShadows: false,
    },
    minimap: {
      enabled: false,
    },
    showFoldingControls: "never",
    peekWidgetDefaultFocus: "editor",
    scrollBeyondLastLine: false,
    lineNumbers: "off",
    fixedOverflowWidgets: true,
  } as monacoEditor.editor.IEditorConstructionOptions;

  const MAX_HEIGHT = 600;
  const MIN_COUNT_OF_LINES = 3;
  const LINE_HEIGHT = 19;

  const [height, setHeight] = useState(170);
  const valueGetter = useRef();

  const handleEditorChange = useCallback(() => {
    console.log("handle editor change");
    const countOfLines = (valueGetter as any).current.getValue().split("\n").length;
    if (countOfLines >= MIN_COUNT_OF_LINES) {
      const currentHeight = countOfLines * LINE_HEIGHT;
      if (MAX_HEIGHT > currentHeight) {
        setHeight(currentHeight);
      }
    }
  }, []);

  const handleEditorDidMount = useCallback((editor: any) => {
    valueGetter.current = editor;
    handleEditorChange();
    editor.onDidChangeModelContent(handleEditorChange);
  }, [handleEditorChange]);

  const code = props.children.props.children;
  console.log(code);

  return (
    <Editor
      height={height}
      language="javascript"
      onMount={handleEditorDidMount}
      defaultValue={props.children.props.children}
      options={editorOptions}
    />
  );
}

export default function Guide({ pages, pageData }: any) {
  return (
    <div className="docs">
      <Sidenav pages={pages} />
      <div className="guide">
        <MDXRemote {...pageData.result} components={{
          pre:CodeBlock
        }} />
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

export async function getStaticProps({ params }: any) {
  const pages = await getPages();
  const page = pages.find((page) => page.id === params.id);
  console.log(params.id);
  if (page === undefined) {
    console.log("404");
    return;
  }
  const result = await serialize(page.content);
  // TODO: get frontmatter

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
