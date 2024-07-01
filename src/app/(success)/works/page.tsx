import React from 'react';
import { WorksTable } from './component/WorksTable';
import { getUser } from '@/tools/actions';

const GetData = async (user: any) => {
  try {
    const headers: HeadersInit = new Headers();
    headers.append("Content-Type", "application/json");
    const response: Response = await fetch(`${process.env.BACK_URL}api/works/workget`, {
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
  const works: any = await GetData(user);
  return (
    <>
      <WorksTable works={works}/>
    </>
  );
};

export default Page;