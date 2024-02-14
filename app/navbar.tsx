'use client';

import { Fragment } from 'react';
import { usePathname } from 'next/navigation';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

const navigation = [
  { name: 'KD Research', href: '/kd-research' },
  { name: 'Competitive Analysis', href: '/competitive-analysis' }
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar({ user }: { user: any }) {
  const pathname = usePathname();

  return (
    <Disclosure as="nav" className="bg-[#0B0F0D] shadow-sm absolute top-0 w-full z-10">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <Link href='/' className="flex flex-shrink-0 items-center">
                  <svg width="148" height="20" viewBox="0 0 148 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M74.2419 0H70.5444V20H74.2419V14.3137H76.5948L80.5164 20H84.6061L79.6761 12.7731L84.326 6.05042H80.2363L76.6789 11.1765H74.2419V0ZM105.431 0H101.733V20H105.431V0ZM124.903 9.15969V17.1429L127.788 20H132.858V16.8628H129.552L128.6 15.9384V9.1877H132.858V6.05044H128.6V1.51263H124.959V6.05044H122.382V9.15969H124.903ZM133.99 8.96355V17.1428L136.819 20H144.858L147.632 17.1988V15.3781H143.99V16.1064L143.15 16.9748H138.584L137.688 16.0504V14.2577H147.66V8.96355L144.746 6.05039H136.875L133.99 8.96355ZM143.962 10.056V11.6806H137.688V10.056L138.64 9.0756H143.01L143.962 10.056ZM107.944 17.4229V14.2297L110.521 11.6526H117.608V9.88792L116.739 9.01958H112.538L111.697 9.88792V10.6722H108.056V9.0756L111.053 6.05039H118.252L121.249 9.0756V20H117.916V18.0112L115.843 20H110.521L107.944 17.4229ZM115.591 17.1428L117.608 15.2101V14.2857H112.342L111.585 15.042V16.4425L112.286 17.1428H115.591ZM85.4637 17.0588V6.05039H89.1611V15.9103L90.1135 16.8627H92.3544L95.0995 14.1176V6.05039H98.797V20H95.3796V17.619L92.9707 20H88.4048L85.4637 17.0588ZM54.5278 6.05039H57.9452V8.37532L60.2701 6.05039H64.7799L67.8891 9.15963V20H64.1917V10.168L63.2393 9.18764H60.8863L58.2253 11.8767V20H54.5278V6.05039ZM38.5559 14.2297V17.4229L41.1329 20H46.4551L48.5279 18.0112V20H51.8612V9.0756L48.864 6.05039H41.6652L38.668 9.0756V10.6722H42.3094V9.88792L43.1497 9.01958H47.3514L48.2198 9.88792V11.6526H41.1329L38.5559 14.2297ZM48.2198 15.2101L46.203 17.1428H42.8976L42.1974 16.4425V15.042L42.9537 14.2857H48.2198V15.2101ZM36.1803 13.5014V20H32.3708V14.3697L30.6901 12.493H24.5837V20H20.7741V0.392151H33.071L36.0682 3.41736V9.35574L34.1635 11.2885L36.1803 13.5014ZM24.5837 9.35574H31.3344L32.3147 8.37535V4.56582L31.3344 3.58543H24.5837V9.35574ZM17.7012 5.0607H14.0037V20H17.7012V5.0607ZM7.07174 9.72921H10.7692V20H7.07174V9.72921ZM3.69748 14.3977H0V20H3.69748V14.3977Z" fill="#05D5BF"/>
                  </svg>
                </Link>
                <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        pathname === item.href
                          ? 'text-white'
                          : 'border-transparent text-[#A8BDB7] hover:text-white',
                        'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
                      )}
                      aria-current={pathname === item.href ? 'page' : undefined}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="h-8 items-center flex justify-center">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.95866 15C10.2503 15 10.4969 14.8993 10.6982 14.6979C10.8996 14.4965 11.0003 14.25 11.0003 13.9583C11.0003 13.6667 10.8996 13.4201 10.6982 13.2187C10.4969 13.0174 10.2503 12.9167 9.95866 12.9167C9.66699 12.9167 9.42046 13.0174 9.21908 13.2187C9.01769 13.4201 8.91699 13.6667 8.91699 13.9583C8.91699 14.25 9.01769 14.4965 9.21908 14.6979C9.42046 14.8993 9.66699 15 9.95866 15ZM10.0003 18.3333C8.84755 18.3333 7.76421 18.1146 6.75033 17.6771C5.73644 17.2396 4.85449 16.6458 4.10449 15.8958C3.35449 15.1458 2.76074 14.2639 2.32324 13.25C1.88574 12.2361 1.66699 11.1528 1.66699 9.99999C1.66699 8.84721 1.88574 7.76388 2.32324 6.74999C2.76074 5.7361 3.35449 4.85416 4.10449 4.10416C4.85449 3.35416 5.73644 2.76041 6.75033 2.32291C7.76421 1.88541 8.84755 1.66666 10.0003 1.66666C11.1531 1.66666 12.2364 1.88541 13.2503 2.32291C14.2642 2.76041 15.1462 3.35416 15.8962 4.10416C16.6462 4.85416 17.2399 5.7361 17.6774 6.74999C18.1149 7.76388 18.3337 8.84721 18.3337 9.99999C18.3337 11.1528 18.1149 12.2361 17.6774 13.25C17.2399 14.2639 16.6462 15.1458 15.8962 15.8958C15.1462 16.6458 14.2642 17.2396 13.2503 17.6771C12.2364 18.1146 11.1531 18.3333 10.0003 18.3333ZM10.0003 16.6667C11.8614 16.6667 13.4378 16.0208 14.7295 14.7292C16.0212 13.4375 16.667 11.8611 16.667 9.99999C16.667 8.13888 16.0212 6.56249 14.7295 5.27082C13.4378 3.97916 11.8614 3.33332 10.0003 3.33332C8.13921 3.33332 6.56283 3.97916 5.27116 5.27082C3.97949 6.56249 3.33366 8.13888 3.33366 9.99999C3.33366 11.8611 3.97949 13.4375 5.27116 14.7292C6.56283 16.0208 8.13921 16.6667 10.0003 16.6667ZM10.0837 6.41666C10.4309 6.41666 10.733 6.52777 10.9899 6.74999C11.2469 6.97221 11.3753 7.24999 11.3753 7.58332C11.3753 7.88888 11.2816 8.15971 11.0941 8.39582C10.9066 8.63193 10.6948 8.85416 10.4587 9.06249C10.1392 9.34027 9.85796 9.64582 9.61491 9.97916C9.37185 10.3125 9.25033 10.6875 9.25033 11.1042C9.25033 11.2986 9.32324 11.4618 9.46908 11.5937C9.61491 11.7257 9.78505 11.7917 9.97949 11.7917C10.1878 11.7917 10.3649 11.7222 10.5107 11.5833C10.6566 11.4444 10.7503 11.2708 10.792 11.0625C10.8475 10.7708 10.9725 10.5104 11.167 10.2812C11.3614 10.0521 11.5698 9.83332 11.792 9.62499C12.1114 9.31943 12.3857 8.9861 12.6149 8.62499C12.8441 8.26388 12.9587 7.8611 12.9587 7.41666C12.9587 6.70832 12.6705 6.12846 12.0941 5.67707C11.5177 5.22568 10.8475 4.99999 10.0837 4.99999C9.55588 4.99999 9.05241 5.1111 8.57324 5.33332C8.09408 5.55555 7.72949 5.89582 7.47949 6.35416C7.38227 6.52082 7.35102 6.69791 7.38574 6.88541C7.42046 7.07291 7.51421 7.21527 7.66699 7.31249C7.86144 7.4236 8.06283 7.45832 8.27116 7.41666C8.47949 7.37499 8.6531 7.25693 8.79199 7.06249C8.94477 6.85416 9.13574 6.69443 9.36491 6.58332C9.59408 6.47221 9.83366 6.41666 10.0837 6.41666Z" fill="#A8BDB7"/>
                      </svg>
                    </Menu.Button>
                  </div>
                </Menu>
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="h-8 items-center px-4 flex justify-center rounded-md bg-[#05D5BF] text-sm text-bold">
                      <span className='mr-1'>Upgrade</span>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.16699 9.83332V12.5C9.16699 12.7361 9.24685 12.934 9.40658 13.0937C9.5663 13.2535 9.76421 13.3333 10.0003 13.3333C10.2364 13.3333 10.4344 13.2535 10.5941 13.0937C10.7538 12.934 10.8337 12.7361 10.8337 12.5V9.83332L11.5837 10.5833C11.7364 10.7361 11.9309 10.8125 12.167 10.8125C12.4031 10.8125 12.5975 10.7361 12.7503 10.5833C12.9031 10.4305 12.9795 10.2361 12.9795 9.99999C12.9795 9.76388 12.9031 9.56943 12.7503 9.41666L10.5837 7.24999C10.417 7.08332 10.2225 6.99999 10.0003 6.99999C9.7781 6.99999 9.58366 7.08332 9.41699 7.24999L7.25033 9.41666C7.09755 9.56943 7.02116 9.76388 7.02116 9.99999C7.02116 10.2361 7.09755 10.4305 7.25033 10.5833C7.4031 10.7361 7.59755 10.8125 7.83366 10.8125C8.06977 10.8125 8.26421 10.7361 8.41699 10.5833L9.16699 9.83332ZM10.0003 18.3333C8.84755 18.3333 7.76421 18.1146 6.75033 17.6771C5.73644 17.2396 4.85449 16.6458 4.10449 15.8958C3.35449 15.1458 2.76074 14.2639 2.32324 13.25C1.88574 12.2361 1.66699 11.1528 1.66699 9.99999C1.66699 8.84721 1.88574 7.76388 2.32324 6.74999C2.76074 5.7361 3.35449 4.85416 4.10449 4.10416C4.85449 3.35416 5.73644 2.76041 6.75033 2.32291C7.76421 1.88541 8.84755 1.66666 10.0003 1.66666C11.1531 1.66666 12.2364 1.88541 13.2503 2.32291C14.2642 2.76041 15.1462 3.35416 15.8962 4.10416C16.6462 4.85416 17.2399 5.7361 17.6774 6.74999C18.1149 7.76388 18.3337 8.84721 18.3337 9.99999C18.3337 11.1528 18.1149 12.2361 17.6774 13.25C17.2399 14.2639 16.6462 15.1458 15.8962 15.8958C15.1462 16.6458 14.2642 17.2396 13.2503 17.6771C12.2364 18.1146 11.1531 18.3333 10.0003 18.3333Z" fill="#0B0F0D"/>
                      </svg>

                    </Menu.Button>
                  </div>
                </Menu>
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full bg-white text-sm">
                      <span className="sr-only">Open user menu</span>
                      <Image
                        className="h-8 w-8 rounded-full border border-[#05D5BF] border-2"
                        src={user?.image || '/avatar1.png'}
                        height={32}
                        width={32}
                        alt={`${user?.name || 'placeholder'} avatar`}
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {user ? (
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'flex w-full px-4 py-4 text-sm text-gray-700'
                              )}
                              onClick={() => signOut()}
                            >
                              Sign out
                            </button>
                          )}
                        </Menu.Item>
                      ) : (
                        <>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'flex w-full px-4 py-3 text-sm justify-between'
                                )}
                              >
                                <span>My account</span>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M12 12C10.9 12 9.95833 11.6083 9.175 10.825C8.39167 10.0417 8 9.1 8 8C8 6.9 8.39167 5.95833 9.175 5.175C9.95833 4.39167 10.9 4 12 4C13.1 4 14.0417 4.39167 14.825 5.175C15.6083 5.95833 16 6.9 16 8C16 9.1 15.6083 10.0417 14.825 10.825C14.0417 11.6083 13.1 12 12 12ZM4 18V17.2C4 16.6333 4.14583 16.1125 4.4375 15.6375C4.72917 15.1625 5.11667 14.8 5.6 14.55C6.63333 14.0333 7.68333 13.6458 8.75 13.3875C9.81667 13.1292 10.9 13 12 13C13.1 13 14.1833 13.1292 15.25 13.3875C16.3167 13.6458 17.3667 14.0333 18.4 14.55C18.8833 14.8 19.2708 15.1625 19.5625 15.6375C19.8542 16.1125 20 16.6333 20 17.2V18C20 18.55 19.8042 19.0208 19.4125 19.4125C19.0208 19.8042 18.55 20 18 20H6C5.45 20 4.97917 19.8042 4.5875 19.4125C4.19583 19.0208 4 18.55 4 18ZM6 18H18V17.2C18 17.0167 17.9542 16.85 17.8625 16.7C17.7708 16.55 17.65 16.4333 17.5 16.35C16.6 15.9 15.6917 15.5625 14.775 15.3375C13.8583 15.1125 12.9333 15 12 15C11.0667 15 10.1417 15.1125 9.225 15.3375C8.30833 15.5625 7.4 15.9 6.5 16.35C6.35 16.4333 6.22917 16.55 6.1375 16.7C6.04583 16.85 6 17.0167 6 17.2V18ZM12 10C12.55 10 13.0208 9.80417 13.4125 9.4125C13.8042 9.02083 14 8.55 14 8C14 7.45 13.8042 6.97917 13.4125 6.5875C13.0208 6.19583 12.55 6 12 6C11.45 6 10.9792 6.19583 10.5875 6.5875C10.1958 6.97917 10 7.45 10 8C10 8.55 10.1958 9.02083 10.5875 9.4125C10.9792 9.80417 11.45 10 12 10Z" fill="#048B7E"/>
                                </svg>
                              </button>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'flex w-full px-4 py-3 text-sm justify-between'
                                )}
                              >
                                <span>Log out</span>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M5 21C4.45 21 3.97917 20.8042 3.5875 20.4125C3.19583 20.0208 3 19.55 3 19V5C3 4.45 3.19583 3.97917 3.5875 3.5875C3.97917 3.19583 4.45 3 5 3H11C11.2833 3 11.5208 3.09583 11.7125 3.2875C11.9042 3.47917 12 3.71667 12 4C12 4.28333 11.9042 4.52083 11.7125 4.7125C11.5208 4.90417 11.2833 5 11 5H5V19H11C11.2833 19 11.5208 19.0958 11.7125 19.2875C11.9042 19.4792 12 19.7167 12 20C12 20.2833 11.9042 20.5208 11.7125 20.7125C11.5208 20.9042 11.2833 21 11 21H5ZM17.175 13H10C9.71667 13 9.47917 12.9042 9.2875 12.7125C9.09583 12.5208 9 12.2833 9 12C9 11.7167 9.09583 11.4792 9.2875 11.2875C9.47917 11.0958 9.71667 11 10 11H17.175L15.3 9.125C15.1167 8.94167 15.025 8.71667 15.025 8.45C15.025 8.18333 15.1167 7.95 15.3 7.75C15.4833 7.55 15.7167 7.44583 16 7.4375C16.2833 7.42917 16.525 7.525 16.725 7.725L20.3 11.3C20.5 11.5 20.6 11.7333 20.6 12C20.6 12.2667 20.5 12.5 20.3 12.7L16.725 16.275C16.525 16.475 16.2875 16.5708 16.0125 16.5625C15.7375 16.5542 15.5 16.45 15.3 16.25C15.1167 16.05 15.0292 15.8125 15.0375 15.5375C15.0458 15.2625 15.1417 15.0333 15.325 14.85L17.175 13Z" fill="#048B7E"/>
                                </svg>
                              </button>
                            )}
                          </Menu.Item>
                        </>
                      )}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
              <div className="-mr-2 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md  p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-1 focus:ring-[#A8BDB7] focus:ring-offset-1  ">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    pathname === item.href
                      ? 'text-white'
                      : 'border-transparent text-[#A8BDB7] hover:text-white',
                    'block pl-3 pr-4 py-2 border-l-4 text-base font-medium'
                  )}
                  aria-current={pathname === item.href ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
            <div className="border-t border-[#A8BDB7] pt-4 pb-3">
              {user ? (
                <>
                  <div className="flex items-center px-4">
                    <div className="flex-shrink-0">
                      <Image
                        className="h-8 w-8 rounded-full"
                        src={user.image}
                        height={32}
                        width={32}
                        alt={`${user.name} avatar`}
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium text-gray-800">
                        {user.name}
                      </div>
                      <div className="text-sm font-medium text-gray-500">
                        {user.email}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <button
                      onClick={() => signOut()}
                      className="block px-4 py-2 text-base font-medium text-[#A8BDB7] hover:text-white"
                    >
                      Sign out
                    </button>
                  </div>
                </>
              ) : (
                <div className="space-y-1">
                  <button
                    onClick={() => signIn('github')}
                    className="flex w-full px-4 py-2 text-base font-medium text-[#A8BDB7] hover:text-white"
                  >
                    Sign in
                  </button>
                </div>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
