import fs from 'fs';
import { promisify } from 'util';
import _glob from 'glob';
import matter from 'gray-matter';

const readFile = promisify(fs.readFile);
const glob = promisify(_glob);

export type Slug = string[];

export interface Page {
  slug: Slug;
  path: string;
  route: string;
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
  const route = pagePath.replace('.mdx', '').replace('content/', '');

  return {
    slug: route.split('/'),
    path: pagePath,
    route,
    meta: result.data as PageMeta,
    content: result.content,
  };
};

export const getPageForSlug = async (slug: string[]): Promise<Page> => {
  const path = `content/${slug.join('/')}.mdx`;
  return getPage(path);
};

export const getPages = async (): Promise<Page[]> => {
  const pagePaths = await glob('content/**/*.mdx');
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

export const listPages = async (): Promise<any> => {
  return (await getPages()).map((page: Page) => {
    return {
      params: {
        slug: page.slug,
      },
    };
  });
};
