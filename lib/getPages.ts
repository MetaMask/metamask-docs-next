import glob from "glob";

const getPages = (): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    glob('guide/*.mdx', (err, globs) => {
      if (err) { return reject(err); }
      resolve(globs.map(g => g.replace(".mdx", "").replace("guide/", "")));
    });
  });
};

export const getGuideList = async (): Promise<any> => {
  return (await getPages()).map((path) => {
    return {
      params: {
        id: path
      }
    };
  });
};

export default getPages;
