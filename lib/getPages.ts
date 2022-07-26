import glob from "glob";
import path from "path";
import fs from "fs";
import { serialize } from 'next-mdx-remote/serialize'

const pagesDirectory = path.join(process.cwd(), 'guide')

const getPages = (): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    glob('guide/*.mdx', (err, globs) => {
      if (err) { return reject(err); }
      resolve(globs);
    });
  });
};

export const getGuideList = async (): Promise<any> => {
  return (await getPages()).map((paths) => {
    return {
      params: {
        id: paths.replace(".mdx", "").replace("guide/", "")
      }
    };
  });
};

export default getPages;
