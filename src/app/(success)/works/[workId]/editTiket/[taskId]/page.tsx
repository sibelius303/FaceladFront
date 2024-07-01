import Link from 'next/link';
import React from 'react';
import { getUser } from '@/tools/actions';


import FormEditTask from './component/FormEditTask';
import ButtonBack from './component/ButtonBack';


const GetTask = async (id: string, user: string) => {
  try {
    const headers: HeadersInit = new Headers();
    headers.append("Content-Type", "application/json");
    const response: Response = await fetch(`${process.env.BACK_URL}api/task/taskgetunique`, {
      method: 'POST',
      headers,
      body: JSON.stringify(
        { id: id, user: user }
      )
    });
    const responseJSON = await response.json();
    if (responseJSON.ok) {
      return responseJSON.data
    } else {
      console.log("hubo un error")
    }
  } catch (error: any) {
    console.log("soy el error del delete en el cliente del cliente", error)
  }
}

interface FormClientProps {
  params: any
}

const Page: React.FC<FormClientProps> = async ({params}) => {
  const {workId, taskId} = params;
  console.log(taskId)
  const user: any = await getUser();
  const task = await GetTask(taskId, user);
  console.log(task)
  return (
    <>
      <div className="w-full bg-white flex justify-start items-center gap-2 my-2 px-4 py-2 shadow-xl rounded-md">
        <div className="">
          <ButtonBack />
        </div>
        <h1 className='font-semibold text-xs'>
          Editar Tarea
        </h1>
      </div>
      <div className=' w-full flex flex-col items-center mt-3 '>
        <div className="w-full bg-slatesecondary py-2 px-4 ">
          <h3 className='text-start text-xs font-semibold'>Informacion inicial</h3>
        </div>
        <FormEditTask workId={workId} user={user} task={task} taskId={taskId}/>
      </div>
    </>
  );
};

export default Page;