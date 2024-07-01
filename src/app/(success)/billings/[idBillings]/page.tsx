import React from 'react';
import Client from '@/tools/models/Client';
import { getUser } from '@/tools/actions';
import Link from 'next/link';
import Image from 'next/image';
import PerfilWork from './component/PerfilWork';


interface ParamsProps {
  params: {
    idBillings: string;
  }
}



const GetBillings = async (id: string, user: string) => {
  try {
    const headers: HeadersInit = new Headers();
    headers.append("Content-Type", "application/json");
    const response: Response = await fetch(`${process.env.BACK_URL}api/billings/billingsgetunique`, {
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

const Page: React.FC<ParamsProps> = async ({ params }) => {
  const { idBillings } = params;
  const user = getUser();
  const works: any = await GetBillings(idBillings, user);
  console.log("soy la data del page", works)

  return (
    <PerfilWork works={works} workId={idBillings}/>
  );
};

export default Page;