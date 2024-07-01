import React from 'react';
import TimeLine from '../../component/TimeLine';

import { getUser } from '@/tools/actions';
// import { WorksTable } from '../../component/WorksTable';

interface clients {
  id: number,
  company: string,
  name: string,
  description: string,
  email: string,
  phone: string,
  country: string,
  language: string,
  status: boolean,
  payment: boolean
} 

interface FormClientProps {
  params: any
}

const GetClient = async (id: number, user:string) => {
  try {
      const headers: HeadersInit = new Headers();
      headers.append("Content-Type", "application/json");
      const response: Response = await fetch(`${process.env.BACK_URL}api/customer/customergetunique`, {
          method: 'POST',
          headers,
          body: JSON.stringify(
              {id: id, user: user}
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


const Page: React.FC<FormClientProps> = async ({params}):Promise<any> => {
  const { clientId } = params
  const user = getUser();
  const client: any = await GetClient(clientId, user)
  
  return (
    <div className='flex gap-5'>
      {/* <div className='w-4/6 h-auto bg-slatesecondary'>
        <WorksTable />
      </div> */}
      <div className=' w-[287px] '>
        <div className='bg-slatesecondary border rounded-md shadow-xl'>
          <div className='bg-white px-5 py-1'>
            <span className='text-xs text-black font-medium'>Informacion de contacto</span>
          </div>
          <div className=' px-4 py-4 '>
            <div className=' flex flex-col gap-5 bg-white px-4 py-4 shadow-xl rounded-lg'>
              <div className='flex flex-col'>
                <label className='text-xs text-gray-800'>Email</label>
                <span className='text-blueprimary text-xs'>{client?.email}</span>
              </div>
              <div className='flex flex-col'>
                <label className='text-xs text-gray-800'>Numero Telefonico</label>
                <span className='text-blueprimary text-xs'>{client?.phone}</span>
              </div>
              <div className='flex flex-col'>
                <label className='text-xs text-gray-800'>Ubicacion</label>
                <span className='text-xs'>{client?.country}</span>
              </div>
              <div className='flex flex-col'>
                <label className='text-xs text-gray-800'>Idioma</label>
                <span className='text-xs'>{client?.language}</span>
              </div>
              <div className='flex flex-col'>
                <label className='text-xs text-gray-800'>Estatus</label>
                <span className='text-xs'>{client?.status ? "Activo" : "Inactivo"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


  );
};

export default Page;