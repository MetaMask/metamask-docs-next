import useSWR from 'swr';
import React from "react";

const fetcher = (url: string): Promise<any> => fetch(url).then(r => r.json());

type PropTypes = {
  pages: string[],
}

const SideBar = ({ pages }: PropTypes) => {
  /* const { data, error } = useSWR('/api/hello', fetcher);
   * if (error) return <div>failed to load</div> */
  if (!pages) return <div>loading...</div>

  return (
    <div>
      Pages: {pages.map((p: any) => <div>{p}</div>)}
    </div>
  )
}

export default SideBar;
