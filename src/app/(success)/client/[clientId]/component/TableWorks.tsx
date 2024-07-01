"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import TimeLine from './TimeLine';

interface DataItem {
    id: number;
    cliente: string;
    objetivo: string;
    status: string;
    prioridad: string;
    encargado: string;
}

const columns = [
    {
        name: 'Cliente',
        selector: (row: DataItem) => row.cliente,
        sordiv: false,
    },
    {
        name: 'Trabajo',
        cell: (row: DataItem) => (
            <span className="text-blue-500">{row.objetivo}</span>
        ),
        width: '250px',
        sordiv: false,
    },
    {
        name: 'Prioridad',
        cell: (row: DataItem) => (
            <span
                className={`px-2 py-1 rounded ${row.status === 'Baja'
                    ? 'bg-green-500 text-green-900'
                    : row.status === 'Urgente'
                        ? 'bg-red-500 text-red-900'
                        : ''
                    }`}
            >
                {row.status}
            </span>
        ),
        sordiv: false,
    },
    {
        name: 'Encargado',
        cell: (row: DataItem) => (
            <span className="text-blue-500">{row.encargado}</span>
        ),
        width: '250px',
        sordiv: false,
    },
    // {
    //     name: 'Acion',
    //     cell: (row: DataItem) => (
    //         <button className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-2 py-1  ">
    //             Agregar Tiket
    //         </button>
    //     ),
    //     sordiv: false,
    // },
];

const data: DataItem[] = [
    {
        id: 1,
        cliente: 'Julio Ramirez',
        objetivo: 'Branding de Marca',
        status: 'Reciente',
        prioridad: 'Urgente',
        encargado: 'Facelad',
    },
    {
        id: 2,
        cliente: 'Julio Ramirez',
        objetivo: 'Branding de Marca',
        status: 'Cancelado',
        prioridad: 'Urgente',
        encargado: 'Facelad',
    },
];

export const Worksdiv: React.FC = () => {
    const router: any = useRouter();
    const [timeLine, setTimeLine] = useState(false)

    const handleRowClicked = (row: DataItem) => {
        setTimeLine(true)
    };


    return (
        <>
            {!timeLine ?
                <div className="relative overflow-x-auto">
                    <div className="w-full text-sm text-left rtl:text-right bg-gray-50 text-gray-500  ">
                        <div className="text-xs text-gray-400 border-b border-t bg-gray-50 mb-4 ">
                            <tr>
                                <div  className="px-6 text-xs py-3 w-3/4 ">
                                    Todos los trabajos
                                </div>
                                <div  className="px-6 text-xs py-3">
                                    Prioridad
                                </div>
                                <div  className="px-6 text-xs py-3">
                                    Encargado
                                </div>
                            </tr>
                        </div>
                        <div className=''>
                            <tr className="bg-white border-b py-12 mb-4 rounded-md ">
                                <div className="px-6 py-4 text-xs flex items-center gap-4 font-medium text-blueprimary whitespace-nowrap">
                                    <div className="relative inline-flex items-center  justify-center w-10 h-10 overflow-hidden bg-blue-950 rounded-full">
                                        <span className="font-medium text-white text-sm">JL</span>
                                    </div>
                                    Diseño Web #0012
                                </div>
                                <div className="px-3 text-xs py-4">
                                    Urgente
                                </div>
                                <div className="px-6 text-xs py-4">
                                    Facelad
                                </div>
                            </tr>
                            <tr className="bg-white border-b py-12 mb-4 rounded-md ">
                                <div className="px-6 py-4 text-xs flex items-center gap-4 font-medium text-blueprimary whitespace-nowrap">
                                    <div className="relative inline-flex items-center  justify-center w-10 h-10 overflow-hidden bg-blue-950 rounded-full">
                                        <span className="font-medium text-white text-sm">JL</span>
                                    </div>
                                    Diseño Web #0012
                                </div>
                                <div className="px-3 text-xs py-4">
                                    Urgente
                                </div>
                                <div className="px-6 text-xs py-4">
                                    Facelad
                                </div>
                            </tr>
                        </div>
                    </div>
                    <div className="bg-white border-b py-3 flex gap-4 w-full justify-center mt-4 ">
                        {/* <tr className='flex w-full justify-center'> */}
                        <button className="text-gray-900 flex gap-2 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-2 py-1  ">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                            </svg>
                        </button>
                        <button className="text-blueprimary text-xs flex gap-2 items-center justify-center  bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg px-4 py-1  ">
                            1
                        </button>
                        <button className="text-gray-900 flex gap-2 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-2 py-1  ">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                            </svg>
                        </button>
                        {/* </tr> */}
                    </div>
                </div>

                : <TimeLine setTimeLine={setTimeLine} />}
        </>
    );
};