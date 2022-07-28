import glob from "glob";
import fs from "fs";
import { promisify } from "util";

const readFile = promisify(fs.readFile);

const getPages = () : Promise<string[]> => {
  return new Promise((resolve, reject) => {
    glob('guide/*.mdx', (err, globs) => {
      if (err) { return reject(err); }
      resolve(globs);
    });
  });
};

export const getGuideContent = async (guide : string) : Promise<string> => {
  const fileContents = await readFile(`guide/${guide}.mdx`, 'utf8');
  return fileContents;
  // front matter
  // mdx

};


export const getGuideList = async () : Promise<any> => {
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
