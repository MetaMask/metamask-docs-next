import getPages, { getGuideList, Page } from '../../lib/getPages';
import Sidenav from '../../layout/Sidenav';
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import path from 'path';
import Editor from "@monaco-editor/react";
import {renderToStaticMarkup} from 'react-dom/server';
import React from 'react';
import * as monacoEditor from 'monaco-editor/esm/vs/editor/editor.api';

const pagesDirectory = path.join(process.cwd(), 'guide');

type PropTypes = {
  children: React.ReactElement,
  defaultValue: string,
};


const LINE_HEIGHT = 18;
const DEFAULT_STATE = {
    editor: undefined as unknown as monacoEditor.editor.ICodeEditor,
    prevLineCount: -1
}

class InlineMonacoEditor extends React.Component<PropTypes, typeof DEFAULT_STATE> {
    constructor(props: PropTypes) {
        super(props);
        this.state = DEFAULT_STATE;
    }

    componentWillUnmount() {
        if (window) {
            window.removeEventListener('resize', this.setEditorHeight);
        }
    }

    render() {
        // override a word wrapping, disable and hide the scroll bars
        const optionsOverride = {
            wordWrap: 'on',
            scrollBeyondLastLine: false,
            scrollbar: {
                vertical: 'hidden',
                horizontal: 'hidden',
            },
        } as monacoEditor.editor.IEditorConstructionOptions;

        return (
            <Editor
                {...this.props}
              defaultLanguage="javascript"
                onMount={this.editorDidMount()}
                options={optionsOverride} />
        );
    }

    private editorDidMount(): any {
        return (editor: any, monaco: any) => {
            // put the edit in the state for the handler.
            this.setState({ editor });

            // do the initial set of the height (wait a bit)
            setTimeout(this.setEditorHeight, 0);

            // adjust height when the window resizes
            if (window) {
                window.addEventListener("resize", this.setEditorHeight);
            }

            // on each edit recompute height (wait a bit)
            editor.onDidChangeModelDecorations(() => {
                setTimeout(this.setEditorHeight, 0)
            });
        };
    }

    setEditorHeight = (() => {
        const { editor, prevLineCount } = this.state;
        if (!editor) { return; }
        const editorDomNode = editor.getDomNode();
        if (!editorDomNode) { return; }
        const container = editorDomNode.getElementsByClassName('view-lines')[0] as HTMLElement;
        const containerHeight = container.offsetHeight;
        const lineHeight = container.firstChild
            ? (container.firstChild as HTMLElement).offsetHeight
            : LINE_HEIGHT;

        if (!containerHeight) {
            // dom hasn't finished settling down. wait a bit more.
            setTimeout(this.setEditorHeight, 0);
        } else {
            const currLineCount = container.childElementCount;
            const nextHeight = (prevLineCount > currLineCount)
                // if line count is shrinking monaco tends to leave the extra
                // space at the end, compute the height from the line count
                ? currLineCount * lineHeight
                // otherwise use the height of the container div as the height
                // of the editor node
                : containerHeight;

            // set the height and redo layout
            editorDomNode.style.height = nextHeight + 'px';
            editor.layout();

            // double check that layout didn't change things too much
            if (container.childElementCount !== currLineCount) {
                this.setEditorHeight();
            } else {
                this.setState({ prevLineCount: currLineCount })
            }
        }
    }).bind(this);// bind now so addEventListener/removeEventListener works.
}

function CodeBlock({children}: PropTypes) {
  return (
    <InlineMonacoEditor
      defaultValue={renderToStaticMarkup(children)}
    />
  );
}

export default function Guide({ pages, pageData }: any) {
  return (
    <div className="docs">
      <Sidenav pages={pages} />
      <div className="guide">
        <MDXRemote {...pageData.result} components={{
          code:CodeBlock
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
