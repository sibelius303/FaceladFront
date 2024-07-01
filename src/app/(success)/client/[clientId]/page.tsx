import React from 'react';
import Client from '@/tools/models/Client';
import { getUser } from '@/tools/actions';
import PerfilComponent from './component/PerfilComponent';
import Link from 'next/link';
import ButtonBack from './component/ButtonBack';
import Image from 'next/image';
import { WorksTable } from './component/WorksTable';

interface FormClientProps {
  params: any
}



const GetClient = async (id: number, user: string) => {
  try {
    const headers: HeadersInit = new Headers();
    headers.append("Content-Type", "application/json");
    const response: Response = await fetch(`${process.env.BACK_URL}api/customer/customergetunique`, {
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

const Page: React.FC<FormClientProps> = async ({ params }) => {
  const { clientId } = params;
  const user = getUser();
  const client: any = await GetClient(clientId, user);
  console.log(client)


  return (
    <div className="w-full ">
      <PerfilComponent client={client} />
      <div className="w-full bg-white flex  shadow-md justify-around md:justify-between md:gap-10 mt-5 px-4 py-4">
        <div className="flex items-center">
          <ButtonBack />
        </div>
        <div className="flex items-center">
          <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
            {/* <li className="hover:border-b-2 flex items-center gap-2 text-gray-900 hover:border-blue-400 py-2 px-6 hover:text-blue-400">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75H12a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
              </svg>
              <Link href="/client/2121/timeline" className="" aria-current="page">Linea de Tiempo</Link>
            </li>
            <li className="hover:border-b-2 flex items-center gap-2 text-gray-900 hover:border-blue-400 py-2 px-6 hover:text-blue-400">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75H12a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
              </svg>
              <Link href="/client/2121/other" className="" aria-current="page">Otra seccion</Link>
            </li> */}
            {/* <li className="hover:border-b-2 text-gray-900 hover:border-blue-400 py-2 px-6 hover:text-blue-400">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M1.5 6.375c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v3.026a.75.75 0 0 1-.375.65 2.249 2.249 0 0 0 0 3.898.75.75 0 0 1 .375.65v3.026c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 0 1 1.5 17.625v-3.026a.75.75 0 0 1 .374-.65 2.249 2.249 0 0 0 0-3.898.75.75 0 0 1-.374-.65V6.375Zm15-1.125a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-1.5 0V6a.75.75 0 0 1 .75-.75Zm.75 4.5a.75.75 0 0 0-1.5 0v.75a.75.75 0 0 0 1.5 0v-.75Zm-.75 3a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-1.5 0v-.75a.75.75 0 0 1 .75-.75Zm.75 4.5a.75.75 0 0 0-1.5 0V18a.75.75 0 0 0 1.5 0v-.75ZM6 12a.75.75 0 0 1 .75-.75H12a.75.75 0 0 1 0 1.5H6.75A.75.75 0 0 1 6 12Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z" clipRule="evenodd" />
                            </svg>

                            <Link href="/works" className="">Trabajos</Link>
                        </li>
                        <li className="hover:border-b-2 text-gray-900 hover:border-blue-400 py-2 px-6 hover:text-blue-400">
                            <Link href="client" className="">Clientes</Link>
                        </li>
                        {/* <li>
                                <a href="#" className="text-gray-900  hover:underline">Features</a>
                            </li> */}
          </ul>
        </div>
        <div  className="flex justify-between items-center gap-5">
          <Link href={`/works/new/${client.id}`} className="text-white flex items-center text-xs rounded-md bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium  px-3 py-1  w-auto">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Nuevo Trabajo
          </Link>
          <Link href={`/client/${client?.id}/edit`} className="text-gray-900 text-xs rounded-md flex gap-2 bg-white border shadow-xl focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium px-2 py-1  ">
            <svg width="11" height="12" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.5273 1.25586C11 1.72852 11 2.48047 10.5273 2.95312L9.88281 3.59766L7.77734 1.49219L8.42188 0.847656C8.89453 0.375 9.64648 0.375 10.1191 0.847656L10.5273 1.25586ZM3.69531 5.57422L7.2832 1.98633L9.38867 4.0918L5.80078 7.67969C5.67188 7.80859 5.5 7.91602 5.32812 7.98047L3.41602 8.60352C3.22266 8.66797 3.0293 8.625 2.90039 8.47461C2.75 8.3457 2.70703 8.13086 2.77148 7.95898L3.39453 6.04688C3.45898 5.875 3.56641 5.70312 3.69531 5.57422ZM4.125 1.75C4.49023 1.75 4.8125 2.07227 4.8125 2.4375C4.8125 2.82422 4.49023 3.125 4.125 3.125H2.0625C1.67578 3.125 1.375 3.44727 1.375 3.8125V9.3125C1.375 9.69922 1.67578 10 2.0625 10H7.5625C7.92773 10 8.25 9.69922 8.25 9.3125V7.25C8.25 6.88477 8.55078 6.5625 8.9375 6.5625C9.30273 6.5625 9.625 6.88477 9.625 7.25V9.3125C9.625 10.4512 8.70117 11.375 7.5625 11.375H2.0625C0.902344 11.375 0 10.4512 0 9.3125V3.8125C0 2.67383 0.902344 1.75 2.0625 1.75H4.125Z" fill="#4D5969" />
            </svg>
            Editar
          </Link>
          {/* <button onClick={()=>setOpenExport(true)}  className="text-gray-900 flex gap-2 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-2 py-1  ">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                        </svg>

                        Exportar
                    </button>
                    <button onClick={()=>setOpenDelete(true)} className="text-gray-900 flex gap-2 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-2 py-1  ">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>

                        Eliminar
                    </button> */}
        </div>
      </div>
      <div className='flex flex-col lg:flex-row lg:justify-between gap-5 mt-5'>
        {client?.works_list && client?.works_list.length > 0 ?  <div className='w-full h-auto py-4 px-4  bg-slatesecondary shadow-md'>
          <div className="w-full h-auto bg-white">
            <WorksTable works={client?.works_list}/>
          </div>
        </div> : <div className='w-full h-auto py-4 px-4  bg-slatesecondary shadow-md'>
          <div className="w-full h-full bg-white flex items-center justify-center">
            <div className='flex flex-col lg:flex-row '>
              <Image
                src={"/branding/21.png"}
                width={241}
                height={227}
                alt=""
              />
              <div className='flex flex-col justify-center items-center gap-2 text-justify'>
                <h1 className='text-2xl w-full text-blue-700 text-center lg:text-start font-bold'>Empecemos!</h1>
                <p className="text-gray-600 text-xl">Generemos mas trabajo.</p>
                <Link href={`/works/new/${client.id}`} className="text-white flex justify-center items-center text-md rounded-md bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium  px-3 py-3  w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                  Nuevo Trabajo
                </Link>
              </div>
            </div>
          </div>
        </div>}
        <div className=' w-full md:w-[287px] shadow-md '>
          <div className='bg-slatesecondary border rounded-md shadow-xl'>
            <div className='bg-white px-5 py-1'>
              <span className='text-xs text-black font-medium'>Informacion de contacto</span>
            </div>
            <div className=' px-4 py-4 '>
              <div className=' flex flex-col gap-5 bg-white px-4 py-4 shadow-xl rounded-lg'>
                <div className='flex flex-col'>
                  <label className='text-xs text-gray-800'>Contacto con:</label>
                  <span className='text-blueprimary text-xs'>{client?.name}</span>
                </div>
                <div className='flex flex-col'>
                  <label className='text-xs text-gray-800'>Email</label>
                  <span className='text-blueprimary text-xs'>{client?.email}</span>
                </div>
                <div className='flex flex-col'>
                  <label className='text-xs text-gray-800'>Rut de la empresa</label>
                  <span className='text-blueprimary text-xs'>{client?.rut}</span>
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
    </div>
  );
};

export default Page;