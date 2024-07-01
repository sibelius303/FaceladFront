"use client"
import React from 'react';

interface FormClientProps {
    selectAct: any;
    setSelectAct: any;
    selectPay: any;
    setSelectPay: any;
    handleSearch: any;
    setOpen:any;
}

export const FilterComponent: React.FC<FormClientProps> = ({handleSearch, selectAct, setSelectAct, selectPay, setSelectPay, setOpen}) => {

    return (
        <div className='w-full h-full flex flex-col items-center gap-4 px-10 py-5 bg-white'>
            <h1>
                Filtrar
            </h1>
            <div className='flex flex-col w-full'>
                <label className="block mb-2 text-sm font-medium text-gray-900">Actividad</label>
                <select value={selectAct} onChange={(e)=>{setSelectAct(e.target.value);setSelectPay("")}} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                    <option value={""}>--</option>
                    <option value={"true"}>Activo</option>
                    <option value={"false"}>Inactivo</option>
                </select>
            </div>
            <div className='flex flex-col w-full'>
                <label className="block mb-2 text-sm font-medium text-gray-900">Facturación</label>
                <select value={selectPay} onChange={(e)=>{setSelectPay(e.target.value);setSelectAct("")}} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                    <option value={""}>--</option>
                    <option value={"true"}>Pago</option>
                    <option value={"false"}>No Pago</option>
                </select>
            </div>
            <button onClick={()=>{handleSearch();setOpen(false)}} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 w-full">
                Buscar
            </button>
            <button onClick={()=>setOpen(false)} className="text-white lg:hidden bg-gray-400 hover:bg-gray-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 w-full">
                Cerrar
            </button>
        </div>
    );
};