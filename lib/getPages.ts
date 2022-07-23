import glob from "glob";

const getPages = (): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    glob('guide/*.mdx', (err, globs) => {
      if (err) { return reject(err); }
      resolve(globs);
    });
  });
};

const getGuideContent = (guide: string): void => {
  // front matter
  // mdx
};


export const getGuideList = async (): Promise<any> => {
  return (await getPages()).map((paths) => {
    console.log(paths);
    return {
      params: {
        guide: paths.replace(".mdx", "").replace("guide/", "")
      }
    };
  });
};

export default getPages;
