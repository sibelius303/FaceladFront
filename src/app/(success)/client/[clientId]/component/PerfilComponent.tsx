import React from 'react';

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
}

interface Props {
    client: Client;
}

const PerfilComponent: React.FC<Props> = async ({ client }) => {
    return (
        <div className="w-full bg-white flex flex-col justify-center items-center md:items-center md:justify-start md:flex-row gap-10 py-2 px-2 md:py-10 md:px-20">
            <div className="relative inline-flex items-center justify-center w-40 h-40 overflow-hidden bg-blue-950 rounded-full">
                <span className="font-medium text-white text-6xl">{client?.company?.charAt(0).toUpperCase()}</span>
            </div>
            <div className="flex flex-col items-center justify-center">
                <div className="flex gap-2 items-center">
                    <h1 className="text-2xl">{client?.company}</h1>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-blue-400">
                        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                    </svg>
                </div>
                <p>Contacto con <b>{client?.name}</b></p>
                <p>{client?.description}</p>
            </div>
        </div>
    );
};

export default PerfilComponent;