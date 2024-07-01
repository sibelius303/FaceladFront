"use client"
import { useRouter } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

interface Payment {
    id: number;
    description: string;
    payment_date: string;
    amount: string;
    payment_method: string;
    is_deleted: boolean;
    created_at: string;
    updated_at: string;
    billing_id: number;
  }

interface BillingInfo {
    id: number;
    currency: string;
    billing_date: string;
    due_date: string;
    total_amount: number;
    title: string;
    folio: string;
    description: string;
    is_paid: boolean;
    is_deleted: boolean;
    created_at: string;
    updated_at: string;
    work_id: number;
    payments_list: Payment[];
}


interface PaymentProps {
    payments: BillingInfo
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



export const PaymentsTable: React.FC<PaymentProps> = ({payments}) => {
    const [input, setInput] = useState("");
    const [selectMng, setSelectMgm] = useState("");
    const [selectPriority, setSelectPriotity] = useState("");
    const [inputId, setInputId] = useState("");
    // const [data, setData] = useState<any>(works);
    const router = useRouter();

    const [currentPage, setCurrentPage] = useState(1);
    const [currentItems, setCurrentItems] = useState<BillingInfo[]>([])
    const itemsPerPage = 10;

    const handleRowClicked = (row: BillingInfo) => {
        router.push(`client/${row.id}/timeline`)
    };

    const afterToastFunction = () => {
        router.refresh()
    };

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const DeletePay = async (id: number) => {
        // try {
        //     const headers: HeadersInit = new Headers();
        //     headers.append("Content-Type", "application/json");
        //     const response: Response = await fetch(`${process.env.BACK_URL}api/billings/paymentsdelete`, {
        //         method: 'POST',
        //         headers,
        //         body: JSON.stringify(
        //             id
        //         )
        //     });
        //     const responseJSON = await response.json();
        //     if (responseJSON.ok) {
        //         toast.success(`Eliminado con exito`,{
        //             onClose: afterToastFunction
        //           })
        //     } else {
        //         console.log("hubo un error")
        //     }
        // } catch (error: any) {
        //     console.log("soy el error del delete en el cliente del cliente", error)
        // }
        toast.warning("Esta funcion esta deshabilitada temporalmente")
    }

    return (
        <div className='w-full flex  h-auto'>
            <div className='w-full'>
                <div className='flex justify-between items-center py-4 px-10 bg-white'>
                    <div className='flex items-center gap-2'>
                        <span className='text-xs'>Todas los pagos</span>
                    </div>
                    {!payments?.is_paid && <button disabled={payments?.is_paid}  onClick={() => router.push(`/billings/${payments.id}/newpayment`)} className="text-black rounded-md flex items-center text-xs border-slatesecondary shadow-md  focus:ring-4 focus:ring-blue-300 font-medium  px-3 py-1  w-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Nuevo pago
                    </button>}
                </div>
                <div className="relative overflow-x-auto">
                    {payments?.payments_list.length > 0 ? <><div className="w-full text-sm text-left rtl:text-right text-gray-500  ">
                        <div className="text-xs  text-gray-400 border-b border-t bg-gray-50 mb-4 ">
                            <div className='grid grid-cols-3 md:grid-cols-5'>
                                <div  className="px-6 py-3 text-black">
                                    Descripcion
                                </div>
                                <div  className="px-6 py-3 text-center">
                                    Fecha
                                </div>
                                <div  className="hidden md:inline-block px-6 py-3 text-center">
                                    Metodo
                                </div>
                                <div  className="px-6 py-3 ">
                                    Monto
                                </div>
                                <div  className="hidden md:flex md:justify-center  px-6 py-3 ">
                                    Acciones
                                </div>
                            </div>
                        </div>
                        <div className='bg-white'>
                            {
                                payments?.payments_list.map(el=><div key={el.id} className=' grid grid-cols-3 md:grid-cols-5'>
                                    <div  className="px-6 py-3 text-black">
                                        {el.description}
                                    </div>
                                    <div  className="px-6 py-3 text-center">
                                        {el.payment_date.split('T')[0].split('-').reverse().join('-')}
                                    </div>
                                    <div  className="hidden md:inline-block px-6 py-3 text-center">
                                        {el.payment_method}
                                    </div>
                                    <div  className="px-6 py-3 ">
                                        {el.amount}
                                    </div>
                                    <div className="hidden md:flex py-4  gap-2 md:justify-center items-center">
                                        <button onClick={()=>{router.push(`/billings/${payments.id}/editpayment/${el.id}`)}}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                            </svg>
                                        </button>
                                        <button onClick={()=>{DeletePay(el.id)}}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>)
                            }
                        </div>
                    </div>
                    <div className='flex w-full justify-end bg-white px-10 py-5'>
                        <p className='border-t border-slate-200 py-2 px-4'><b>Total:</b> ${payments?.payments_list.reduce((total, item) => total + parseFloat(item.amount), 0)}</p>
                    </div></>
                    : <h1 className='w-full bg-white mt-4 font-bold py-4 text-center'>No hay pagos para mostrar</h1>}
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};



