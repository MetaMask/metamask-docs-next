import fs from 'fs';
import { promisify } from 'util';
import _glob from 'glob';
import matter from 'gray-matter';

const readFile = promisify(fs.readFile);
const glob = promisify(_glob);

export interface Page {
  id: string;
  route: string;
  path: string;
  meta: PageMeta;
  content: string;
}

export interface PageMeta {
  title: string;
  date: string;
  order: number;
}

export const getPage = async (pagePath: string): Promise<Page> => {
  const content = await readFile(pagePath, 'utf8');

  const result = matter(content);
  const route = pagePath.replace('.mdx', '');

  return {
    id: route.replace('guide/', ''),
    route,
    path: pagePath,
    meta: result.data as PageMeta,
    content: result.content,
  };
};

export const getPages = async (): Promise<Page[]> => {
  const pagePaths = await glob('guide/*.mdx');
  const pages = [];
  for (const pagePath of pagePaths) {
    pages.push(await getPage(pagePath));
  }

  pages.sort((a, b) => {
    if (a.meta.order > b.meta.order) {
      return 1;
    } else if (a.meta.order === b.meta.order) {
      return 0;
    }
    return -1;
  });

  return pages;
};

export const getGuideList = async (): Promise<any> => {
  return (await getPages()).map((page: Page) => {
    return {
      params: {
        id: page.id,
      },
    };
  });
};
