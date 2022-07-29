// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import getPages from '../../lib/getPages';

interface Data {
  pages: string[];
}

const handler = async (_: NextApiRequest, res: NextApiResponse<Data>) => {
  const pages = await getPages();
  res.status(200).json({ pages });
};

export default handler;
