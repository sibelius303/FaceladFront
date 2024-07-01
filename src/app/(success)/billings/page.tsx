import React from 'react';
import { getUser } from '@/tools/actions';
import { BillingsTable } from './component/BillingsTable';
import TotalAmount from './component/TotalAmount';

const GetData = async (user: any) => {
  try {
    const headers: HeadersInit = new Headers();
    headers.append("Content-Type", "application/json");
    const response: Response = await fetch(`${process.env.BACK_URL}api/billings/billingsget`, {
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

const SearchAmount = async (year :any, month: string, user:any)=>{
  try {
    const headers: HeadersInit = new Headers();
    headers.append("Content-Type", "application/json");
    const response: Response = await fetch(`${process.env.BACK_URL}api/billings/totalamount`, {
      method: 'POST',
      headers,
      body: JSON.stringify(
        {user, year, month}
      )
    });
    const responseJSON = await response.json();
    console.log("soy el del page", responseJSON)
    return responseJSON.total_amount_sum
  } catch (error: any) {
    console.log("soy el error del get de cliente", error)
  }
}

const Page: React.FC = async () => {
  const fechaActual: Date = new Date();
  const añoActual: string = fechaActual.getFullYear().toString();
  const mesActual: string = (fechaActual.getMonth() + 1).toString();
  const user = getUser();
  const totalAmountInit = SearchAmount(añoActual, mesActual ,user)
  const billing = await GetData(user)

  return (
    <div className='flex flex-col gap-4'>
      <TotalAmount user={user} totalAmountInit={totalAmountInit} yearInit={añoActual} monthInit={mesActual} />
      <BillingsTable billings={billing} />
    </div>
  );
};

export default Page
