import type { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { getPages } from '../../lib/getPages';

function RedirectPage({ indexPage }: any) {
  const router = useRouter();
  // Make sure we're in the browser
  if (typeof window !== 'undefined') {
    router.push(`/${indexPage.route}`);
  }
}

export default RedirectPage;

export const getStaticProps: GetStaticProps<any, any> = async () => {
  const pages = await getPages();
  const indexPage = pages.find((p) => p.meta.isIndex);

  if (!indexPage) {
    throw new Error('No index page found.');
  }

  return {
    props: {
      indexPage,
    },
  };
};
