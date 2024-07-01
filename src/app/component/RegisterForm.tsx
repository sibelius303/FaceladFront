import { LOGIN, REGISTER, ROUTER_PATH } from '@/tools/constants';
import Image from 'next/image';
import React from 'react';



export default function RegisterForm(): JSX.Element {
    return (
        <div className='w-screen h-screen flex justify-center items-center px-5 pb-10 pt-10 bg-gray-300 overflow-y-hidden'>
            <div className="flex min-h-full flex-1">
                <div className="flex flex-1 flex-col justify-center  px-4 py-12 rounded-l-md  sm:px-6 lg:px-20 xl:px-24">
                    <div className="mx-auto shadow-2xl px-10 py-10 bg-white ">
                        <div>
                            <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                Registrate con tu correo y creando una contraseña
                            </h2>
                        </div>
                        <div className="mt-10">
                            <div>
                                <form className="space-y-6" action={ROUTER_PATH.API.USER} method="POST">
                                    <input type="hidden" name="action" value={REGISTER} />

                                    {/* <div>
                                        <label htmlFor="user" className="block text-sm font-medium leading-6 text-gray-900">
                                            Usuario
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="user"
                                                name="username"
                                                type="text"
                                                autoComplete="Usuario"
                                                required
                                                className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 text-negroSidebar ring-inset ring-gray-300 placeholder:text-negro focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div> */}
                                    <div>
                                        <label htmlFor="user" className="block text-sm font-medium leading-6 text-gray-900">
                                            Correo
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="user"
                                                name="username"
                                                type="text"
                                                autoComplete="Usuario"
                                                required
                                                className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 text-negroSidebar ring-inset ring-gray-300 placeholder:text-negro focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="passW" className="block text-sm font-medium leading-6 text-gray-900">
                                            Contraseña
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="passW"
                                                name="password"
                                                type="password"
                                                className="block w-full rounded-md border-0 text-negroSidebar py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                    {/* <div>
                                        <label htmlFor="passW" className="block text-sm font-medium leading-6 text-gray-900">
                                            Confirmar Contraseña
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="passWC"
                                                name="passwordC"
                                                type="passwordC"
                                                className="block w-full rounded-md border-0 text-negroSidebar py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div> */}
                                    <div>
                                        <button
                                            type="submit"
                                            className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:bg-opacity-50"
                                        >
                                            Registrarse
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
