"use client"

import { useRouter } from 'next/navigation';
import React from 'react';

const ButtonBack: React.FC = () => {
    const router: any = useRouter()
    return (
        <button onClick={() => router.back()} className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-sm text-sm px-3 py-2  ">
            <svg width="11" height="9" viewBox="0 0 11 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.1035 4.875C10.1035 5.26172 9.80273 5.5625 9.4375 5.5625H2.8418L5.09766 7.83984C5.37695 8.09766 5.37695 8.54883 5.09766 8.80664C4.96875 8.93555 4.79688 9 4.625 9C4.43164 9 4.25977 8.93555 4.13086 8.80664L0.693359 5.36914C0.414062 5.11133 0.414062 4.66016 0.693359 4.40234L4.13086 0.964844C4.38867 0.685547 4.83984 0.685547 5.09766 0.964844C5.37695 1.22266 5.37695 1.67383 5.09766 1.93164L2.8418 4.1875H9.4375C9.80273 4.1875 10.1035 4.50977 10.1035 4.875Z" fill="#4D5969" />
            </svg>
        </button>
    );
};

export default ButtonBack;