import Link from 'next/link';
import { useRouter } from 'next/router';
import { TOCGroup } from '../lib/getTOC';

interface PropTypes {
  toc: TOCGroup[];
}

const Sidenav = ({ toc }: PropTypes) => {
  const router = useRouter();

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
          <details open>
            <summary>{g.title}</summary>
            <ul>
              {g.items.map((p, idx2: number) => (
                <li
                  className={
                    // eslint-disable-next-line prefer-template
                    'link' + (router.asPath === `/${p.route}` ? ' active' : '')
                  }
                  key={`${idx}-${idx2}`}
                >
                  <Link href={p.route}>{p.title}</Link>
                </li>
              ))}
            </ul>
          </details>
        </li>
      ))}
    </div>
  );
};

export default Sidenav;
