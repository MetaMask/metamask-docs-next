import Link from 'next/link';
import { Page } from '../lib/getPages';

interface PropTypes {
  pages: Page[];
}

const Sidenav = ({ pages }: PropTypes) => {
  if (!pages) {
    return <div>loading...</div>;
  }

  if (pages.length === 0) {
    return <div>loading...</div>;
  }
  return (
    <div className="sidenav">
      {pages.map((p: any, idx: number) => (
        <li className="link" key={idx}>
          <Link href={p.id}>{p.meta.title}</Link>
        </li>
      ))}
    </div>
  );
};

export default Sidenav;
