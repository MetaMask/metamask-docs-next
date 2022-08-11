import { inspect } from 'util';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import Editor from '@monaco-editor/react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as monacoEditor from 'monaco-editor/esm/vs/editor/editor.api';
import { GetStaticProps } from 'next';
import Sidenav from '../../layout/Sidenav';
import { getPages, getGuideList, Page } from '../../lib/getPages';
import getCodeBlockModules, {
  getCompiledWebpack,
  MonacoModule,
} from '../../lib/getCodeBlockModules';
import Tip from '../../components/Tip';
import Warning from '../../components/Warning';

interface CodeBlockProps {
  children: React.ReactElement;
  defaultValue: string;
}

function makeCodeBlock(depModules: MonacoModule[], codeBlockMap: any) {
  // which block am i??
  // who am i?
  // compare children.text
  return function CodeBlock(props: CodeBlockProps) {
    const opts = props.children.props.className.replace('language-', '');
    const lang = opts.split('-')[0];
    const autorun = Boolean(opts.split('-')[1]);
    const code = props.children.props.children;

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
      lineNumbers: 'on',
      fixedOverflowWidgets: true,
      theme: 'vs-dark',
    } as monacoEditor.editor.IEditorConstructionOptions;

    const MAX_HEIGHT = Infinity;
    const MIN_COUNT_OF_LINES = 3;
    const LINE_HEIGHT = 20;

    const [height, setHeight] = useState(170);
    const valueGetter = useRef();

    const [logs, setLogs] = useState<any[]>([]);

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
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleEditorDidMount = useCallback(
      (editor: any, monaco: any) => {
        depModules.forEach((depModule) => {
          monaco.languages.typescript.typescriptDefaults.addExtraLib(
            depModule.content,
            `file:///node_modules/${depModule.name}`,
          );

          depModule.impls.forEach((impl) => {
            monaco.languages.typescript.typescriptDefaults.addExtraLib(
              impl.content,
              `file:///${impl.filename}`,
            );
          });
        });

        monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
          target: monaco.languages.typescript.ScriptTarget.ES2022,
          moduleResolution:
            monaco.languages.typescript.ModuleResolutionKind.NodeJs,
          module: monaco.languages.typescript.ModuleKind.ES2022,
          allowNonTsExtensions: true,
          allowJs: true,
          checkJs: true,
        });

        monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
          module: monaco.languages.typescript.ModuleKind.ESNext,
          target: monaco.languages.typescript.ScriptTarget.ESNext,
          allowNonTsExtensions: true,
          moduleResolution:
            monaco.languages.typescript.ModuleResolutionKind.NodeJs,
          esModuleInterop: true,
          noEmit: false,
        });

        // compile ts to js - use this for codeblocks with tabbed transpilation of examples
        /* let tsProxy: any;

         * monaco.languages.typescript
         *   .getTypeScriptWorker()
         *   .then(function (worker: any) {
         *     worker(editor.getModel().uri).then(function (proxy: any) {
         *       tsProxy = proxy;
         *       tsProxy
         *         .getEmitOutput(editor.getModel().uri.toString())
         *         .then((r: any) => {
         *           const js = r.outputFiles[0].text;
         *         });
         *     });
         *   }); */

        valueGetter.current = editor;
        handleEditorChange();
        editor.onDidChangeModelContent(handleEditorChange);
      },
      [handleEditorChange],
    );

    const hackedLog = (level: 'log' | 'error') => {
      return (...things: any) => {
        console.log('Paynus');
        (console as any)[level](...things);

        setLogs((lastLog) => {
          return [
            ...lastLog,
            {
              line: things
                .map((t: any) => {
                  if (typeof t === 'object' && Array.isArray(t) === false) {
                    const copy: any = {};
                    Object.keys(t)
                      .filter((k) => !k.startsWith('_'))
                      .forEach((k) => (copy[k] = t[k]));

                    return inspect(copy, {
                      depth: 1,
                      showHidden: false,
                      showProxy: false,
                    });
                  }

                  if (typeof t === 'string') {
                    return t;
                  }

                  return inspect(t, {
                    depth: 1,
                    showHidden: false,
                    showProxy: false,
                  });
                })
                .join(' '),
              level,
            },
          ];
        });
      };
    };

    const runExample = () => {
      // these are used to override the console.log and console.error inside the example
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const consoleLog = hackedLog('log');
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const consoleError = hackedLog('error');
      // eslint-disable-next-line no-eval
      eval(
        codeBlockMap[code]
          .replace(/console.log/gu, 'consoleLog')
          .replace(/console.error/gu, 'consoleError'),
      );
    };

    useEffect(() => {
      if (autorun) {
        runExample();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <>
        {autorun === false && <button onClick={runExample}>Run</button>}
        <Editor
          height={height}
          language={lang}
          onMount={handleEditorDidMount}
          defaultValue={code}
          options={editorOptions}
        />
        {logs.length > 0 && (
          <div className="log-lines">
            <div className="log-lines-controls">
              Console <button onClick={() => setLogs([])}>Clear</button>
            </div>
            <div className="log-lines-container">
              {logs.map((ll, index) => {
                return (
                  <li className="no-style dense" key={index}>
                    <pre key={index}>{ll.line}</pre>
                    <hr />
                  </li>
                );
              })}
            </div>
          </div>
        )}
      </>
    );
  };
}

export default function Guide({
  pages,
  pageData,
  depModules,
  codeBlockMap,
}: any) {
  return (
    <div className="docs">
      <Sidenav pages={pages} />
      <div className="guide">
        <MDXRemote
          {...pageData.result}
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

export const getStaticPaths = async () => {
  const paths = await getGuideList();
  return {
    paths,
    fallback: false,
  };
};

const importRegex =
  /(?:(?:(?:import)|(?:export))(?:.)*?from\s+["']([^"']+)["'])|(?:require(?:\s+)?\(["']([^"']+)["']\))|(?:\/+\s+<reference\s+path=["']([^"']+)["']\s+\/>)/gmu;
const codeBlockRegex =
  /```(js|javascript|typescript|ts)(?:-autorun)?\n([\s\S]*?)```$/gmu;

export interface CodeBlock {
  imports: string[];
  language: string;
  code: string;
}

export const getStaticProps: GetStaticProps<any, any> = async (context) => {
  const pages = await getPages();

  const currentPage = pages.find((page) => page.id === context.params.id);
  const result = await serialize((currentPage as Page).content);

  const codeBlocks = Array.from(
    (currentPage as Page).content.matchAll(codeBlockRegex),
  ).map(([, language, code]) => ({ language, code }));

  const imports: CodeBlock[] = codeBlocks?.map((block) => {
    const arr = Array.from(block.code.matchAll(importRegex));
    const localImports: string[] = [];

    arr.forEach((item) => {
      localImports.push(item[1]);
    });

    return {
      ...block,
      imports: localImports,
    };
  });

  // get code blocks from markdown
  const depModules = await getCodeBlockModules(imports);
  const codeBlockMap: any = {};

  for (const block of codeBlocks) {
    const { code, language } = block;
    const codeBlockStrings = await getCompiledWebpack(code, language as any);
    codeBlockMap[code.toString()] = codeBlockStrings;
  }

  return {
    props: {
      pages,
      pageData: {
        id: context.params.id,
        result,
      },
      depModules,
      codeBlockMap,
    },
  };
};
