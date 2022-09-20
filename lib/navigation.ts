export interface NavigationItem {
  pageName: string;
  href: string;
  children?: NavigationItem[];
}

export const navigation: NavigationItem[] = [
  { pageName: 'Home', href: '/home', children: [] },
  {
    pageName: 'Guide',
    href: '/guide',
    children: [
      { pageName: 'Introduction', href: '/guide/introduction' },
      {
        pageName: 'Getting Started',
        href: '/guide/getting-started',
      },
      {
        pageName: 'Ethereum Provider',
        href: '/guide/ethereum-provider',
      },
    ],
  },
];

/**
 * It takes an array of navigation items, and returns an array of navigation items
 *
 * @param accumulatedValue - NavigationItem[]
 * @param - - NavigationItem[] - the accumulated value
 * @param -.pageName - string
 * @param -.href - string
 * @param -.children - NavigationItem
 * @returns An array of objects with the shape of { pageName: string, href: string }
 */
const reducer = (
  accumulatedValue: NavigationItem[],
  { pageName, href, children = [] }: NavigationItem,
) => {
  const childrenArray: NavigationItem[] = children.reduce<NavigationItem[]>(
    (childAcc, child) => {
      return [
        ...childAcc,
        { pageName: `${pageName} / ${child.pageName}`, href: child.href },
      ];
    },
    [],
  );
  return [...accumulatedValue, { pageName, href }, ...childrenArray];
};

// flattened for cmd+k navigation
export const cmdKNavOptions = navigation.reduce<NavigationItem[]>(reducer, []);
