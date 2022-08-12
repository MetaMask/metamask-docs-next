import Link from 'next/link';
// import { useContext } from 'react';
// import { AppContext } from '../../context/AppContext';
import { SiGithub } from 'react-icons/si';

// import Hamburger from '../components/ui/hamburger/Hamburger';

interface AppRoute {
  name: string;
  href: string;
}
interface RouterLinksProps {
  routes: AppRoute[];
}

const RouterLinks = ({ routes }: RouterLinksProps) => {
  return (
    <>
      {routes.map((route, idx) => (
        <li className="link" key={`${route.name}-${idx}`}>
          <Link href={route.href}>
            <a>{route.name}</a>
          </Link>
        </li>
      ))}
    </>
  );
};

const Menu = () => {
  // const context = useContext(AppContext)
  const myAppRoutes: AppRoute[] = [
    { name: 'home', href: '/' },
    { name: 'guide', href: '/guide/' },
  ];

  return (
    <ul style={{ userSelect: 'none' }}>
      <RouterLinks routes={myAppRoutes} />
      <li key="gh-link" className="link">
        <a tabIndex={4} href="https://github.com/metamask/metamask-docs-next">
          <SiGithub />
        </a>
      </li>
      {/* <li className='menu'>
        <Hamburger onClick={handleClick} />
      </li> */}
    </ul>
  );
};

export default Menu;
