import { Fragment, type SVGProps } from 'react';
import { Combobox, Dialog, Transition } from '@headlessui/react';
import { FolderIcon, HashtagIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { useSnapshot } from 'valtio';
import { useRouter } from 'next/router';
import { searchState } from '../hooks/useCmd';
import { cmdKNavOptions, navigation, NavigationItem } from '../lib/navigation';
import { isNavigationItem, isQuickAction } from '../lib/typeguards';

const recent: NavigationItem[] = navigation.map(({ pageName, href }) => ({
  pageName,
  href,
}));

export interface QuickAction {
  name: string;
  icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  shortcut: string;
  url: string;
}

const quickActions: QuickAction[] = [
  {
    name: 'Open Metamask Playground',
    icon: HashtagIcon,
    shortcut: 'H',
    url: '#',
  },
];

export const Cmd: React.FC = () => {
  const { push } = useRouter();
  const { isCmdOpen, query } = useSnapshot(searchState);

  const setOpen = () => {
    searchState.isCmdOpen = !isCmdOpen;
  };

  const setQuery = (newQuery: string) => {
    searchState.query = newQuery;
  };

  const handleSelectOption = (option: NavigationItem | QuickAction) => {
    if (isQuickAction(option)) {
      console.log('not implemented');
    }

    if (isNavigationItem(option)) {
      push(option.href);
      setOpen();
    }
  };

  const filteredDocs =
    query === ''
      ? []
      : cmdKNavOptions.filter((doc) =>
          doc.pageName.toLowerCase().includes(query.toLowerCase()),
        );

  return (
    <Transition.Root
      show={isCmdOpen}
      as={Fragment}
      afterLeave={() => setQuery('')}
      appear
    >
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="mx-auto shadow-2xl max-w-3xl transform divide-y divide-gray-500 divide-opacity-10 overflow-hidden rounded-xl bg-white bg-opacity-100  ring-black ring-opacity-5 backdrop-blur backdrop-filter transition-all">
              <Combobox onChange={handleSelectOption}>
                <div className="relative">
                  <Combobox.Input
                    className="h-16 w-full border-0 bg-transparent  pl-11 pr-4 text-gray-900 placeholder-gray-500 text-xl"
                    placeholder="What do you need?"
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </div>
                {(query === '' || filteredDocs.length > 0) && (
                  <Combobox.Options
                    static
                    className="max-h-80 scroll-py-2 divide-y divide-gray-500 divide-opacity-10 overflow-y-auto"
                  >
                    <li className="p-2">
                      {query === '' && (
                        <h2 className="mt-4 mb-2 px-3 font-semibold text-gray-900">
                          Jump to Docs
                        </h2>
                      )}
                      <ul className="text-sm text-gray-700">
                        {(query === '' ? recent : filteredDocs).map(
                          (project) => (
                            <Combobox.Option
                              key={project.href}
                              value={project}
                              className={({ active }) =>
                                clsx(
                                  'flex cursor-default select-none items-center rounded-md px-3 py-2',
                                  active &&
                                    'bg-gray-900 bg-opacity-5 text-gray-900',
                                )
                              }
                            >
                              {({ active }) => (
                                <>
                                  <FolderIcon
                                    className={clsx(
                                      'h-6 w-6 flex-none text-gray-900 text-opacity-40',
                                      active && 'text-opacity-100',
                                    )}
                                    aria-hidden="true"
                                  />
                                  <span className="ml-3 flex-auto truncate">
                                    {project.pageName}
                                  </span>
                                  {active && (
                                    <span className="ml-3 flex-none text-gray-500">
                                      Jump to...
                                    </span>
                                  )}
                                </>
                              )}
                            </Combobox.Option>
                          ),
                        )}
                      </ul>
                    </li>
                    {query === '' && (
                      <li className="p-2">
                        <h2 className="mt-4 mb-2 px-3 font-semibold text-gray-900">
                          Quick Actions
                        </h2>
                        <ul className="text-sm text-gray-700">
                          {quickActions.map((action) => (
                            <Combobox.Option
                              key={action.shortcut}
                              value={action}
                              className={({ active }) =>
                                clsx(
                                  'flex cursor-default select-none items-center rounded-md px-3 py-2',
                                  active &&
                                    'bg-gray-900 bg-opacity-5 text-gray-900',
                                )
                              }
                            >
                              {({ active }) => (
                                <>
                                  <action.icon
                                    className={clsx(
                                      'h-6 w-6 flex-none text-gray-900 text-opacity-40',
                                      active && 'text-opacity-100',
                                    )}
                                    aria-hidden="true"
                                  />
                                  <span className="ml-3 flex-auto truncate">
                                    {action.name}
                                  </span>
                                  <span className="ml-3 flex-none text-xs font-semibold text-gray-500">
                                    <kbd className="font-sans">⌘</kbd>
                                    <kbd className="font-sans">
                                      {action.shortcut}
                                    </kbd>
                                  </span>
                                </>
                              )}
                            </Combobox.Option>
                          ))}
                        </ul>
                      </li>
                    )}
                  </Combobox.Options>
                )}

                {query !== '' && filteredDocs.length === 0 && (
                  <div className="py-14 px-6 text-center sm:px-14">
                    <FolderIcon
                      className="mx-auto h-6 w-6 text-gray-900 text-opacity-40"
                      aria-hidden="true"
                    />
                    <p className="mt-4 text-sm text-gray-900">
                      We couldn&apos;t find any projects with that term. Please
                      try again.
                    </p>
                  </div>
                )}
              </Combobox>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
