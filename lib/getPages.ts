import _glob from "glob";
import fs from "fs";
import { promisify } from "util";
import matter from 'gray-matter';

const readFile = promisify(fs.readFile);
const glob = promisify(_glob);

export interface Page {
  id: string;
  path: string;
  meta: PageMeta;
  content: string;
}

export interface PageMeta {
  title: string;
  date: string;
  isIndex: boolean;
}

export const getPage = async (pagePath: string): Promise<Page> => {
  const content = await readFile(pagePath, "utf8");

  const result = matter(content);

  return {
    id: pagePath.replace(".mdx", "").replace("guide/", ""),
    path: pagePath,
    meta: result.data as PageMeta,
    content: result.content
  };

};

export const getPages = async (): Promise<Page[]> => {
  const pagePaths = await glob('guide/*.mdx');
  const pages = [];
  for (const pagePath of pagePaths) {
    pages.push(await getPage(pagePath));
  }
  return pages;
};


export const getGuideList = async (): Promise<any> => {
  return (await getPages()).map((page: Page) => {
    return {
      params: {
        id: page.id
      }
    };
  });
};

export default getPages;
