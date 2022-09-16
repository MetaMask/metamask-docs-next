import { Fragment, useState } from 'react';
import { Dialog, Transition, Disclosure } from '@headlessui/react';
import { Bars3CenterLeftIcon, XMarkIcon } from '@heroicons/react/24/outline';

import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { navigation } from '../lib/navigation';

export default function SideNav() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { asPath } = useRouter();
  return (
    <>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative lg:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0  flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white pb-4">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-42 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>

                <nav
                  className="mt-20 h-full flex-shrink-0 divide-y divide-cyan-800 overflow-y-auto z-20"
                  aria-label="Sidebar"
                >
                  <div className="flex flex-grow flex-col overflow-y-auto  bg-white pt-5 pb-4">
                    <div className="mt-5 flex flex-grow flex-col">
                      <nav
                        className="flex-1 space-y-1 bg-white px-2"
                        aria-label="Sidebar"
                      >
                        {navigation.map((item) =>
                          item.children === undefined ? (
                            <Link href={item.href} key={item.pageName}>
                              <a
                                className={clsx(
                                  item.href === asPath
                                    ? 'bg-gray-100 text-gray-900'
                                    : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                                  'group w-full flex items-center pl-7 pr-2 py-2 text-sm font-medium rounded-md',
                                )}
                              >
                                {item.pageName}
                              </a>
                            </Link>
                          ) : (
                            <Disclosure
                              as="div"
                              key={item.pageName}
                              className="space-y-1"
                            >
                              {({ open: openDisclosure }) => (
                                <>
                                  <Disclosure.Button className="group w-full flex items-center pr-2 py-2 text-left text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
                                    <svg
                                      className={clsx(
                                        openDisclosure
                                          ? 'text-gray-400 rotate-90'
                                          : 'text-gray-300',
                                        'mr-2 h-5 w-5 flex-shrink-0 transform transition-colors duration-150 ease-in-out group-hover:text-gray-400',
                                      )}
                                      viewBox="0 0 20 20"
                                      aria-hidden="true"
                                    >
                                      <path
                                        d="M6 6L14 10L6 14V6Z"
                                        fill="currentColor"
                                      />
                                    </svg>
                                    {item.pageName}
                                  </Disclosure.Button>
                                  <Disclosure.Panel className="space-y-1">
                                    {item.children?.map((subItem) => (
                                      <Link
                                        href={subItem.href}
                                        key={subItem.pageName}
                                      >
                                        <Disclosure.Button
                                          className={clsx(
                                            subItem.href === asPath
                                              ? 'bg-gray-100 text-gray-900'
                                              : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                                            'group flex w-full items-center rounded-md py-2 pl-10 pr-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                                          )}
                                        >
                                          {subItem.pageName}
                                        </Disclosure.Button>
                                      </Link>
                                    ))}
                                  </Disclosure.Panel>
                                </>
                              )}
                            </Disclosure>
                          ),
                        )}
                      </nav>
                    </div>
                  </div>
                </nav>
              </Dialog.Panel>
            </Transition.Child>
            <div className="w-14 flex-shrink-0" aria-hidden="true">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-grow flex-col overflow-y-auto  bg-white pt-5 pb-4">
          <div className="mt-36 flex flex-grow flex-col">
            <nav
              className="flex-1 space-y-1 bg-white px-2"
              aria-label="Sidebar"
            >
              {navigation.map((item) =>
                item.children === undefined ? (
                  <Link key={item.pageName} href={item.href}>
                    <a className="group w-full flex items-center pl-7 pr-2 py-2 text-sm font-medium rounded-md">
                      {item.pageName}
                    </a>
                  </Link>
                ) : (
                  <Disclosure
                    as="div"
                    key={item.pageName}
                    className="space-y-1"
                  >
                    {({ open: openDisclosure }) => (
                      <>
                        <Disclosure.Button className="group w-full flex items-center pr-2 py-2 text-left text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
                          <svg
                            className={clsx(
                              openDisclosure
                                ? 'text-gray-400 rotate-90'
                                : 'text-gray-300',
                              'mr-2 h-5 w-5 flex-shrink-0 transform transition-colors duration-150 ease-in-out group-hover:text-gray-400',
                            )}
                            viewBox="0 0 20 20"
                            aria-hidden="true"
                          >
                            <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
                          </svg>
                          {item.pageName}
                        </Disclosure.Button>
                        <Disclosure.Panel className="space-y-1">
                          {item.children?.map((subItem) => {
                            return (
                              <Link href={subItem.href} key={subItem.pageName}>
                                <a
                                  className={clsx(
                                    subItem.href === asPath
                                      ? 'bg-gray-100 text-gray-900'
                                      : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                                    'group flex w-full items-center rounded-md py-2 pl-10 pr-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                                  )}
                                >
                                  {subItem.pageName}
                                </a>
                              </Link>
                            );
                          })}
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ),
              )}
            </nav>
          </div>
        </div>
      </div>

      <div className="sticky top-0 shadow lg:hidden">
        <div className="flex h-16 flex-shrink-0  bg-white mx-auto px-2 sm:px-4 lg:px-8">
          <button
            type="button"
            className=" px-4 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open menu</span>

            <Bars3CenterLeftIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </div>
    </>
  );
}
