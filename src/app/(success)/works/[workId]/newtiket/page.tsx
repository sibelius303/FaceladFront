import Link from 'next/link';
import React from 'react';
import { getUser } from '@/tools/actions';

import FormNewTask from './component/FormNewTask';
import ButtonBack from './component/ButtonBack';

interface FormClientProps {
  params: any;
}

const GetData = async (user: any) => {
  try {
    const headers: HeadersInit = new Headers();
    headers.append("Content-Type", "application/json");
    const response: Response = await fetch(`${process.env.BACK_URL}api/customer/customerget`, {
      method: 'POST',
      headers,
      body: JSON.stringify(
        user
      )
    });
    const responseJSON = await response.json();
    return responseJSON
  } catch (error: any) {
    console.log("soy el error del get de cliente", error)
  }
}

const Page: React.FC<FormClientProps> = async ({params}) => {
  const {workId} = params;
  console.log(workId)  
  return (
    <>
      <div className="w-full bg-white flex justify-start items-center gap-2 my-2 px-4 py-2 shadow-xl rounded-md">
        <div className="">
          <ButtonBack />
        </div>
        <h1 className='font-semibold text-xs'>
          Crear Tarea
        </h1>
      </div>
      <div className=' w-full flex flex-col items-center mt-3 '>
        <div className="w-full bg-slatesecondary py-2 px-4 ">
          <h3 className='text-start text-xs font-semibold'>Informacion inicial</h3>
        </div>
        <FormNewTask workId={workId} />
      </div>
    </>
  );
};

export default Page;