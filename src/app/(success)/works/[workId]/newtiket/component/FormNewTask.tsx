"use client"
import { COUNTRY, LENGUAJE, LOGIN, ROUTER_PATH } from '@/tools/constants';
import Task from '@/tools/models/Task';
import { Field, Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

interface FormClientProps {
  workId: any;
}

interface DataResponse {
  data: {
    id: number,
    title: string,
    description: string,
    assigned_to: string,
    status: boolean,
    is_active: boolean,
    is_deleted: boolean,
    created_at: string,
    updated_at: string,
    work_id: number
    errors: {
      id: string[],
      title: string[];
      description: string[],
      assigned_to: string[],
      status: string[],
      is_active: string[],
      is_deleted: string[],
      created_at: string[],
      updated_at: string[],
      work_id: string[]
    }
  }
}


const FormNewTask: React.FC<FormClientProps> = ({ workId }) => {
  const [isSubmit, setIsSubmit] = useState(false);
  const router = useRouter()

  const afterToastFunction = () => {
    router.refresh()
    router.back()
  };

  const submitData = async (data: any) => {
    data.work_id = parseInt(workId)
    console.log(data)
    const headers: HeadersInit = new Headers();
    headers.append("Content-Type", "application/json");
    const response: Response = await fetch(`${process.env.BACK_URL}api/task`, {
      method: 'POST',
      headers,
      body: JSON.stringify(
        data
      )
    });
    const responseJSON: DataResponse = await response.json();
    setIsSubmit(prev=> !prev)
    if (responseJSON.data.errors) {
      if (responseJSON.data.errors.title) {
        responseJSON.data.errors.title.map(el => toast.error(el))
      }
      if (responseJSON.data.errors.description) {
        responseJSON.data.errors.description.map(el => toast.error(el))
      }
      if (responseJSON.data.errors.assigned_to) {
        responseJSON.data.errors.assigned_to.map(el => toast.error(el))
      }
      return
    }
    toast.success(`Tarea creada con exito`, {
      onClose: afterToastFunction
    })

  }

  return (
    <Formik
      initialValues={{
        title: "",
        assigned_to: "",
        description: ""
      }}
      onSubmit={(values) => {
        setIsSubmit(prev=> !prev)
        submitData(values)
      }}
    >{({ handleSubmit }) => (
      <Form className='w-full' onSubmit={handleSubmit}>
        <div className=" grid grid-cols-1 md:grid-cols-2 gap-2 text-xs w-full bg-white py-4 px-4 shadow-xl rounded-md">
          <div className="mt-2 flex flex-col gap-1">
            <label className='text-gray-400 font-bold'>
              Titulo de la Tarea
            </label>
            <Field
              id="title"
              name="title"
              type="text"
              placeholder='Escribe el titulo'
              autoComplete="off"
              className="block w-full  px-4 border-0 text-negroSidebar py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="mt-2 flex flex-col gap-1">
            <label className='text-gray-400 font-bold'>
              Asignado
            </label>
            <Field
              id="assigned_to"
              name="assigned_to"
              type="text"
              placeholder='Escribe el encargado'
              autoComplete="off"
              className="block w-full  px-4 border-0 text-negroSidebar py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="col-span-full mt-2 flex flex-col gap-1">
            <label className='text-gray-400 font-bold'>
              Descripcion
            </label>
            <Field
              id="description"
              name="description"
              type="text"
              placeholder='Escribe una descripcion de la tarea'
              autoComplete="off"
              className="block w-full px-4 border-0 text-negroSidebar py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className='w-full mt-3 bg-white shadow-xl rounded-md flex justify-center gap-2 py-2'>
          <button
            type="button"
            onClick={() => router.back()}
            className="flex w-auto  justify-center rounded-md bg-white px-3 py-1.5 text-sm font-semibold leading-6 text-gray-400 shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:bg-opacity-50"
          >
            Cancelar
          </button>
          <button
          type="submit"
          disabled={isSubmit}
          className={`flex w-20 justify-center items-center rounded-md bg-blueprimary px-3 py-1 text-sm font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:bg-opacity-50 ${isSubmit && "bg-opacity-20"}`}
        >
          {isSubmit ? <div className="border-4 border-gray-300 border-t-gray-700 rounded-full w-4 h-4 animate-spin"></div> : "Crear"}
        </button>
        </div>
        <ToastContainer />
      </Form>
    )}</Formik>
  );
};

export default FormNewTask;