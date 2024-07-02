"use client"
import Image from 'next/image';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation'
import React, { useState } from 'react';
import ButtonComponent from '../home/component/ButtonComponent';

interface UserData {
    token: string,
    user: {
        id: number,
        password: string,
        last_login: string,
        is_superuser: boolean,
        username: string,
        first_name: string,
        last_name: string,
        email: string,
        is_staff: boolean,
        is_active: boolean,
        date_joined: string,
        user_type: string,
        groups: any,
        user_permissions: any
    }
}

const Sidebar: React.FC<{ dataUser: UserData }> = ({ dataUser }) => {
    const params = useParams();
    const pathname = usePathname();
    const [openMenu, setOpenMenu] = useState(false);
    const [mobilMenu, setMobilMenu] = useState(false);
    return (
        <>
            <nav className="fixed top-0 z-50 w-full bg-fondoapp px-4 md:px-20 ">
                <div className=" py-3 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start rtl:justify-end">
                            <Link href="/" className="flex ms-2 md:me-24">
                                <Image
                                    src="/branding/Logo.png"
                                    alt="facelad Logo"
                                    height={200}
                                    width={200}
                                    priority
                                />

                            </Link>
                        </div>
                        <div className='flex justify-end w-full'>
                            <div className="flex items-center ">
                                <div className="flex items-center gap-2 text-gray-400 ms-3">
                                    {/* <div className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                                            <path fillRule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 0 0-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 0 0-2.282.819l-.922 1.597a1.875 1.875 0 0 0 .432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 0 0 0 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 0 0-.432 2.385l.922 1.597a1.875 1.875 0 0 0 2.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 0 0 2.28-.819l.923-1.597a1.875 1.875 0 0 0-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 0 0 0-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 0 0-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 0 0-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 0 0-1.85-1.567h-1.843ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z" clipRule="evenodd" />
                                        </svg>

                                    </div> */}
                                    <div className='flex items-center gap-2'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                            <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                                        </svg>

                                        <button
                                            onClick={() => setOpenMenu(prev => !prev)}
                                            type="button"
                                            className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300"
                                            aria-expanded="false"
                                            data-dropdown-toggle="dropdown-user"
                                        >

                                            <span className="sr-only">Open user menu</span>
                                            <Image
                                                className="w-8 h-8 rounded-full"
                                                src="/branding/1.jpg"
                                                alt="user photo"
                                                width={50}
                                                height={50}
                                            />
                                        </button>
                                    </div>

                                    {openMenu && <div className="absolute z-60 top-12 right-16  my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow " id="dropdown-user">
                                        <div className="px-4 py-3" role="none">
                                            <p className="text-sm text-gray-900 " role="none">
                                                {dataUser?.user?.first_name} {dataUser?.user?.last_name}
                                            </p>
                                            <p className="text-sm font-medium text-gray-900 truncate " role="none">
                                                {dataUser?.user?.username}
                                            </p>
                                        </div>
                                        <ul className="py-1" role="none">
                                            <li>
                                                <ButtonComponent />
                                            </li>
                                        </ul>
                                    </div>}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </nav>
            <div className="h-auto fixed top-14 z-40 w-full bg-fondoapp md:px-20  ">
                <div className="max-w-screen-xl py-3 mx-auto">
                    <div className="flex flex-col  md:flex-row md:items-center">
                        <ul className="flex flex-row justify-center md:justify-start font-medium mt-0 md:space-x-8 rtl:space-x-reverse text-sm">
                            <li className={`hover:border-b-2  hover:border-blue-400 py-2 px-6 hover:text-blue-400 ${pathname.split("/")[1] === "client" ? "border-b-2 border-blue-400 text-blue-400" : "text-gray-900"}`}>
                                <Link href="/client" className="">Clientes</Link>
                            </li>
                            <li className={`hover:border-b-2  hover:border-blue-400 py-2 px-6 hover:text-blue-400 ${pathname.split("/")[1] === "works" ? "border-b-2 border-blue-400 text-blue-400" : "text-gray-900"}`}>
                                <Link href="/works" className="">Trabajos</Link>
                            </li>
                            <li className={`hover:border-b-2  hover:border-blue-400 py-2 px-6 hover:text-blue-400 ${pathname.split("/")[1] === "billings" ? "border-b-2 border-blue-400 text-blue-400" : "text-gray-900"}`}>
                                <Link href="/billings" className="">Facturación</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Sidebar;
