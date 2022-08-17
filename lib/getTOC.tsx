import fs from 'fs';
import { promisify } from 'util';
import { getPages, Slug } from './getPages';

const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);

export interface TOCGroup {
  title: string;
  order: number;
  items: TOCItem[];
  pathPrefix: string;
}

export interface TOCItem {
  title: string;
  route: string;
  slug: Slug;
  order: number;
}

const getGroups = async () => {
  const files = await readdir('content', { withFileTypes: true });
  const groups = files.filter((f) => f.isDirectory()).map((f) => f.name);

  const noMeta = [];
  const withMeta = [];
  for (const group of groups) {
    try {
      const c = await readFile(`content/${group}/meta.json`, 'utf8');
      try {
        const m = JSON.parse(c); // todo: validate against schema
        m.items = [];
        withMeta.push(m);
      } catch (e) {
        console.error(
          `Invalid JSON :: Could not parse meta file for group: ${group}.`,
        );
        throw e;
      }
    } catch (e) {
      noMeta.push(group);
    }
  }

  if (noMeta.length > 0) {
    noMeta.forEach((group, idx) => {
      withMeta.push({
        title: group,
        order: withMeta.length + idx,
        pathPrefix: group,
        items: [],
      });
    });
  }
  return withMeta;
};

export const getTOC = async (): Promise<TOCGroup[]> => {
  const pages = await getPages();
  const groups = await getGroups();

  pages.forEach((p) => {
    const groupPathPrefix = p.slug[0];
    const g = groups.find((gg) => gg.pathPrefix === groupPathPrefix);
    g.items.push({
      title: p.meta.title,
      slug: p.slug,
      route: p.route,
      order: p.meta.order,
    });
  });

  groups.sort((a, b) => {
    if (a.order > b.order) {
      return 1;
    }

    if (a.order === b.order) {
      return 0;
    }
    return -1;
  });

  // sort items inside of groups
  groups.forEach((g) => {
    g.items.sort((a: TOCItem, b: TOCItem) => {
      if (a.order > b.order) {
        return 1;
      }

      if (a.order === b.order) {
        return 0;
      }
      return -1;
    });
  });

  return groups;
};
