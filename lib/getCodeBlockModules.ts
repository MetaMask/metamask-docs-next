import { promisify } from 'util';
import path from 'path';
import fs from 'fs';
import _glob from 'glob';
import _webpack from 'webpack';

const readFile = promisify(fs.readFile);
const glob = promisify(_glob);
const rmDir = promisify(fs.rm);
const webpack = promisify(_webpack);
const mkdtemp = promisify(fs.mkdtemp);

export interface MonacoLib {
  filename: string;
  content: string;
}

export interface MonacoModule {
  name: string;
  content: string;
  impls: MonacoLib[];
}

export interface CodeBlockOptions {
  autorun: boolean;
  norun: boolean;
}

export interface CodeBlock {
  imports: string[];
  language: Language;
  options: CodeBlockOptions;
  webpackBundle?: string;
  code: string;
}

const codeBlockRegex = /```([\s\S]*?)\n([\s\S]*?)```$/gmu;
const importRegex =
  /(?:(?:(?:import)|(?:export))(?:.)*?from\s+["']([^"']+)["'])|(?:require(?:\s+)?\(["']([^"']+)["']\))|(?:\/+\s+<reference\s+path=["']([^"']+)["']\s+\/>)/gmu;

const languageMap = {
  typescript: 'ts',
  javascript: 'js',
} as { [key: string]: string };

const extractImports = (code: string): string[] => {
  return Array.from(code.matchAll(importRegex)).map((item) => item[1]);
};

export type Language = 'js' | 'ts';

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (
  codeBlocks: CodeBlock[],
): Promise<MonacoModule[]> {
  const mods: MonacoModule[] = [];

  for (const codeBlock of codeBlocks) {
    const libs: { [k: string]: MonacoLib[] } = {};

    for (const libName of codeBlock.imports) {
      const pagePaths = await glob(`node_modules/${libName}/**/*.d.ts`);
      const implPaths = await glob(`node_modules/${libName}/**/*.js`);

      for (const pagePath of pagePaths) {
        if (libs[libName] === undefined) {
          libs[libName] = [];
        }

        libs[libName].push({
          filename: pagePath,
          content: await readFile(pagePath, 'utf8'),
        });
      }

      const libImpls: { [k: string]: MonacoLib[] } = {};
      for (const implPath of implPaths) {
        if (libImpls[libName] === undefined) {
          libImpls[libName] = [];
        }

        libImpls[libName].push({
          filename: implPath,
          content: await readFile(implPath, 'utf8'),
        });
      }

      Object.keys(libs).forEach((libFile) => {
        mods.push({
          content: [
            `declare module '${libName}' {`,
            libs[libFile].map((l) => l.content).join('\n'),
            '}',
          ].join('\n'),
          impls: libImpls[libName],
          name: libName,
        });
      });
    }
  }

  return mods;
}

const forceEsm = (source: string): string => {
  const lines = source.trim().split('\n');
  for (const line of lines) {
    if (line.startsWith('import') || line.startsWith('export')) {
      return source;
    }
  }

  return `${source} \n export {};`;
};

export const getCompiledWebpack = async (
  sourceCode: string,
  language: Language,
): Promise<string> => {
  // write source code to a temp file
  const tempFile = `index.${language || 'js'}`;
  const tmpPath = await mkdtemp(`codeblock-`);
  await fs.promises.writeFile(
    path.resolve(tmpPath, tempFile),
    // add export to force webpack::module.type: "javascript/esm"
    forceEsm(sourceCode),
    'utf8',
  );
  const entry = `./${tmpPath}/${tempFile}`;

  const stats = await webpack({
    entry,
    experiments: {
      topLevelAwait: true,
    },
    optimization: {
      removeAvailableModules: false,
      minimize: false,
      minimizer: [],
      removeEmptyChunks: false,
      splitChunks: false,
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/u,
          use: [
            {
              loader: 'ts-loader',
              options: {
                configFile: 'codeblock.tsconfig.json',
              },
            },
          ],
          exclude: /node_modules/u,
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      alias: {},
    },
    output: {
      path: path.resolve(tmpPath, 'dist'),
      filename: 'bundle.js',
    },
  } as any);

  if ((stats as any).compilation.errors.length > 0) {
    await rmDir(tmpPath, { recursive: true });
    throw new Error(
      (stats as any).compilation.errors
        .map((e: any) => e.toString())
        .join('\n'),
    );
  }

  const resultPath = path.resolve(tmpPath, 'dist', 'bundle.js');
  const result = await readFile(resultPath, 'utf8');
  await rmDir(tmpPath, { recursive: true });
  return result;
};

export const extractCodeBlocks = async (
  content: string,
): Promise<CodeBlock[]> => {
  const blocks: CodeBlock[] = Array.from(content.matchAll(codeBlockRegex)).map(
    ([, paramsString, code]) => {
      const [lang, ...rest] = paramsString.split(' ');

      const opts = {
        autorun: rest.includes('autorun'),
        norun: rest.includes('norun'),
      };

      if (opts.autorun) {
        opts.norun = true;
      }

      return {
        language: (languageMap[lang] || lang) as Language,
        options: opts,
        code,
        imports: extractImports(code),
      };
    },
  );

  for (const block of blocks) {
    if (['ts', 'js'].includes(block.language)) {
      block.webpackBundle = await getCompiledWebpack(
        block.code,
        block.language,
      );
    }
  }

  return blocks;
};
