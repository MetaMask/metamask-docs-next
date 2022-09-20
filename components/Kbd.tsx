import type { MouseEventHandler, PropsWithChildren } from 'react';

export const Kbd: React.FC<
  PropsWithChildren<{ onClick: MouseEventHandler<HTMLElement> }>
> = ({ children, onClick }) => {
  return (
    <kbd
      onClick={onClick}
      className="px-1 py-0.5  font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500 cursor-pointer"
    >
      {children}
    </kbd>
  );
};
