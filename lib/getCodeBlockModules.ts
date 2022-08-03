import { promisify } from 'util';
import path from 'path';
import fs from 'fs';
import _glob from 'glob';
import webpack from 'webpack';

const readFile = promisify(fs.readFile);
const glob = promisify(_glob);
const rmDir = promisify(fs.rmdir);

export interface MonacoLib {
  filename: string;
  content: string;
}

export interface MonacoModule {
  name: string;
  content: string;
  impls: MonacoLib[];
}

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (): Promise<MonacoModule[]> {
  const pagePaths = await glob(
    'node_modules/@metamask/detect-provider/**/*.d.ts',
  );
  const implPaths = await glob(
    'node_modules/@metamask/detect-provider/**/*.js',
  );

  const libs: { [k: string]: MonacoLib[] } = {};

  const libName = '@metamask/detect-provider';

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

  const mods: any = [];
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
  console.log('mods', mods);

  return mods;
}

type Language = 'typescript' | 'javascript';

export const getCompiledWebpack = async (
  sourceCode: string,
  language: Language,
): Promise<any> => {
  console.log('lang', language);
  // language to extension
  const languageToExtension = {
    typescript: 'ts',
    javascript: 'js',
  };

  // write source code to a temp file
  const tempFile = `index.${languageToExtension[language] || language || 'js'}`;
  const mkdtemp = promisify(fs.mkdtemp);
  const tmpPath = await mkdtemp(`codeblock-`);
  await fs.promises.writeFile(
    path.resolve(tmpPath, tempFile),
    sourceCode,
    'utf8',
  );
  const entry = `./${tmpPath}/${tempFile}`;
  console.log('entry', entry);

  await new Promise((resolve, reject) => {
    webpack(
      {
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
      },
      (err, stats) => {
        console.log('webpack', stats?.compilation.errors);
        if (err) {
          reject(err);
        }
        resolve(stats);
      },
    );
  });
  const resultPath = path.resolve(tmpPath, 'dist', 'bundle.js');
  const result = await readFile(resultPath, 'utf8');
  await rmDir(tmpPath, { recursive: true });
  return result;
};
