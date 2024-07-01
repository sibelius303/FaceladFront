"use client"

import { useRouter } from 'next/navigation';
import React from 'react';

interface DeleteModalProps {
    setOpenDelete: React.Dispatch<React.SetStateAction<boolean>>;
}


const DeleteModal: React.FC<DeleteModalProps> = ({ setOpenDelete }) => {
    const router: any = useRouter()
    return (
        <div className="fixed top-0 right-0 bottom-0 left-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div id="popup-modal" className="relative bg-white rounded-lg shadow max-w-md w-full md:max-w-md">
                <button
                    onClick={() => setOpenDelete(false)}
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
                    <h3 className="mb-5 text-lg font-normal text-gray-500">¿Esta seguro de que quiere borrar este cliente?</h3>
                    <button
                        onClick={() => setOpenDelete(false)}
                        data-modal-hide="popup-modal"
                        type="button"
                        className="py-2.5 px-5  text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={() => setOpenDelete(false)}
                        data-modal-hide="popup-modal"
                        type="button"
                        className="text-white bg-red-600 ms-3 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;