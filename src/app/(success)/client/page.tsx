import React from 'react';
import { ClientTable } from './component/ClientTable';
import Client from '@/tools/models/Client';
import { getUser } from '@/tools/actions';
import { AnyCnameRecord } from 'dns';


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

const Page: React.FC = async () => {
  const user = getUser();
  const clients: any = await GetData(user);

  console.log(clients);
  
  return (
    <>
      <ClientTable clients={clients} />
    </>
  );
};

export default Page;