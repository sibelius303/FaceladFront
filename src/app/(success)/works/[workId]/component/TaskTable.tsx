"use client"
import { useRouter } from 'next/navigation';
import React, { Suspense, useState } from 'react';
import DataTable from 'react-data-table-component';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Toggle from './Toggle';

interface DataItem {
    id: number,
    name: string,
    cliente: string,
    prioridad: string,
    encargado: string,
}

interface Task {
    id: number;
    title: string;
    description: string;
    assigned_to: string;
    status: boolean;
    is_active: boolean;
    is_deleted: boolean;
    created_at: string;
    updated_at: string;
    work_id: number;
  }


interface TaskTableProps {
    task: Task[];
}

interface Task {
    id: number;
    title: string;
    description: string;
    assigned_to: string;
    status: boolean;
    is_active: boolean;
    is_deleted: boolean;
    created_at: string;
    updated_at: string;
    work_id: number;
}

type StateType = Task | {};



export const TaskTable: React.FC<TaskTableProps> = ({ task }) => {
    const [open, setOpen] = useState<boolean>(false);
    const [dataSubmit, setDataSubmit] = useState<StateType>({})
    const router = useRouter();

    const handleRowClicked = (row: DataItem) => {
        router.push(`client/${row.id}/timeline`)
    };

    const afterToastFunction = () => {
        router.refresh()
    };

    const DeleteTask = async (id: number) => {
        try {
            const headers: HeadersInit = new Headers();
            headers.append("Content-Type", "application/json");
            const response: Response = await fetch(`${process.env.BACK_URL}api/task/taskdelete`, {
                method: 'POST',
                headers,
                body: JSON.stringify(+
                    id
                )
            });
            const responseJSON = await response.json();
            if (responseJSON.ok) {
                toast.success(`${responseJSON.data.title} eliminado con exito`, {
                    onClose: afterToastFunction
                })
            } else {
                console.log("hubo un error")
            }
        } catch (error: any) {
            console.log("soy el error del delete en el cliente del cliente", error)
        }
        // toast.warning("Esta funcion esta deshabilitada temporalmente")
    }

    const handleSubmitToggle = async (data: any) => {
        const headers: HeadersInit = new Headers();
        headers.append("Content-Type", "application/json");
        const response: Response = await fetch(`${process.env.BACK_URL}api/task/taskfinished`, {
            method: 'POST',
            headers,
            body: JSON.stringify(
                { data: data, id: data.id }
            )
        });
        const responseJSON = await response.json();
        if (responseJSON.data === 200) {
            router.refresh();
            toast.success("Se ha actualizado la tarea exitosamente")
            setOpen(false)
            return
        }
        toast.error("No se ha podido actualizar la tarea, por favor intente mas tarde")
        setOpen(false)
    }

    const handleEditar = (obj:any)=>{
        if(obj.status){
            toast.warning("No se puede editar una tarea Finalizada")
        } else {
            router.push(`/works/${obj.work_id}/editTiket/${obj.id}`)
        }
    }



    return (
        <div className='w-full flex h-auto'>
            <div className='w-full'>
                {/* <div className='flex justify-between items-center py-4 px-10 bg-white'>
                    <div className='flex items-center gap-2'>
                        <span className='text-xs'>Todos los clientes</span>
                        <div className='flex'>
                            <input placeholder='Buscar por nombre' className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-sm focus:ring-blue-500 focus:border-blue-500 block  p-1 px-4  " />
                            <button className='border px-2 rounded-r-md'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <button onClick={() => router.push("/works/new")} className="text-white rounded-md flex items-center text-xs bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium  px-3 py-1  w-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Nuevo Trabajo
                    </button>
                </div> */}
                <div className="relative overflow-x-auto">
                    <div className="w-full text-sm text-left rtl:text-right text-gray-500  ">
                        <div className=''>
                            {
                                task?.map(el => (<div key={el.id} className="bg-white grid grid-cols-2 md:grid-cols-3 border-b py-6 mb-4 rounded-md hover:cursor-pointer hover:bg-slate-100 ">
                                    <div className="px-6 py-4 flex items-center gap-4 text-xs font-medium  whitespace-nowrap">
                                        <div>
                                            <h1 className="text-md text-blueprimary">{el.description}</h1>
                                            <div className="flex items-center gap-2">
                                                {
                                                    el.status ? <>
                                                        <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M6.5 13.125C2.89453 13.125 0 10.2305 0 6.625C0 3.04492 2.89453 0.125 6.5 0.125C10.0801 0.125 13 3.04492 13 6.625C13 10.2305 10.0801 13.125 6.5 13.125ZM5.89062 6.625C5.89062 6.82812 5.99219 7.03125 6.14453 7.13281L8.58203 8.75781C8.86133 8.96094 9.24219 8.88477 9.41992 8.60547C9.62305 8.32617 9.54688 7.94531 9.26758 7.74219L7.10938 6.32031V3.17188C7.10938 2.8418 6.83008 2.5625 6.47461 2.5625C6.14453 2.5625 5.86523 2.8418 5.86523 3.17188L5.89062 6.625Z" fill="#4D5969" />
                                                        </svg>
                                                        {el?.updated_at?.split('T')[0]}
                                                        <svg width="75" height="21" viewBox="0 0 75 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <rect x="0.5" y="0.5" width="74" height="20" rx="10" fill="#828282" />
                                                            <rect x="0.5" y="0.5" width="74" height="20" rx="10" stroke="#828282" />
                                                            <path d="M16.84 7.05V7.98H13.89V10.03H16.19V10.96H13.89V14H12.75V7.05H16.84ZM18.4765 7.76C18.2698 7.76 18.0965 7.69 17.9565 7.55C17.8165 7.41 17.7465 7.23667 17.7465 7.03C17.7465 6.82333 17.8165 6.65 17.9565 6.51C18.0965 6.37 18.2698 6.3 18.4765 6.3C18.6765 6.3 18.8465 6.37 18.9865 6.51C19.1265 6.65 19.1965 6.82333 19.1965 7.03C19.1965 7.23667 19.1265 7.41 18.9865 7.55C18.8465 7.69 18.6765 7.76 18.4765 7.76ZM19.0365 8.49V14H17.8965V8.49H19.0365ZM23.3132 8.4C23.7465 8.4 24.1332 8.49 24.4732 8.67C24.8199 8.85 25.0899 9.11667 25.2832 9.47C25.4765 9.82333 25.5732 10.25 25.5732 10.75V14H24.4432V10.92C24.4432 10.4267 24.3199 10.05 24.0732 9.79C23.8265 9.52333 23.4899 9.39 23.0632 9.39C22.6365 9.39 22.2965 9.52333 22.0432 9.79C21.7965 10.05 21.6732 10.4267 21.6732 10.92V14H20.5332V8.49H21.6732V9.12C21.8599 8.89333 22.0965 8.71667 22.3832 8.59C22.6765 8.46333 22.9865 8.4 23.3132 8.4ZM26.6473 11.22C26.6473 10.6667 26.7607 10.1767 26.9873 9.75C27.2207 9.32333 27.534 8.99333 27.9273 8.76C28.3273 8.52 28.7673 8.4 29.2473 8.4C29.6807 8.4 30.0573 8.48667 30.3773 8.66C30.704 8.82667 30.964 9.03667 31.1573 9.29V8.49H32.3073V14H31.1573V13.18C30.964 13.44 30.7007 13.6567 30.3673 13.83C30.034 14.0033 29.654 14.09 29.2273 14.09C28.754 14.09 28.3207 13.97 27.9273 13.73C27.534 13.4833 27.2207 13.1433 26.9873 12.71C26.7607 12.27 26.6473 11.7733 26.6473 11.22ZM31.1573 11.24C31.1573 10.86 31.0773 10.53 30.9173 10.25C30.764 9.97 30.5607 9.75667 30.3073 9.61C30.054 9.46333 29.7807 9.39 29.4873 9.39C29.194 9.39 28.9207 9.46333 28.6673 9.61C28.414 9.75 28.2073 9.96 28.0473 10.24C27.894 10.5133 27.8173 10.84 27.8173 11.22C27.8173 11.6 27.894 11.9333 28.0473 12.22C28.2073 12.5067 28.414 12.7267 28.6673 12.88C28.9273 13.0267 29.2007 13.1 29.4873 13.1C29.7807 13.1 30.054 13.0267 30.3073 12.88C30.5607 12.7333 30.764 12.52 30.9173 12.24C31.0773 11.9533 31.1573 11.62 31.1573 11.24ZM34.9447 6.6V14H33.8047V6.6H34.9447ZM37.0214 7.76C36.8147 7.76 36.6414 7.69 36.5014 7.55C36.3614 7.41 36.2914 7.23667 36.2914 7.03C36.2914 6.82333 36.3614 6.65 36.5014 6.51C36.6414 6.37 36.8147 6.3 37.0214 6.3C37.2214 6.3 37.3914 6.37 37.5314 6.51C37.6714 6.65 37.7414 6.82333 37.7414 7.03C37.7414 7.23667 37.6714 7.41 37.5314 7.55C37.3914 7.69 37.2214 7.76 37.0214 7.76ZM37.5814 8.49V14H36.4414V8.49H37.5814ZM40.0881 13.07H42.5881V14H38.7681V13.07L41.2781 9.42H38.7681V8.49H42.5881V9.42L40.0881 13.07ZM43.4052 11.22C43.4052 10.6667 43.5185 10.1767 43.7452 9.75C43.9785 9.32333 44.2918 8.99333 44.6852 8.76C45.0852 8.52 45.5252 8.4 46.0052 8.4C46.4385 8.4 46.8152 8.48667 47.1352 8.66C47.4618 8.82667 47.7218 9.03667 47.9152 9.29V8.49H49.0652V14H47.9152V13.18C47.7218 13.44 47.4585 13.6567 47.1252 13.83C46.7918 14.0033 46.4118 14.09 45.9852 14.09C45.5118 14.09 45.0785 13.97 44.6852 13.73C44.2918 13.4833 43.9785 13.1433 43.7452 12.71C43.5185 12.27 43.4052 11.7733 43.4052 11.22ZM47.9152 11.24C47.9152 10.86 47.8352 10.53 47.6752 10.25C47.5218 9.97 47.3185 9.75667 47.0652 9.61C46.8118 9.46333 46.5385 9.39 46.2452 9.39C45.9518 9.39 45.6785 9.46333 45.4252 9.61C45.1718 9.75 44.9652 9.96 44.8052 10.24C44.6518 10.5133 44.5752 10.84 44.5752 11.22C44.5752 11.6 44.6518 11.9333 44.8052 12.22C44.9652 12.5067 45.1718 12.7267 45.4252 12.88C45.6852 13.0267 45.9585 13.1 46.2452 13.1C46.5385 13.1 46.8118 13.0267 47.0652 12.88C47.3185 12.7333 47.5218 12.52 47.6752 12.24C47.8352 11.9533 47.9152 11.62 47.9152 11.24ZM50.1825 11.22C50.1825 10.6667 50.2958 10.1767 50.5225 9.75C50.7558 9.32333 51.0692 8.99333 51.4625 8.76C51.8625 8.52 52.3058 8.4 52.7925 8.4C53.1525 8.4 53.5058 8.48 53.8525 8.64C54.2058 8.79333 54.4858 9 54.6925 9.26V6.6H55.8425V14H54.6925V13.17C54.5058 13.4367 54.2458 13.6567 53.9125 13.83C53.5858 14.0033 53.2092 14.09 52.7825 14.09C52.3025 14.09 51.8625 13.97 51.4625 13.73C51.0692 13.4833 50.7558 13.1433 50.5225 12.71C50.2958 12.27 50.1825 11.7733 50.1825 11.22ZM54.6925 11.24C54.6925 10.86 54.6125 10.53 54.4525 10.25C54.2992 9.97 54.0958 9.75667 53.8425 9.61C53.5892 9.46333 53.3158 9.39 53.0225 9.39C52.7292 9.39 52.4558 9.46333 52.2025 9.61C51.9492 9.75 51.7425 9.96 51.5825 10.24C51.4292 10.5133 51.3525 10.84 51.3525 11.22C51.3525 11.6 51.4292 11.9333 51.5825 12.22C51.7425 12.5067 51.9492 12.7267 52.2025 12.88C52.4625 13.0267 52.7358 13.1 53.0225 13.1C53.3158 13.1 53.5892 13.0267 53.8425 12.88C54.0958 12.7333 54.2992 12.52 54.4525 12.24C54.6125 11.9533 54.6925 11.62 54.6925 11.24ZM59.7298 14.09C59.2098 14.09 58.7398 13.9733 58.3198 13.74C57.8998 13.5 57.5698 13.1667 57.3298 12.74C57.0898 12.3067 56.9698 11.8067 56.9698 11.24C56.9698 10.68 57.0932 10.1833 57.3398 9.75C57.5865 9.31667 57.9232 8.98333 58.3498 8.75C58.7765 8.51667 59.2532 8.4 59.7798 8.4C60.3065 8.4 60.7832 8.51667 61.2098 8.75C61.6365 8.98333 61.9732 9.31667 62.2198 9.75C62.4665 10.1833 62.5898 10.68 62.5898 11.24C62.5898 11.8 62.4632 12.2967 62.2098 12.73C61.9565 13.1633 61.6098 13.5 61.1698 13.74C60.7365 13.9733 60.2565 14.09 59.7298 14.09ZM59.7298 13.1C60.0232 13.1 60.2965 13.03 60.5498 12.89C60.8098 12.75 61.0198 12.54 61.1798 12.26C61.3398 11.98 61.4198 11.64 61.4198 11.24C61.4198 10.84 61.3432 10.5033 61.1898 10.23C61.0365 9.95 60.8332 9.74 60.5798 9.6C60.3265 9.46 60.0532 9.39 59.7598 9.39C59.4665 9.39 59.1932 9.46 58.9398 9.6C58.6932 9.74 58.4965 9.95 58.3498 10.23C58.2032 10.5033 58.1298 10.84 58.1298 11.24C58.1298 11.8333 58.2798 12.2933 58.5798 12.62C58.8865 12.94 59.2698 13.1 59.7298 13.1Z" fill="white" />
                                                        </svg>
                                                    </> : <>
                                                        <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M6.5 13.125C2.89453 13.125 0 10.2305 0 6.625C0 3.04492 2.89453 0.125 6.5 0.125C10.0801 0.125 13 3.04492 13 6.625C13 10.2305 10.0801 13.125 6.5 13.125ZM5.89062 6.625C5.89062 6.82812 5.99219 7.03125 6.14453 7.13281L8.58203 8.75781C8.86133 8.96094 9.24219 8.88477 9.41992 8.60547C9.62305 8.32617 9.54688 7.94531 9.26758 7.74219L7.10938 6.32031V3.17188C7.10938 2.8418 6.83008 2.5625 6.47461 2.5625C6.14453 2.5625 5.86523 2.8418 5.86523 3.17188L5.89062 6.625Z" fill="#4D5969" />
                                                        </svg>
                                                        Pendiente
                                                        <svg width="75" height="21" viewBox="0 0 75 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <rect x="0.5" y="0.5" width="74" height="20" rx="10" fill="#F5803E" />
                                                            <rect x="0.5" y="0.5" width="74" height="20" rx="10" stroke="#F5803E" />
                                                            <path d="M10.96 14H9.82L6.39 8.81V14H5.25V7.04H6.39L9.82 12.22V7.04H10.96V14ZM14.847 14.09C14.327 14.09 13.857 13.9733 13.437 13.74C13.017 13.5 12.687 13.1667 12.447 12.74C12.207 12.3067 12.087 11.8067 12.087 11.24C12.087 10.68 12.2104 10.1833 12.457 9.75C12.7037 9.31667 13.0404 8.98333 13.467 8.75C13.8937 8.51667 14.3704 8.4 14.897 8.4C15.4237 8.4 15.9004 8.51667 16.327 8.75C16.7537 8.98333 17.0904 9.31667 17.337 9.75C17.5837 10.1833 17.707 10.68 17.707 11.24C17.707 11.8 17.5804 12.2967 17.327 12.73C17.0737 13.1633 16.727 13.5 16.287 13.74C15.8537 13.9733 15.3737 14.09 14.847 14.09ZM14.847 13.1C15.1404 13.1 15.4137 13.03 15.667 12.89C15.927 12.75 16.137 12.54 16.297 12.26C16.457 11.98 16.537 11.64 16.537 11.24C16.537 10.84 16.4604 10.5033 16.307 10.23C16.1537 9.95 15.9504 9.74 15.697 9.6C15.4437 9.46 15.1704 9.39 14.877 9.39C14.5837 9.39 14.3104 9.46 14.057 9.6C13.8104 9.74 13.6137 9.95 13.467 10.23C13.3204 10.5033 13.247 10.84 13.247 11.24C13.247 11.8333 13.397 12.2933 13.697 12.62C14.0037 12.94 14.387 13.1 14.847 13.1ZM23.7416 9.42H22.7216V14H21.5716V9.42H20.9216V8.49H21.5716V8.1C21.5716 7.46667 21.7383 7.00667 22.0716 6.72C22.4116 6.42667 22.9416 6.28 23.6616 6.28V7.23C23.315 7.23 23.0716 7.29667 22.9316 7.43C22.7916 7.55667 22.7216 7.78 22.7216 8.1V8.49H23.7416V9.42ZM25.332 7.76C25.1253 7.76 24.952 7.69 24.812 7.55C24.672 7.41 24.602 7.23667 24.602 7.03C24.602 6.82333 24.672 6.65 24.812 6.51C24.952 6.37 25.1253 6.3 25.332 6.3C25.532 6.3 25.702 6.37 25.842 6.51C25.982 6.65 26.052 6.82333 26.052 7.03C26.052 7.23667 25.982 7.41 25.842 7.55C25.702 7.69 25.532 7.76 25.332 7.76ZM25.892 8.49V14H24.752V8.49H25.892ZM30.1687 8.4C30.602 8.4 30.9887 8.49 31.3287 8.67C31.6753 8.85 31.9453 9.11667 32.1387 9.47C32.332 9.82333 32.4287 10.25 32.4287 10.75V14H31.2987V10.92C31.2987 10.4267 31.1753 10.05 30.9287 9.79C30.682 9.52333 30.3453 9.39 29.9187 9.39C29.492 9.39 29.152 9.52333 28.8987 9.79C28.652 10.05 28.5287 10.4267 28.5287 10.92V14H27.3887V8.49H28.5287V9.12C28.7153 8.89333 28.952 8.71667 29.2387 8.59C29.532 8.46333 29.842 8.4 30.1687 8.4ZM33.5028 11.22C33.5028 10.6667 33.6161 10.1767 33.8428 9.75C34.0761 9.32333 34.3895 8.99333 34.7828 8.76C35.1828 8.52 35.6228 8.4 36.1028 8.4C36.5361 8.4 36.9128 8.48667 37.2328 8.66C37.5595 8.82667 37.8195 9.03667 38.0128 9.29V8.49H39.1628V14H38.0128V13.18C37.8195 13.44 37.5561 13.6567 37.2228 13.83C36.8895 14.0033 36.5095 14.09 36.0828 14.09C35.6095 14.09 35.1761 13.97 34.7828 13.73C34.3895 13.4833 34.0761 13.1433 33.8428 12.71C33.6161 12.27 33.5028 11.7733 33.5028 11.22ZM38.0128 11.24C38.0128 10.86 37.9328 10.53 37.7728 10.25C37.6195 9.97 37.4161 9.75667 37.1628 9.61C36.9095 9.46333 36.6361 9.39 36.3428 9.39C36.0495 9.39 35.7761 9.46333 35.5228 9.61C35.2695 9.75 35.0628 9.96 34.9028 10.24C34.7495 10.5133 34.6728 10.84 34.6728 11.22C34.6728 11.6 34.7495 11.9333 34.9028 12.22C35.0628 12.5067 35.2695 12.7267 35.5228 12.88C35.7828 13.0267 36.0561 13.1 36.3428 13.1C36.6361 13.1 36.9095 13.0267 37.1628 12.88C37.4161 12.7333 37.6195 12.52 37.7728 12.24C37.9328 11.9533 38.0128 11.62 38.0128 11.24ZM41.8002 6.6V14H40.6602V6.6H41.8002ZM43.8769 7.76C43.6702 7.76 43.4969 7.69 43.3569 7.55C43.2169 7.41 43.1469 7.23667 43.1469 7.03C43.1469 6.82333 43.2169 6.65 43.3569 6.51C43.4969 6.37 43.6702 6.3 43.8769 6.3C44.0769 6.3 44.2469 6.37 44.3869 6.51C44.5269 6.65 44.5969 6.82333 44.5969 7.03C44.5969 7.23667 44.5269 7.41 44.3869 7.55C44.2469 7.69 44.0769 7.76 43.8769 7.76ZM44.4369 8.49V14H43.2969V8.49H44.4369ZM46.9436 13.07H49.4436V14H45.6236V13.07L48.1336 9.42H45.6236V8.49H49.4436V9.42L46.9436 13.07ZM50.2606 11.22C50.2606 10.6667 50.374 10.1767 50.6006 9.75C50.834 9.32333 51.1473 8.99333 51.5406 8.76C51.9406 8.52 52.3806 8.4 52.8606 8.4C53.294 8.4 53.6706 8.48667 53.9906 8.66C54.3173 8.82667 54.5773 9.03667 54.7706 9.29V8.49H55.9206V14H54.7706V13.18C54.5773 13.44 54.314 13.6567 53.9806 13.83C53.6473 14.0033 53.2673 14.09 52.8406 14.09C52.3673 14.09 51.934 13.97 51.5406 13.73C51.1473 13.4833 50.834 13.1433 50.6006 12.71C50.374 12.27 50.2606 11.7733 50.2606 11.22ZM54.7706 11.24C54.7706 10.86 54.6906 10.53 54.5306 10.25C54.3773 9.97 54.174 9.75667 53.9206 9.61C53.6673 9.46333 53.394 9.39 53.1006 9.39C52.8073 9.39 52.534 9.46333 52.2806 9.61C52.0273 9.75 51.8206 9.96 51.6606 10.24C51.5073 10.5133 51.4306 10.84 51.4306 11.22C51.4306 11.6 51.5073 11.9333 51.6606 12.22C51.8206 12.5067 52.0273 12.7267 52.2806 12.88C52.5406 13.0267 52.814 13.1 53.1006 13.1C53.394 13.1 53.6673 13.0267 53.9206 12.88C54.174 12.7333 54.3773 12.52 54.5306 12.24C54.6906 11.9533 54.7706 11.62 54.7706 11.24ZM57.038 11.22C57.038 10.6667 57.1513 10.1767 57.378 9.75C57.6113 9.32333 57.9246 8.99333 58.318 8.76C58.718 8.52 59.1613 8.4 59.648 8.4C60.008 8.4 60.3613 8.48 60.708 8.64C61.0613 8.79333 61.3413 9 61.548 9.26V6.6H62.698V14H61.548V13.17C61.3613 13.4367 61.1013 13.6567 60.768 13.83C60.4413 14.0033 60.0646 14.09 59.638 14.09C59.158 14.09 58.718 13.97 58.318 13.73C57.9246 13.4833 57.6113 13.1433 57.378 12.71C57.1513 12.27 57.038 11.7733 57.038 11.22ZM61.548 11.24C61.548 10.86 61.468 10.53 61.308 10.25C61.1546 9.97 60.9513 9.75667 60.698 9.61C60.4446 9.46333 60.1713 9.39 59.878 9.39C59.5846 9.39 59.3113 9.46333 59.058 9.61C58.8046 9.75 58.598 9.96 58.438 10.24C58.2846 10.5133 58.208 10.84 58.208 11.22C58.208 11.6 58.2846 11.9333 58.438 12.22C58.598 12.5067 58.8046 12.7267 59.058 12.88C59.318 13.0267 59.5913 13.1 59.878 13.1C60.1713 13.1 60.4446 13.0267 60.698 12.88C60.9513 12.7333 61.1546 12.52 61.308 12.24C61.468 11.9533 61.548 11.62 61.548 11.24ZM66.5853 14.09C66.0653 14.09 65.5953 13.9733 65.1753 13.74C64.7553 13.5 64.4253 13.1667 64.1853 12.74C63.9453 12.3067 63.8253 11.8067 63.8253 11.24C63.8253 10.68 63.9486 10.1833 64.1953 9.75C64.442 9.31667 64.7786 8.98333 65.2053 8.75C65.632 8.51667 66.1086 8.4 66.6353 8.4C67.162 8.4 67.6386 8.51667 68.0653 8.75C68.492 8.98333 68.8286 9.31667 69.0753 9.75C69.322 10.1833 69.4453 10.68 69.4453 11.24C69.4453 11.8 69.3186 12.2967 69.0653 12.73C68.812 13.1633 68.4653 13.5 68.0253 13.74C67.592 13.9733 67.112 14.09 66.5853 14.09ZM66.5853 13.1C66.8786 13.1 67.152 13.03 67.4053 12.89C67.6653 12.75 67.8753 12.54 68.0353 12.26C68.1953 11.98 68.2753 11.64 68.2753 11.24C68.2753 10.84 68.1986 10.5033 68.0453 10.23C67.892 9.95 67.6886 9.74 67.4353 9.6C67.182 9.46 66.9086 9.39 66.6153 9.39C66.322 9.39 66.0486 9.46 65.7953 9.6C65.5486 9.74 65.352 9.95 65.2053 10.23C65.0586 10.5033 64.9853 10.84 64.9853 11.24C64.9853 11.8333 65.1353 12.2933 65.4353 12.62C65.742 12.94 66.1253 13.1 66.5853 13.1Z" fill="white" />
                                                        </svg>
                                                    </>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="hidden md:inline-block my-auto mx-auto">
                                        <div className='flex items-center justify-start gap-4'>
                                            <div className='border-2 border-gray-600 rounded-md py-1 px-4'>
                                                {el.assigned_to}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="my-auto">
                                        <div className='flex items-center justify-end px-2 md:px-0  md:justify-around gap-4'>
                                            <div className='hidden md:flex gap-4'>
                                                <button onClick={() => {
                                                    handleEditar(el)
                                                }}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                    </svg>
                                                </button>
                                                <button onClick={() => {
                                                    DeleteTask(el.id)
                                                }}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                    </svg>
                                                </button>
                                            </div>
                                            {<Toggle item={el} setOpen={setOpen} setDataSubmit={setDataSubmit} />}
                                        </div>
                                    </div>
                                </div>))
                            }
                        </div>
                    </div>
                    {/* <div className="bg-white border-b py-3 flex gap-4 w-full justify-center mt-4 ">       
                        <button className="text-gray-900 flex gap-2 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-2 py-1  ">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                            </svg>
                        </button>
                        <button className="text-blueprimary flex gap-2 items-center justify-center  bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-xs px-2 py-1  ">
                            1
                        </button>
                        <button className="text-gray-900 flex gap-2 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-2 py-1  ">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                            </svg>
                        </button>
                    </div> */}
                </div>
            </div>
            <ToastContainer />
            {
                open && <div className="fixed top-0 right-0 bottom-0 left-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                    <div id="popup-modal" className="relative bg-white rounded-lg shadow max-w-md w-full md:max-w-md">
                        <button
                            onClick={() => setOpen(false)}
                            type="button"
                            className="absolute top-3 right-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center"
                            data-modal-hide="popup-modal"
                        >
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <div className="p-4 md:p-5 text-center">
                            <svg className="mx-auto mb-4 text-gray-400 w-12 h-12" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            <h3 className="mb-5 text-lg font-normal text-gray-500">¿Está seguro que desea {'status' in dataSubmit && dataSubmit?.status ? "volver atras con la tarea: " : "finalizar la tarea: "} <b>{'title' in dataSubmit && dataSubmit?.title}</b>?</h3>
                            <button
                                onClick={() => setOpen(false)}
                                data-modal-hide="popup-modal"
                                type="button"
                                className="py-2.5 px-5  text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={() => { 'status' in dataSubmit && handleSubmitToggle({ ...dataSubmit, status: !dataSubmit?.status }) }}
                                data-modal-hide="popup-modal"
                                type="button"
                                className="text-white bg-blue-600 ms-3 hover:bg-opacity-20 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                            >
                                {'status' in dataSubmit && dataSubmit?.status ? "Revertir" : "Finalizar "}
                            </button>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};



