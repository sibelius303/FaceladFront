"use client"
import { useRouter } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react';
import { FilterComponent } from './FilterComponent';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

interface DataItem {
    id: number,
    company: string,
    name: string,
    description: string,
    email: string,
    phone: string,
    country: string,
    language: string,
    status: boolean,
    is_paid: boolean
}

interface ClientProps {
    clients: DataItem[]
}

interface PaginationProps {
    itemsPerPage: any;
    totalItems: any;
    paginate: any;
    currentPage: any;

}

const Pagination: React.FC<PaginationProps> = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <>
            {pageNumbers.length > 0 ? pageNumbers.map(number => (

                <button key={number} onClick={() => paginate(number)} className="text-blueprimary flex gap-2 items-center justify-center  bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-xs px-2 py-1  ">
                    {number}
                </button>

            )) : <button className="text-blueprimary flex gap-2 items-center justify-center  bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-xs px-2 py-1  ">
                {"0"}
            </button>}
        </>
    );
};



export const ClientTable: React.FC<ClientProps> = ({ clients }) => {
    const router = useRouter();
    const [input, setInput] = useState("");
    const [selectAct, setSelectAct] = useState("");
    const [selectPay, setSelectPay] = useState("");
    const [data, setData] = useState<any>([]);
    const [open, setOpen] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [currentItems, setCurrentItems] = useState<DataItem[]>([])
    const itemsPerPage = 10;

    console.log("soy el objeto de cliente", clients)

    useEffect(() => {
        if (clients !== null) setData(clients)
        return
    }, [clients])

    const handleSearch = () => {
        if (selectAct === "" && selectPay === "") {
            setData(clients)
        }
        if (selectAct === "" && selectPay !== "") {
            setData(clients?.filter(el => el.is_paid === JSON.parse(selectPay)))
        }
        if (selectAct !== "" && selectPay === "") {
            setData(clients?.filter(el => el.status === JSON.parse(selectAct)))
        }
    }

    console.log(data)

    useEffect(() => {
        if (clients !== null) {
            if (input === "") {
                setData(clients)
                console.log(clients)

            } else {
                setData(clients?.filter(el => el.name.toLowerCase().startsWith(input.toLowerCase()) || el.company.toLowerCase().startsWith(input.toLowerCase())))
            }
        }
    }, [input, clients])

    useEffect(() => {
        if (data?.length > 0) {
            const indexOfLastItem = currentPage * itemsPerPage;
            const indexOfFirstItem = indexOfLastItem - itemsPerPage;
            setCurrentItems(data?.slice(indexOfFirstItem, indexOfLastItem))
        }
    }, [data, currentPage])

    console.log("soy el input", input)


    const handleRowClicked = (row: DataItem) => {
        router.push(`client/${row.id}/timeline`)
    };

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const DeleteClient = async (id: number) => {
        // try {
        //     const headers: HeadersInit = new Headers();
        //     headers.append("Content-Type", "application/json");
        //     const response: Response = await fetch(`${process.env.BACK_URL}api/customer/customerdelete`, {
        //         method: 'POST',
        //         headers,
        //         body: JSON.stringify(
        //             id
        //         )
        //     });
        //     const responseJSON = await response.json();
        //     if (responseJSON.ok) {
        //         router.refresh()
        //     } else {
        //         console.log("hubo un error")
        //     }
        // } catch (error: any) {
        //     console.log("soy el error del delete en el cliente del cliente", error)
        // }
        toast.warning("Esta funcion esta deshabilitada temporalmente")
    }

    return (
        <div className='w-full flex flex-col lg:flex-row gap-4 h-auto'>
            <div className='lg:w-3/4 gap-4'>
                <div className='flex flex-col lg:flex-row justify-between items-center py-4 px-10 bg-white'>
                    <div className='flex flex-col order-2 lg:order-1 items-center gap-2'>
                        <span className='text-xs'>Todos los clientes</span>
                        <div className='flex'>
                            <input value={input} onChange={(e) => { setInput(e.target.value) }} placeholder='Buscar por nombre o compañia' className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-sm focus:ring-blue-500 focus:border-blue-500 block  p-1 px-4  " />
                            <button className='border px-2 rounded-r-md'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-between xl:justify-end xl:order-2 w-full my-2 md:my-0">
                        <button onClick={() => router.push("/client/new")} className=" text-white flex items-center text-xs bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium  px-3 py-1  w-auto">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            Nuevo
                        </button>
                        <button onClick={() => setOpen(prev => !prev)} className="lg:hidden rounded-full text-white flex items-center text-xs bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium   w-auto">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="relative overflow-x-hidden">
                    {currentItems?.length > 0 ? <><div className="w-full text-sm text-left rtl:text-right text-gray-500  ">
                        <div className="text-xs text-gray-400 border-b border-t bg-gray-50 mb-4 ">
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                                <div className="px-6 py-3 text-black lg:col-span-2 text-center">
                                    Clientes
                                </div>
                                <div className="hidden lg:inline-block px-6 py-3 text-center">
                                    Descripción
                                </div>
                                <div className="px-6 py-3 text-center">
                                    Actividad
                                </div>
                                <div className="hidden lg:inline-block px-6 py-3 text-center">
                                    Facturación
                                </div>
                                <div className="hidden md:inline-block px-6 py-3 text-center">
                                    Acciones
                                </div>
                            </div>
                        </div>
                        <div className=''>
                            {currentItems?.map(el => (<div key={el.id} className="bg-white grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 border-b mb-2 rounded-md hover:cursor-pointer hover:bg-slate-100 ">
                                <div className="px-6 py-4 flex items-center gap-4 text-xs font-medium  whitespace-nowrap lg:col-span-2">
                                    <div className="relative inline-flex items-center  justify-center w-10 h-10 overflow-hidden bg-blue-950 rounded-full">
                                        <span className="font-medium text-white text-sm">{el.name.charAt(0).toUpperCase()}</span>
                                    </div>
                                    <Link href={`/client/${el.id}`} className='hover:underline'>
                                        {el.name}
                                    </Link>
                                </div>
                                <div className="hidden lg:flex lg:items-center lg:justify-center px-1 text-xs py-1 text-blueprimary">
                                    {el.description}
                                </div>
                                <div className="flex justify-center items-center px-6 py-4">
                                    <div className="">{el.status ? <div className="flex gap-x-2"><svg className="w-4 h-4 text-yellow-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                        <path fill-rule="evenodd" d="M13 3a1 1 0 1 0-2 0v2a1 1 0 1 0 2 0V3ZM6.343 4.929A1 1 0 0 0 4.93 6.343l1.414 1.414a1 1 0 0 0 1.414-1.414L6.343 4.929Zm12.728 1.414a1 1 0 0 0-1.414-1.414l-1.414 1.414a1 1 0 0 0 1.414 1.414l1.414-1.414ZM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm-9 4a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2H3Zm16 0a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2h-2ZM7.757 17.657a1 1 0 1 0-1.414-1.414l-1.414 1.414a1 1 0 1 0 1.414 1.414l1.414-1.414Zm9.9-1.414a1 1 0 0 0-1.414 1.414l1.414 1.414a1 1 0 0 0 1.414-1.414l-1.414-1.414ZM13 19a1 1 0 1 0-2 0v2a1 1 0 1 0 2 0v-2Z" clip-rule="evenodd" />
                                    </svg>
                                        {"Activo"}</div> : <div className="flex gap-x-2"><svg className="w-4 h-4 text-blue-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 21a9 9 0 0 1-.5-17.986V3c-.354.966-.5 1.911-.5 3a9 9 0 0 0 9 9c.239 0 .254.018.488 0A9.004 9.004 0 0 1 12 21Z" />
                                        </svg>
                                        {"Inactivo"}</div>}</div>
                                </div>
                                <div className="hidden lg:flex lg:items-center lg:justify-center px-6 py-4">
                                    <span className="">{el.is_paid ? <svg width="49" height="22" viewBox="0 0 49 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="0.5" y="1" width="48" height="20" rx="10" fill="#00D27A" />
                                        <rect x="0.5" y="1" width="48" height="20" rx="10" stroke="#00D27A" />
                                        <path d="M17.11 9.62C17.11 9.97333 17.0267 10.3067 16.86 10.62C16.6933 10.9333 16.4267 11.19 16.06 11.39C15.6933 11.5833 15.2233 11.68 14.65 11.68H13.39V14.5H12.25V7.55H14.65C15.1833 7.55 15.6333 7.64333 16 7.83C16.3733 8.01 16.65 8.25667 16.83 8.57C17.0167 8.88333 17.11 9.23333 17.11 9.62ZM14.65 10.75C15.0833 10.75 15.4067 10.6533 15.62 10.46C15.8333 10.26 15.94 9.98 15.94 9.62C15.94 8.86 15.51 8.48 14.65 8.48H13.39V10.75H14.65ZM17.8173 11.72C17.8173 11.1667 17.9306 10.6767 18.1573 10.25C18.3906 9.82333 18.7039 9.49333 19.0973 9.26C19.4973 9.02 19.9373 8.9 20.4173 8.9C20.8506 8.9 21.2273 8.98667 21.5473 9.16C21.8739 9.32667 22.1339 9.53667 22.3273 9.79V8.99H23.4773V14.5H22.3273V13.68C22.1339 13.94 21.8706 14.1567 21.5373 14.33C21.2039 14.5033 20.8239 14.59 20.3973 14.59C19.9239 14.59 19.4906 14.47 19.0973 14.23C18.7039 13.9833 18.3906 13.6433 18.1573 13.21C17.9306 12.77 17.8173 12.2733 17.8173 11.72ZM22.3273 11.74C22.3273 11.36 22.2473 11.03 22.0873 10.75C21.9339 10.47 21.7306 10.2567 21.4773 10.11C21.2239 9.96333 20.9506 9.89 20.6573 9.89C20.3639 9.89 20.0906 9.96333 19.8373 10.11C19.5839 10.25 19.3773 10.46 19.2173 10.74C19.0639 11.0133 18.9873 11.34 18.9873 11.72C18.9873 12.1 19.0639 12.4333 19.2173 12.72C19.3773 13.0067 19.5839 13.2267 19.8373 13.38C20.0973 13.5267 20.3706 13.6 20.6573 13.6C20.9506 13.6 21.2239 13.5267 21.4773 13.38C21.7306 13.2333 21.9339 13.02 22.0873 12.74C22.2473 12.4533 22.3273 12.12 22.3273 11.74ZM27.1946 8.9C27.6213 8.9 27.9979 8.98667 28.3246 9.16C28.6579 9.32667 28.9179 9.53667 29.1046 9.79V8.99H30.2546V14.59C30.2546 15.0967 30.1479 15.5467 29.9346 15.94C29.7213 16.34 29.4113 16.6533 29.0046 16.88C28.6046 17.1067 28.1246 17.22 27.5646 17.22C26.8179 17.22 26.1979 17.0433 25.7046 16.69C25.2113 16.3433 24.9313 15.87 24.8646 15.27H25.9946C26.0813 15.5567 26.2646 15.7867 26.5446 15.96C26.8313 16.14 27.1713 16.23 27.5646 16.23C28.0246 16.23 28.3946 16.09 28.6746 15.81C28.9613 15.53 29.1046 15.1233 29.1046 14.59V13.67C28.9113 13.93 28.6479 14.15 28.3146 14.33C27.9879 14.5033 27.6146 14.59 27.1946 14.59C26.7146 14.59 26.2746 14.47 25.8746 14.23C25.4813 13.9833 25.1679 13.6433 24.9346 13.21C24.7079 12.77 24.5946 12.2733 24.5946 11.72C24.5946 11.1667 24.7079 10.6767 24.9346 10.25C25.1679 9.82333 25.4813 9.49333 25.8746 9.26C26.2746 9.02 26.7146 8.9 27.1946 8.9ZM29.1046 11.74C29.1046 11.36 29.0246 11.03 28.8646 10.75C28.7113 10.47 28.5079 10.2567 28.2546 10.11C28.0013 9.96333 27.7279 9.89 27.4346 9.89C27.1413 9.89 26.8679 9.96333 26.6146 10.11C26.3613 10.25 26.1546 10.46 25.9946 10.74C25.8413 11.0133 25.7646 11.34 25.7646 11.72C25.7646 12.1 25.8413 12.4333 25.9946 12.72C26.1546 13.0067 26.3613 13.2267 26.6146 13.38C26.8746 13.5267 27.1479 13.6 27.4346 13.6C27.7279 13.6 28.0013 13.5267 28.2546 13.38C28.5079 13.2333 28.7113 13.02 28.8646 12.74C29.0246 12.4533 29.1046 12.12 29.1046 11.74ZM34.142 14.59C33.622 14.59 33.152 14.4733 32.732 14.24C32.312 14 31.982 13.6667 31.742 13.24C31.502 12.8067 31.382 12.3067 31.382 11.74C31.382 11.18 31.5053 10.6833 31.752 10.25C31.9986 9.81667 32.3353 9.48333 32.762 9.25C33.1886 9.01667 33.6653 8.9 34.192 8.9C34.7186 8.9 35.1953 9.01667 35.622 9.25C36.0486 9.48333 36.3853 9.81667 36.632 10.25C36.8786 10.6833 37.002 11.18 37.002 11.74C37.002 12.3 36.8753 12.7967 36.622 13.23C36.3686 13.6633 36.022 14 35.582 14.24C35.1486 14.4733 34.6686 14.59 34.142 14.59ZM34.142 13.6C34.4353 13.6 34.7086 13.53 34.962 13.39C35.222 13.25 35.432 13.04 35.592 12.76C35.752 12.48 35.832 12.14 35.832 11.74C35.832 11.34 35.7553 11.0033 35.602 10.73C35.4486 10.45 35.2453 10.24 34.992 10.1C34.7386 9.96 34.4653 9.89 34.172 9.89C33.8786 9.89 33.6053 9.96 33.352 10.1C33.1053 10.24 32.9086 10.45 32.762 10.73C32.6153 11.0033 32.542 11.34 32.542 11.74C32.542 12.3333 32.692 12.7933 32.992 13.12C33.2986 13.44 33.682 13.6 34.142 13.6Z" fill="white" />
                                    </svg> : <svg width="49" height="22" viewBox="0 0 49 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="0.5" y="1" width="48" height="20" rx="10" fill="#E63757" />
                                        <rect x="0.5" y="1" width="48" height="20" rx="10" stroke="#E63757" />
                                        <path d="M14.02 7.55C14.76 7.55 15.4067 7.69333 15.96 7.98C16.52 8.26 16.95 8.66667 17.25 9.2C17.5567 9.72667 17.71 10.3433 17.71 11.05C17.71 11.7567 17.5567 12.37 17.25 12.89C16.95 13.41 16.52 13.81 15.96 14.09C15.4067 14.3633 14.76 14.5 14.02 14.5H11.75V7.55H14.02ZM14.02 13.57C14.8333 13.57 15.4567 13.35 15.89 12.91C16.3233 12.47 16.54 11.85 16.54 11.05C16.54 10.2433 16.3233 9.61333 15.89 9.16C15.4567 8.70667 14.8333 8.48 14.02 8.48H12.89V13.57H14.02ZM23.8898 11.61C23.8898 11.8167 23.8765 12.0033 23.8498 12.17H19.6398C19.6732 12.61 19.8365 12.9633 20.1298 13.23C20.4232 13.4967 20.7832 13.63 21.2098 13.63C21.8232 13.63 22.2565 13.3733 22.5098 12.86H23.7398C23.5732 13.3667 23.2698 13.7833 22.8298 14.11C22.3965 14.43 21.8565 14.59 21.2098 14.59C20.6832 14.59 20.2098 14.4733 19.7898 14.24C19.3765 14 19.0498 13.6667 18.8098 13.24C18.5765 12.8067 18.4598 12.3067 18.4598 11.74C18.4598 11.1733 18.5732 10.6767 18.7998 10.25C19.0332 9.81667 19.3565 9.48333 19.7698 9.25C20.1898 9.01667 20.6698 8.9 21.2098 8.9C21.7298 8.9 22.1932 9.01333 22.5998 9.24C23.0065 9.46667 23.3232 9.78667 23.5498 10.2C23.7765 10.6067 23.8898 11.0767 23.8898 11.61ZM22.6998 11.25C22.6932 10.83 22.5432 10.4933 22.2498 10.24C21.9565 9.98667 21.5932 9.86 21.1598 9.86C20.7665 9.86 20.4298 9.98667 20.1498 10.24C19.8698 10.4867 19.7032 10.8233 19.6498 11.25H22.6998ZM26.1517 9.81C26.3451 9.54333 26.6084 9.32667 26.9417 9.16C27.2817 8.98667 27.6584 8.9 28.0717 8.9C28.5584 8.9 28.9984 9.01667 29.3917 9.25C29.7851 9.48333 30.0951 9.81667 30.3217 10.25C30.5484 10.6767 30.6617 11.1667 30.6617 11.72C30.6617 12.2733 30.5484 12.77 30.3217 13.21C30.0951 13.6433 29.7817 13.9833 29.3817 14.23C28.9884 14.47 28.5517 14.59 28.0717 14.59C27.6451 14.59 27.2651 14.5067 26.9317 14.34C26.6051 14.1733 26.3451 13.96 26.1517 13.7V14.5H25.0117V7.1H26.1517V9.81ZM29.5017 11.72C29.5017 11.34 29.4217 11.0133 29.2617 10.74C29.1084 10.46 28.9017 10.25 28.6417 10.11C28.3884 9.96333 28.1151 9.89 27.8217 9.89C27.5351 9.89 27.2617 9.96333 27.0017 10.11C26.7484 10.2567 26.5417 10.47 26.3817 10.75C26.2284 11.03 26.1517 11.36 26.1517 11.74C26.1517 12.12 26.2284 12.4533 26.3817 12.74C26.5417 13.02 26.7484 13.2333 27.0017 13.38C27.2617 13.5267 27.5351 13.6 27.8217 13.6C28.1151 13.6 28.3884 13.5267 28.6417 13.38C28.9017 13.2267 29.1084 13.0067 29.2617 12.72C29.4217 12.4333 29.5017 12.1 29.5017 11.72ZM36.8391 11.61C36.8391 11.8167 36.8257 12.0033 36.7991 12.17H32.5891C32.6224 12.61 32.7857 12.9633 33.0791 13.23C33.3724 13.4967 33.7324 13.63 34.1591 13.63C34.7724 13.63 35.2057 13.3733 35.4591 12.86H36.6891C36.5224 13.3667 36.2191 13.7833 35.7791 14.11C35.3457 14.43 34.8057 14.59 34.1591 14.59C33.6324 14.59 33.1591 14.4733 32.7391 14.24C32.3257 14 31.9991 13.6667 31.7591 13.24C31.5257 12.8067 31.4091 12.3067 31.4091 11.74C31.4091 11.1733 31.5224 10.6767 31.7491 10.25C31.9824 9.81667 32.3057 9.48333 32.7191 9.25C33.1391 9.01667 33.6191 8.9 34.1591 8.9C34.6791 8.9 35.1424 9.01333 35.5491 9.24C35.9557 9.46667 36.2724 9.78667 36.4991 10.2C36.7257 10.6067 36.8391 11.0767 36.8391 11.61ZM35.6491 11.25C35.6424 10.83 35.4924 10.4933 35.1991 10.24C34.9057 9.98667 34.5424 9.86 34.1091 9.86C33.7157 9.86 33.3791 9.98667 33.0991 10.24C32.8191 10.4867 32.6524 10.8233 32.5991 11.25H35.6491Z" fill="white" />
                                    </svg>}</span>
                                </div>
                                <div className="hidden px-6 py-4 md:flex md:items-center md:justify-center gap-2">
                                    <button onClick={() => {
                                        router.push(`/client/${el.id}/edit`)
                                    }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                        </svg>
                                    </button>
                                    <button onClick={() => {
                                        DeleteClient(el.id)
                                    }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                        </svg>
                                    </button>
                                </div>
                            </div>))}
                        </div>
                    </div>
                    </> : <h1 className='w-full bg-white mt-4 font-bold py-4 text-center'>No hay elementos para mostrar</h1>}
                    <div className="bg-white border-b py-3 flex gap-4 w-full justify-center mt-4 ">
                        {/* <tr className='flex w-full justify-center'> */}
                        <button className="text-gray-900 flex gap-2 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-2 py-1  ">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                            </svg>
                        </button>
                        <Pagination itemsPerPage={itemsPerPage} totalItems={data?.length} paginate={paginate} currentPage={currentPage} />
                        <button className="text-gray-900 flex gap-2 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-2 py-1  ">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                            </svg>
                        </button>
                        {/* </tr> */}
                    </div>
                </div>
            </div>
            <div className='hidden lg:block w-1/4 h-full'>
                <FilterComponent handleSearch={handleSearch} selectAct={selectAct} setSelectAct={setSelectAct} selectPay={selectPay} setSelectPay={setSelectPay} setOpen={setOpen} />
            </div>
            <ToastContainer />
            {
                open && <div className="fixed top-0 right-0 bottom-0 left-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                    <div id="popup-modal" className="relative bg-white rounded-lg shadow px-4 mx-4  w-full md:max-w-md">
                        <FilterComponent handleSearch={handleSearch} selectAct={selectAct} setSelectAct={setSelectAct} selectPay={selectPay} setSelectPay={setSelectPay} setOpen={setOpen} />
                    </div>
                </div>
            }
        </div>
    );
};






