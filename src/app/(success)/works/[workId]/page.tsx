import React from 'react';
import Client from '@/tools/models/Client';
import { getUser } from '@/tools/actions';
import Link from 'next/link';
import ButtonBack from './component/ButtonBack';
import Image from 'next/image';
import PerfilWork from './component/PerfilWork';

interface FormClientProps {
  params: any
}



const GetWork = async (id: number, user: string) => {
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

const Page: React.FC<FormClientProps> = async ({ params }) => {
  const { workId } = params;
  const user = getUser();
  const works: any = await GetWork(workId, user);

  console.log(works)

  return (
    <PerfilWork works={works} workId={workId}/>
  );
};

export default Page;