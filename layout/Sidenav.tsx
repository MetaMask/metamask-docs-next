import Link from 'next/link';
import { TOCGroup } from '../lib/getPages';

interface PropTypes {
  toc: TOCGroup[];
}

const Sidenav = ({ toc }: PropTypes) => {
  if (!toc) {
    return <div>loading...</div>;
  }

  if (toc.length === 0) {
    return <div>loading...</div>;
  }
  return (
    <div className="sidenav">
      {toc.map((g, idx: number) => (
        <li key={idx}>
          {g.title}
          <br />
          <ul>
            {g.items.map((p, idx2: number) => (
              <li className="link" key={`${idx}-${idx2}`}>
                <Link href={p.route}>{p.title}</Link>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </div>
  );
};

export default Sidenav;
