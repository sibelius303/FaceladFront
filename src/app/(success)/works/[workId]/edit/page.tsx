import React from 'react';
import TimeLine from '../component/TimeLine';
import { getUser } from '@/tools/actions';
import ButtonBack from './component/ButtonBack';
import FormEditWork from './component/FormEditWork';

const GetClient = async (id: number, user: string) => {
  try {
    const headers: HeadersInit = new Headers();
    headers.append("Content-Type", "application/json");
    const response: Response = await fetch(`${process.env.BACK_URL}api/works/workgetunique`, {
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

interface FormClientProps {
  params: any
}




const Page: React.FC<FormClientProps> = async ({params}) => {
  const { workId } = params;
  const user: any = getUser();
  const work: any = await GetClient(workId, user);
  const clients: any = await GetData(user);

  return (
    <>
      <div className="w-full bg-white flex justify-start items-center gap-2 my-2 px-4 py-2 shadow-xl rounded-md">
        <div className="">
          <ButtonBack />
        </div>
        <h1 className='font-semibold text-xs'>
          Editar trabajo: <b>{work?.name}</b>
        </h1>
      </div>
      <div className=' w-full flex flex-col items-center mt-3 '>
        <div className="w-full bg-slatesecondary py-2 px-4 ">
          <h3 className='text-start text-xs font-semibold'>Informacion inicial</h3>
        </div>
        <FormEditWork user={user} work={work} clients={clients} workId={workId} />
      </div>
    </>
  );
};

export default Page;