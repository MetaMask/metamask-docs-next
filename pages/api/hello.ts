// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import getPages from '../../lib/getPages';

type Data = {
  pages: string[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const pages = await getPages();
  res.status(200).json({ pages })
}
