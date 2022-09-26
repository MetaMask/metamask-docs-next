import { type PropsWithChildren } from 'react';
import SideNav from 'components/SideNav';

interface Props {
  title: string;
}

export default function DocsLayout({
  children,
  title,
}: PropsWithChildren<Props>) {
  return (
    <main>
      <SideNav />
      <section className="lg:ml-72 space-y-8 mt-8 p-8 max-w-5xl">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          {title}
        </h2>
        {children}
      </section>
    </main>
  );
}
