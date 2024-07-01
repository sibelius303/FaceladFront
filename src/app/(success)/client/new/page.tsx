"use client"
import Link from 'next/link';
import React from 'react';
import ButtonBack from '../[clientId]/component/ButtonBack';
import FormClient from './component/FormClient';
import { getUser } from '@/tools/actions';
import { ToastContainer, toast} from 'react-toastify';

const Page: React.FC = () => {
  // const user: any = getUser();
  
  return (
    <>
      <div className="w-full bg-white flex justify-start items-center gap-2 my-2 px-4 py-2 shadow-xl rounded-md">
        <div className="">
          <ButtonBack />
        </div>
        <h1 className='font-semibold text-xs'>
          Crear cliente
        </h1>
      </div>
      <div className=' w-full flex flex-col items-center mt-3 '>
        <div className="w-full bg-slatesecondary py-2 px-4 ">
          <h3 className='text-start text-xs font-semibold'>Informacion inicial</h3>
        </div>
        <FormClient 
        // user={user} 
        />
      </div>
      <ToastContainer/>
    </>
  );
};

export default Page;