"use client"
import { useRouter } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

interface Client {
    id: number;
    company: string;
    name: string;
    description: string;
    email: string;
    phone: string;
    country: string;
    language: string;
    status: boolean;
    payment: boolean;
    rut: string;
    is_deleted: boolean;
    created_at: string;
    updated_at: string;
  }

  interface Work {
    id: number;
    name: string;
    description: string;
    service_model: string;
    type_activity: string;
    is_paid: boolean;
    priority: string;
    manager: string;
    status: boolean;
    modality: string;
    cutoff_date: string;
    amount_work: number;
    repetition: number;
    is_deleted: boolean;
    created_at: string;
    updated_at: string;
    client_id: number;
  }

  interface PaymentDetail {
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
    payments_list: PaymentDetail[];
    payment_date: string;
    work_id: number;
    work: Work;
    client: Client;
}


interface BillingsProps {
    billings: BillingInfo[]
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



export const BillingsTable: React.FC<BillingsProps> = ({ billings }) => {
    const [input, setInput] = useState("");
    const [selectMng, setSelectMgm] = useState("");
    const [selectPriority, setSelectPriotity] = useState("");
    const [inputId, setInputId] = useState("");
    const [data, setData] = useState<any>(billings);
    const router = useRouter();

    const [currentPage, setCurrentPage] = useState(1);
    const [currentItems, setCurrentItems] = useState<BillingInfo[]>([])
    const itemsPerPage = 10;



    useEffect(() => {
        setData(billings)
    }, [billings])

    useEffect(() => {
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        setCurrentItems(data.slice(indexOfFirstItem, indexOfLastItem))
    }, [data, currentPage])

    const handleRowClicked = (row: BillingInfo) => {
        router.push(`client/${row.id}/timeline`)
    };

    const afterToastFunction = () => {
        router.refresh()
    };

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const DeleteBilling = async (id: number) => {
        // try {
        //     const headers: HeadersInit = new Headers();
        //     headers.append("Content-Type", "application/json");
        //     const response: Response = await fetch(`${process.env.BACK_URL}api/works/workdelete`, {
        //         method: 'POST',
        //         headers,
        //         body: JSON.stringify(
        //             id
        //         )
        //     });
        //     const responseJSON = await response.json();
        //     if (responseJSON.ok) {
        //         toast.success(`${responseJSON.data.name} eliminado con exito`,{
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
                <div className="relative overflow-x-auto">
                    {currentItems.length > 0 ? <div className="w-full text-sm text-left rtl:text-right text-gray-500  ">
                        <div className="text-xs text-gray-400 border-b border-t bg-gray-50 mb-4 ">
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                                <div className="hidden lg:inline-block px-6 py-3 text-center">
                                    Fecha de Creacion
                                </div>
                                <div className=" px-6 py-3 text-center">
                                    Fecha de Corte
                                </div>
                                <div className="hidden lg:inline-block px-6 py-3 ">
                                    Descripcion
                                </div>
                                <div className="px-6 py-3 text-center">
                                    Estatus
                                </div>
                                <div className="hidden lg:inline-block px-6 py-3 text-center">
                                    Total
                                </div>
                                <div className="hidden md:inline-block px-6 py-3 text-center">
                                    Acciones
                                </div>
                            </div>
                        </div>
                        <div className=''>
                            {
                                currentItems?.map(el => (<div key={el.id} className="bg-white grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 border-b py-6 mb-4 rounded-md hover:cursor-pointer hover:bg-slate-100 ">
                                    <div className="hidden lg:table-cell text-center my-auto">
                                        <div>
                                            {el.billing_date?.split('T')[0].split('-').reverse().join('-')}
                                        </div>
                                    </div>
                                    <div className="md:table-cell text-center my-auto">
                                        <div>
                                            {el.due_date?.split('T')[0].split('-').reverse().join('-')}
                                        </div>
                                    </div>
                                    <div className="hidden lg:table-cell my-auto">
                                        <div>
                                            {el.description}
                                        </div>
                                    </div>
                                    <div className="table-cell my-auto mx-auto md:mx-0">
                                        <div>
                                            {!el.is_paid ? <><svg width="109" height="30" viewBox="0 0 109 30" fill="none" xmlns="http://www.w3.org/2000/svg" className='hidden md:inline-block'>
                                                <rect width="109" height="30" rx="15" fill="#0D99FF" />
                                                <path d="M21.6069 12.161V14.813H24.7269V16.022H21.6069V18.791H25.1169V20H20.1249V10.952H25.1169V12.161H21.6069ZM30.5563 12.72C31.1196 12.72 31.6223 12.837 32.0643 13.071C32.515 13.305 32.866 13.6517 33.1173 14.111C33.3686 14.5703 33.4943 15.125 33.4943 15.775V20H32.0253V15.996C32.0253 15.3547 31.865 14.865 31.5443 14.527C31.2236 14.1803 30.786 14.007 30.2313 14.007C29.6766 14.007 29.2346 14.1803 28.9053 14.527C28.5846 14.865 28.4243 15.3547 28.4243 15.996V20H26.9423V12.837H28.4243V13.656C28.667 13.3613 28.9746 13.1317 29.3473 12.967C29.7286 12.8023 30.1316 12.72 30.5563 12.72ZM45.0796 13.656C45.0796 14.1153 44.9713 14.5487 44.7546 14.956C44.538 15.3633 44.1913 15.697 43.7146 15.957C43.238 16.2083 42.627 16.334 41.8816 16.334H40.2436V20H38.7616V10.965H41.8816C42.575 10.965 43.16 11.0863 43.6366 11.329C44.122 11.563 44.4816 11.8837 44.7156 12.291C44.9583 12.6983 45.0796 13.1533 45.0796 13.656ZM41.8816 15.125C42.445 15.125 42.8653 14.9993 43.1426 14.748C43.42 14.488 43.5586 14.124 43.5586 13.656C43.5586 12.668 42.9996 12.174 41.8816 12.174H40.2436V15.125H41.8816ZM47.9751 13.877C48.1917 13.513 48.4777 13.2313 48.8331 13.032C49.1971 12.824 49.6261 12.72 50.1201 12.72V14.254H49.7431C49.1624 14.254 48.7204 14.4013 48.4171 14.696C48.1224 14.9907 47.9751 15.502 47.9751 16.23V20H46.4931V12.837H47.9751V13.877ZM54.5893 20.117C53.9133 20.117 53.3023 19.9653 52.7563 19.662C52.2103 19.35 51.7813 18.9167 51.4693 18.362C51.1573 17.7987 51.0013 17.1487 51.0013 16.412C51.0013 15.684 51.1617 15.0383 51.4823 14.475C51.803 13.9117 52.2407 13.4783 52.7953 13.175C53.35 12.8717 53.9697 12.72 54.6543 12.72C55.339 12.72 55.9587 12.8717 56.5133 13.175C57.068 13.4783 57.5057 13.9117 57.8263 14.475C58.147 15.0383 58.3073 15.684 58.3073 16.412C58.3073 17.14 58.1427 17.7857 57.8133 18.349C57.484 18.9123 57.0333 19.35 56.4613 19.662C55.898 19.9653 55.274 20.117 54.5893 20.117ZM54.5893 18.83C54.9707 18.83 55.326 18.739 55.6553 18.557C55.9933 18.375 56.2663 18.102 56.4743 17.738C56.6823 17.374 56.7863 16.932 56.7863 16.412C56.7863 15.892 56.6867 15.4543 56.4873 15.099C56.288 14.735 56.0237 14.462 55.6943 14.28C55.365 14.098 55.0097 14.007 54.6283 14.007C54.247 14.007 53.8917 14.098 53.5623 14.28C53.2417 14.462 52.986 14.735 52.7953 15.099C52.6047 15.4543 52.5093 15.892 52.5093 16.412C52.5093 17.1833 52.7043 17.7813 53.0943 18.206C53.493 18.622 53.9913 18.83 54.5893 18.83ZM59.2784 16.412C59.2784 15.6753 59.4257 15.0297 59.7204 14.475C60.0237 13.9117 60.4397 13.4783 60.9684 13.175C61.497 12.8717 62.1037 12.72 62.7884 12.72C63.655 12.72 64.37 12.928 64.9334 13.344C65.5054 13.7513 65.891 14.3363 66.0904 15.099H64.4914C64.3614 14.7437 64.1534 14.4663 63.8674 14.267C63.5814 14.0677 63.2217 13.968 62.7884 13.968C62.1817 13.968 61.6964 14.1847 61.3324 14.618C60.977 15.0427 60.7994 15.6407 60.7994 16.412C60.7994 17.1833 60.977 17.7857 61.3324 18.219C61.6964 18.6523 62.1817 18.869 62.7884 18.869C63.6464 18.869 64.214 18.492 64.4914 17.738H66.0904C65.8824 18.466 65.4924 19.0467 64.9204 19.48C64.3484 19.9047 63.6377 20.117 62.7884 20.117C62.1037 20.117 61.497 19.9653 60.9684 19.662C60.4397 19.35 60.0237 18.9167 59.7204 18.362C59.4257 17.7987 59.2784 17.1487 59.2784 16.412ZM74.1323 16.243C74.1323 16.5117 74.115 16.7543 74.0803 16.971H68.6073C68.6506 17.543 68.863 18.0023 69.2443 18.349C69.6256 18.6957 70.0936 18.869 70.6483 18.869C71.4456 18.869 72.009 18.5353 72.3383 17.868H73.9373C73.7206 18.5267 73.3263 19.0683 72.7543 19.493C72.191 19.909 71.489 20.117 70.6483 20.117C69.9636 20.117 69.3483 19.9653 68.8023 19.662C68.265 19.35 67.8403 18.9167 67.5283 18.362C67.225 17.7987 67.0733 17.1487 67.0733 16.412C67.0733 15.6753 67.2206 15.0297 67.5153 14.475C67.8186 13.9117 68.239 13.4783 68.7763 13.175C69.3223 12.8717 69.9463 12.72 70.6483 12.72C71.3243 12.72 71.9266 12.8673 72.4553 13.162C72.984 13.4567 73.3956 13.8727 73.6903 14.41C73.985 14.9387 74.1323 15.5497 74.1323 16.243ZM72.5853 15.775C72.5766 15.229 72.3816 14.7913 72.0003 14.462C71.619 14.1327 71.1466 13.968 70.5833 13.968C70.072 13.968 69.6343 14.1327 69.2703 14.462C68.9063 14.7827 68.6896 15.2203 68.6203 15.775H72.5853ZM78.1907 20.117C77.6274 20.117 77.1204 20.0173 76.6697 19.818C76.2277 19.61 75.8767 19.3327 75.6167 18.986C75.3567 18.6307 75.2181 18.2363 75.2007 17.803H76.7347C76.7607 18.1063 76.9037 18.362 77.1637 18.57C77.4324 18.7693 77.7661 18.869 78.1647 18.869C78.5807 18.869 78.9014 18.791 79.1267 18.635C79.3607 18.4703 79.4777 18.2623 79.4777 18.011C79.4777 17.7423 79.3477 17.543 79.0877 17.413C78.8364 17.283 78.4334 17.14 77.8787 16.984C77.3414 16.8367 76.9037 16.6937 76.5657 16.555C76.2277 16.4163 75.9331 16.204 75.6817 15.918C75.4391 15.632 75.3177 15.255 75.3177 14.787C75.3177 14.4057 75.4304 14.059 75.6557 13.747C75.8811 13.4263 76.2017 13.175 76.6177 12.993C77.0424 12.811 77.5277 12.72 78.0737 12.72C78.8884 12.72 79.5427 12.928 80.0367 13.344C80.5394 13.7513 80.8081 14.3103 80.8427 15.021H79.3607C79.3347 14.7003 79.2047 14.4447 78.9707 14.254C78.7367 14.0633 78.4204 13.968 78.0217 13.968C77.6317 13.968 77.3327 14.0417 77.1247 14.189C76.9167 14.3363 76.8127 14.5313 76.8127 14.774C76.8127 14.9647 76.8821 15.125 77.0207 15.255C77.1594 15.385 77.3284 15.489 77.5277 15.567C77.7271 15.6363 78.0217 15.7273 78.4117 15.84C78.9317 15.9787 79.3564 16.1217 79.6857 16.269C80.0237 16.4077 80.3141 16.6157 80.5567 16.893C80.7994 17.1703 80.9251 17.5387 80.9337 17.998C80.9337 18.4053 80.8211 18.7693 80.5957 19.09C80.3704 19.4107 80.0497 19.662 79.6337 19.844C79.2264 20.026 78.7454 20.117 78.1907 20.117ZM85.6421 20.117C84.9661 20.117 84.3551 19.9653 83.8091 19.662C83.2631 19.35 82.8341 18.9167 82.5221 18.362C82.2101 17.7987 82.0541 17.1487 82.0541 16.412C82.0541 15.684 82.2144 15.0383 82.5351 14.475C82.8557 13.9117 83.2934 13.4783 83.8481 13.175C84.4027 12.8717 85.0224 12.72 85.7071 12.72C86.3917 12.72 87.0114 12.8717 87.5661 13.175C88.1207 13.4783 88.5584 13.9117 88.8791 14.475C89.1997 15.0383 89.3601 15.684 89.3601 16.412C89.3601 17.14 89.1954 17.7857 88.8661 18.349C88.5367 18.9123 88.0861 19.35 87.5141 19.662C86.9507 19.9653 86.3267 20.117 85.6421 20.117ZM85.6421 18.83C86.0234 18.83 86.3787 18.739 86.7081 18.557C87.0461 18.375 87.3191 18.102 87.5271 17.738C87.7351 17.374 87.8391 16.932 87.8391 16.412C87.8391 15.892 87.7394 15.4543 87.5401 15.099C87.3407 14.735 87.0764 14.462 86.7471 14.28C86.4177 14.098 86.0624 14.007 85.6811 14.007C85.2997 14.007 84.9444 14.098 84.6151 14.28C84.2944 14.462 84.0387 14.735 83.8481 15.099C83.6574 15.4543 83.5621 15.892 83.5621 16.412C83.5621 17.1833 83.7571 17.7813 84.1471 18.206C84.5457 18.622 85.0441 18.83 85.6421 18.83Z" fill="white" />
                                            </svg><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-red-500 md:hidden">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.25-8.25-3.286Zm0 13.036h.008v.008H12v-.008Z" />
                                                </svg>
                                            </> : <><svg className='hidden md:inline-block' width="109" height="30" viewBox="0 0 109 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect width="109" height="30" rx="15" fill="#00D27A" />
                                                <path d="M22.3604 15.463C22.3604 14.579 22.5641 13.786 22.9714 13.084C23.3874 12.382 23.9464 11.836 24.6484 11.446C25.3591 11.0473 26.1347 10.848 26.9754 10.848C27.9374 10.848 28.7911 11.0863 29.5364 11.563C30.2904 12.031 30.8364 12.6983 31.1744 13.565H29.3934C29.1594 13.0883 28.8344 12.733 28.4184 12.499C28.0024 12.265 27.5214 12.148 26.9754 12.148C26.3774 12.148 25.8444 12.2823 25.3764 12.551C24.9084 12.8197 24.5401 13.2053 24.2714 13.708C24.0114 14.2107 23.8814 14.7957 23.8814 15.463C23.8814 16.1303 24.0114 16.7153 24.2714 17.218C24.5401 17.7207 24.9084 18.1107 25.3764 18.388C25.8444 18.6567 26.3774 18.791 26.9754 18.791C27.5214 18.791 28.0024 18.674 28.4184 18.44C28.8344 18.206 29.1594 17.8507 29.3934 17.374H31.1744C30.8364 18.2407 30.2904 18.908 29.5364 19.376C28.7911 19.844 27.9374 20.078 26.9754 20.078C26.1261 20.078 25.3504 19.883 24.6484 19.493C23.9464 19.0943 23.3874 18.544 22.9714 17.842C22.5641 17.14 22.3604 16.347 22.3604 15.463ZM36.0161 20.117C35.3401 20.117 34.7291 19.9653 34.1831 19.662C33.6371 19.35 33.2081 18.9167 32.8961 18.362C32.5841 17.7987 32.4281 17.1487 32.4281 16.412C32.4281 15.684 32.5884 15.0383 32.9091 14.475C33.2297 13.9117 33.6674 13.4783 34.2221 13.175C34.7767 12.8717 35.3964 12.72 36.0811 12.72C36.7657 12.72 37.3854 12.8717 37.9401 13.175C38.4947 13.4783 38.9324 13.9117 39.2531 14.475C39.5737 15.0383 39.7341 15.684 39.7341 16.412C39.7341 17.14 39.5694 17.7857 39.2401 18.349C38.9107 18.9123 38.4601 19.35 37.8881 19.662C37.3247 19.9653 36.7007 20.117 36.0161 20.117ZM36.0161 18.83C36.3974 18.83 36.7527 18.739 37.0821 18.557C37.4201 18.375 37.6931 18.102 37.9011 17.738C38.1091 17.374 38.2131 16.932 38.2131 16.412C38.2131 15.892 38.1134 15.4543 37.9141 15.099C37.7147 14.735 37.4504 14.462 37.1211 14.28C36.7917 14.098 36.4364 14.007 36.0551 14.007C35.6737 14.007 35.3184 14.098 34.9891 14.28C34.6684 14.462 34.4127 14.735 34.2221 15.099C34.0314 15.4543 33.9361 15.892 33.9361 16.412C33.9361 17.1833 34.1311 17.7813 34.5211 18.206C34.9197 18.622 35.4181 18.83 36.0161 18.83ZM49.8701 12.72C50.4335 12.72 50.9361 12.837 51.3781 13.071C51.8288 13.305 52.1798 13.6517 52.4311 14.111C52.6911 14.5703 52.8211 15.125 52.8211 15.775V20H51.3521V15.996C51.3521 15.3547 51.1918 14.865 50.8711 14.527C50.5505 14.1803 50.1128 14.007 49.5581 14.007C49.0035 14.007 48.5615 14.1803 48.2321 14.527C47.9115 14.865 47.7511 15.3547 47.7511 15.996V20H46.2821V15.996C46.2821 15.3547 46.1218 14.865 45.8011 14.527C45.4805 14.1803 45.0428 14.007 44.4881 14.007C43.9335 14.007 43.4915 14.1803 43.1621 14.527C42.8415 14.865 42.6811 15.3547 42.6811 15.996V20H41.1991V12.837H42.6811V13.656C42.9238 13.3613 43.2315 13.1317 43.6041 12.967C43.9768 12.8023 44.3755 12.72 44.8001 12.72C45.3721 12.72 45.8835 12.8413 46.3341 13.084C46.7848 13.3267 47.1315 13.6777 47.3741 14.137C47.5908 13.7037 47.9288 13.3613 48.3881 13.11C48.8475 12.85 49.3415 12.72 49.8701 12.72ZM56.1889 13.89C56.4403 13.5607 56.7826 13.2833 57.2159 13.058C57.6493 12.8327 58.1389 12.72 58.6849 12.72C59.3089 12.72 59.8766 12.876 60.3879 13.188C60.9079 13.4913 61.3153 13.9203 61.6099 14.475C61.9046 15.0297 62.0519 15.6667 62.0519 16.386C62.0519 17.1053 61.9046 17.751 61.6099 18.323C61.3153 18.8863 60.9079 19.3283 60.3879 19.649C59.8766 19.961 59.3089 20.117 58.6849 20.117C58.1389 20.117 57.6536 20.0087 57.2289 19.792C56.8043 19.5667 56.4576 19.2893 56.1889 18.96V23.406H54.7069V12.837H56.1889V13.89ZM60.5439 16.386C60.5439 15.892 60.4399 15.4673 60.2319 15.112C60.0326 14.748 59.7639 14.475 59.4259 14.293C59.0966 14.1023 58.7413 14.007 58.3599 14.007C57.9873 14.007 57.6319 14.1023 57.2939 14.293C56.9646 14.4837 56.6959 14.761 56.4879 15.125C56.2886 15.489 56.1889 15.918 56.1889 16.412C56.1889 16.906 56.2886 17.3393 56.4879 17.712C56.6959 18.076 56.9646 18.3533 57.2939 18.544C57.6319 18.7347 57.9873 18.83 58.3599 18.83C58.7413 18.83 59.0966 18.7347 59.4259 18.544C59.7639 18.3447 60.0326 18.0587 60.2319 17.686C60.4399 17.3133 60.5439 16.88 60.5439 16.386ZM64.9995 10.38V20H63.5175V10.38H64.9995ZM73.5102 16.243C73.5102 16.5117 73.4929 16.7543 73.4582 16.971H67.9852C68.0285 17.543 68.2409 18.0023 68.6222 18.349C69.0035 18.6957 69.4715 18.869 70.0262 18.869C70.8235 18.869 71.3869 18.5353 71.7162 17.868H73.3152C73.0985 18.5267 72.7042 19.0683 72.1322 19.493C71.5689 19.909 70.8669 20.117 70.0262 20.117C69.3415 20.117 68.7262 19.9653 68.1802 19.662C67.6429 19.35 67.2182 18.9167 66.9062 18.362C66.6029 17.7987 66.4512 17.1487 66.4512 16.412C66.4512 15.6753 66.5985 15.0297 66.8932 14.475C67.1965 13.9117 67.6169 13.4783 68.1542 13.175C68.7002 12.8717 69.3242 12.72 70.0262 12.72C70.7022 12.72 71.3045 12.8673 71.8332 13.162C72.3619 13.4567 72.7735 13.8727 73.0682 14.41C73.3629 14.9387 73.5102 15.5497 73.5102 16.243ZM71.9632 15.775C71.9545 15.229 71.7595 14.7913 71.3782 14.462C70.9969 14.1327 70.5245 13.968 69.9612 13.968C69.4499 13.968 69.0122 14.1327 68.6482 14.462C68.2842 14.7827 68.0675 15.2203 67.9982 15.775H71.9632ZM76.6977 14.046V18.011C76.6977 18.2797 76.7583 18.4747 76.8797 18.596C77.0097 18.7087 77.2263 18.765 77.5297 18.765H78.4397V20H77.2697C76.6023 20 76.091 19.844 75.7357 19.532C75.3803 19.22 75.2027 18.713 75.2027 18.011V14.046H74.3577V12.837H75.2027V11.056H76.6977V12.837H78.4397V14.046H76.6977ZM82.9126 20.117C82.2366 20.117 81.6256 19.9653 81.0796 19.662C80.5336 19.35 80.1046 18.9167 79.7926 18.362C79.4806 17.7987 79.3246 17.1487 79.3246 16.412C79.3246 15.684 79.4849 15.0383 79.8056 14.475C80.1262 13.9117 80.5639 13.4783 81.1186 13.175C81.6732 12.8717 82.2929 12.72 82.9776 12.72C83.6622 12.72 84.2819 12.8717 84.8366 13.175C85.3912 13.4783 85.8289 13.9117 86.1496 14.475C86.4702 15.0383 86.6306 15.684 86.6306 16.412C86.6306 17.14 86.4659 17.7857 86.1366 18.349C85.8072 18.9123 85.3566 19.35 84.7846 19.662C84.2212 19.9653 83.5972 20.117 82.9126 20.117ZM82.9126 18.83C83.2939 18.83 83.6492 18.739 83.9786 18.557C84.3166 18.375 84.5896 18.102 84.7976 17.738C85.0056 17.374 85.1096 16.932 85.1096 16.412C85.1096 15.892 85.0099 15.4543 84.8106 15.099C84.6112 14.735 84.3469 14.462 84.0176 14.28C83.6882 14.098 83.3329 14.007 82.9516 14.007C82.5702 14.007 82.2149 14.098 81.8856 14.28C81.5649 14.462 81.3092 14.735 81.1186 15.099C80.9279 15.4543 80.8326 15.892 80.8326 16.412C80.8326 17.1833 81.0276 17.7813 81.4176 18.206C81.8162 18.622 82.3146 18.83 82.9126 18.83Z" fill="white" />
                                            </svg><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-green-500 md:hidden">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                                                </svg>
                                            </>}
                                        </div>
                                    </div>
                                    <div className="hidden lg:table-cell text-center my-auto">
                                        <div>
                                            {el.total_amount}
                                        </div>
                                    </div>
                                    <div className="hidden md:flex w-full h-full px-6  justify-center gap-4">
                                        <button onClick={() => {
                                            router.push(`/billings/${el.id}/editbillings`)
                                        }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                            </svg>
                                        </button>
                                        <button onClick={() => {
                                            DeleteBilling(el.id)
                                        }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>))
                            }
                        </div>
                    </div> : <h1 className='w-full bg-white mt-4 font-bold py-4 text-center'>No hay elementos para mostrar</h1>}
                    <div className="bg-white border-b py-3 flex gap-4 w-full justify-center mt-4 ">
                        {/* <tr className='flex w-full justify-center'> */}
                        <button className="text-gray-900 flex gap-2 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-2 py-1  ">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                            </svg>
                        </button>
                        <Pagination itemsPerPage={itemsPerPage} totalItems={data.length} paginate={paginate} currentPage={currentPage} />
                        <button className="text-gray-900 flex gap-2 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-2 py-1  ">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                            </svg>
                        </button>
                        {/* </tr> */}
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};



