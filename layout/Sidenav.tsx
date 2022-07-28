import useSWR from 'swr';
import Link from 'next/link'

type PropTypes = {
  pages: string[],
};

const Sidenav = ({ pages }: PropTypes) => {
   if (!pages) return <div>loading...</div>

   return (
     <div className="sidenav">
       {pages.map((p: any, idx: number) => 
        <li className="link" key={idx}>
          <Link href={p} >{p}</Link>
        </li>
      )}
     </div>
   );
 }

export default Sidenav;