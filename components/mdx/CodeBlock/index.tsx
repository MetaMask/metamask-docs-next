import { inspect } from 'util';
import * as monacoEditor from 'monaco-editor/esm/vs/editor/editor.api';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import { CodeBlock, MonacoModule } from '../../../lib/getCodeBlockModules';

export interface CodeBlockProps {
  children: React.ReactElement;
  defaultValue: string;
}

const backwardsLanguageMap = {
  ts: 'typescript',
  js: 'javascript',
} as { [key: string]: string };

export default function makeCodeBlock(
  depModules: MonacoModule[],
  codeBlocks: CodeBlock[],
) {
  return function CodeBlockComponent(props: CodeBlockProps) {
    const code = props.children.props.children;
    const codeBlock = codeBlocks.find((b) => b.code === code);
    if (codeBlock === undefined) {
      throw new Error(
        `Cannot find a code block matching the code for snippet: ${code}`,
      );
    }

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
      // should prolly throw somewhere before we get this far
      if (codeBlock.webpackBundle === undefined) {
        throw new Error(`Cannot find webpack bundle for code block ${code}`);
      }
      // these are used to override the console.log and console.error inside the example
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const consoleLog = hackedLog('log');
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const consoleError = hackedLog('error');
      // eslint-disable-next-line no-eval
      eval(
        codeBlock.webpackBundle
          .replace(/console.log/gu, 'consoleLog')
          .replace(/console.error/gu, 'consoleError'),
      );
    };

    useEffect(() => {
      if (codeBlock.options.autorun) {
        runExample();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <>
        {codeBlock.options.norun === false && (
          <button onClick={runExample}>Run</button>
        )}
        <Editor
          height={height}
          language={
            backwardsLanguageMap[codeBlock.language] || codeBlock.language
          }
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
