"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

interface ToggleProps {
  item: any;
  setOpen: any;
  setDataSubmit: any;
}



const Toggle: React.FC<ToggleProps> = ({ item, setOpen, setDataSubmit  }) => {
  const [isActive, setIsActive] = useState(item?.status);
  const router = useRouter();

  const handleSubmitToggle = async (data: any) => {
    const headers: HeadersInit = new Headers();
    headers.append("Content-Type", "application/json");
    const response: Response = await fetch(`${process.env.BACK_URL}api/task/taskfinished`, {
      method: 'POST',
      headers,
      body: JSON.stringify(
        { data: data, id: data.id }
      )
    });
    const responseJSON = await response.json();
    if (responseJSON.data === 200) {
      router.refresh();
      toast.success("se ha finalizado la tarea exitosamente")
      return
    }
    toast.error("No se ha podido finalizar la tarea, por favor intente mas tarde")
  }

  const handleToggle = () => {
    setOpen(true);
    setDataSubmit(item);
    // const newActiveState = !isActive;
    // try {
    //   await handleSubmitToggle({ ...item, status: newActiveState });
    //   setIsActive(newActiveState);
    // } catch (error) {
    //   console.error('Error sending data:', error);
    // }
  };

  return (
    // <div className="flex items-center">
    //   <span className="mr-2">{item.value}</span>
    //   <button
    //     onClick={handleToggle}
    //     className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none ${isActive ? 'bg-blue-600' : 'bg-gray-300'}`}
    //   >
    //     <span
    //       className={`transform transition-transform duration-200 ease-in-out ${isActive ? 'translate-x-6' : 'translate-x-1'} inline-block w-4 h-4 bg-white rounded-full`}
    //     />
    //   </button>
    // </div>
    <button
      onClick={handleToggle}
      className={`flex justify-center items-center py-2 px-2 text-white h-6 w-auto rounded-md transition-colors focus:outline-none ${item?.status ? 'bg-gray-300' : 'bg-blue-600'}`}
    >
      {/* <span
        className={`transform transition-transform duration-200 ease-in-out ${isActive ? 'translate-x-6' : 'translate-x-1'} inline-block w-4 h-4 bg-white rounded-full`}
      /> */}
      {item?.status ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
            </svg> : "Finalizar"}
    </button>
  );
};

export default Toggle;