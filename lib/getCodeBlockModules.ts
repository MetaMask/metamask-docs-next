import fs from 'fs';
import _glob from 'glob';
import { promisify } from 'util';

const readFile = promisify(fs.readFile);
const glob = promisify(_glob);

export interface MonacoLib {
  filename: string;
  content: string;
}

export interface MonacoModule {
  name: string;
  content: string;
  impls: MonacoLib[];
}

export default async function(): Promise<MonacoModule[]> {
  const pagePaths = await glob('node_modules/@metamask/detect-provider/**/*.d.ts');
  const implPaths = await glob('node_modules/@metamask/detect-provider/**/*.js');

  const libs: { [k: string]: MonacoLib[] } = {};

  const libName = "@metamask/detect-provider";

  for (const pagePath of pagePaths) {
    if (libs[libName] === undefined) { libs[libName] = []; }
    libs[libName].push({
      filename: pagePath,
      content: await readFile(pagePath, "utf8")
    });
  }

  const libImpls: { [k: string]: MonacoLib[] } = {};
  for (const implPath of implPaths) {
    if (libImpls[libName] === undefined) { libImpls[libName] = []; }
    libImpls[libName].push({
      filename: implPath,
      content: await readFile(implPath, "utf8")
    });
  }

  const mods: any = [];
  Object.keys(libs).forEach((libFile) => {
    mods.push({
      content: [
        `declare module '${libName}' {`,
        libs[libFile].map((l) => l.content).join("\n"),
        "}",
      ].join("\n"),
      impls: libImpls[libName],
      name: libName,
    });
  });

  return mods;
}
