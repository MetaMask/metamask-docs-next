import useSWR from 'swr';
import Link from 'next/link'

type PropTypes = {
  pages: string[],
};

const Sidenav = ({ pages }: PropTypes) => {
   if (!pages) return <div>loading...</div>

   return (
     <div className="sidenav" style={{width: "320px"}}>
       Pages: {pages.map((p: any, idx: number) => 
        <div key={idx}><Link href={p} >{p}</Link></div>
      )}
     </div>
   );
 }

export default Sidenav;