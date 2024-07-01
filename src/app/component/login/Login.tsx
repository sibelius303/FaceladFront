import { LOGIN, ROUTER_PATH } from '@/tools/constants';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';



export default function Login(): JSX.Element {
    return (
        <div className='w-screen h-screen flex justify-center items-center px-5 pb-10 pt-10 bg-slate-50 overflow-y-hidden'>
            <div className="flex min-h-full flex-1">
                <div className="flex flex-1 flex-col justify-center rounded-l-md ">
                    <div className='w-full flex justify-center mb-5'>
                        <Image
                            src={"/branding/Logo.png"}
                            height={200}
                            width={200}
                            alt=''
                            priority
                        />
                    </div>
                    <div className="mx-auto md:w-[500px] shadow-2xl px-4 py-4 md:px-16 md:py-8   bg-white ">
                        <div>
                            <h2 className="text-md md:text-xl  leading-9 tracking-tight text-gray-900">
                                Iniciar sesión
                            </h2>
                        </div>
                        <div className="mt-2 md:mt-4">
                            <div>
                                <form className="space-y-4" action={ROUTER_PATH.API.USER} method="POST">
                                    <input type="hidden" name="action" value={LOGIN} />
                                    <div>
                                        <div className="mt-2">
                                            <input
                                                id="user"
                                                name="username"
                                                type="text"
                                                placeholder='Usuario'
                                                autoComplete="Usuario"
                                                required
                                                className="block w-full rounded-md border-0 px-4 py-2 shadow-sm ring-1 text-negroSidebar ring-inset ring-gray-300 placeholder:text-negro focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="mt-2">
                                            <input
                                                id="passW"
                                                name="password"
                                                type="password"
                                                placeholder='Contraseña'
                                                className="block w-full rounded-md px-4 border-0 text-negroSidebar py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        {/* <div className='flex justify-end mb-4'>
                                            <Link href="/forgot-password" className="text-blue-500 hover:text-blue-700 hover:underline">¿Olvidaste contraseña?</Link>
                                        </div> */}
                                        <button
                                            type="submit"
                                            className="flex w-full rounded-sm justify-center bg-blue-950 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:bg-opacity-50"
                                        >
                                            Iniciar
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
