"use client"
import React from 'react';

interface FormClientProps {
    selectMng:any; 
    setSelectMgm:any; 
    selectPriority:any; 
    setSelectPriotity:any;
    handleSearch:any;
    inputId:any;
    setInputId:any;
    setOpen:any;
}

export const FilterComponent: React.FC<FormClientProps> = ({handleSearch,selectMng, setSelectMgm, selectPriority, setSelectPriotity, inputId, setInputId, setOpen}) => {

    return (
        <div className='w-full h-full flex flex-col items-center gap-4 px-10 py-5 bg-white'>
            <h1>
                Filtrar
            </h1>
            <div className='flex flex-col w-full'>
                <label className="block mb-2 text-sm font-medium text-gray-900">Encargado</label>
                <select value={selectMng} onChange={(e)=>{setSelectMgm(e.target.value); setInputId("")}} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                    <option value={""}>--</option>
                    <option value={"FACELAD"}>Facelad</option>
                    <option value={"8PRO"}>8 pro</option>
                    {/* <option value={""}>Ambos</option> */}
                </select>
            </div>
            <div className='flex flex-col w-full'>
                <label className="block mb-2 text-sm font-medium text-gray-900">Prioridad</label>
                <select value={selectPriority} onChange={(e)=>{setSelectPriotity(e.target.value);setInputId("")}} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                    <option value={""}>--</option>
                    <option value={"LOW"}>Bajo</option>
                    <option value={"MEDIUM"}>Medio</option>
                    <option value={"HIGH"}>Alto</option>
                    <option value={"URGENT"}>Urgente</option>
                </select>
            </div>
            <div className='flex flex-col w-full'>
                <label className="block mb-2 text-sm font-medium text-gray-900">#</label>
                <input value={inputId} onChange={(e)=>{setInputId(e.target.value); setSelectMgm(""); setSelectPriotity("") }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"/>
            </div>
            <button onClick={()=>{handleSearch(); setOpen(false)}} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 w-full">
                Buscar
            </button>
            <button onClick={()=>setOpen(false)} className="md:hidden text-white bg-gray-400 hover:bg-gray-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 w-full">
                Cerrar
            </button>
        </div>
    );
};