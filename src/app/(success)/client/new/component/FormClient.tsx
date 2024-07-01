"use client"
import { COUNTRY, LENGUAJE, LOGIN, ROUTER_PATH } from '@/tools/constants';
import { Field, Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

interface FormClientProps {
  user: any;
}

interface DataResponse {
  data: {
    company: string;
    country: string;
    description: string;
    email: string;
    id: number;
    language: string;
    name: string;
    payment: boolean;
    phone: string;
    status: boolean;
    errors: {
      phone?: string[];
      email?: string[];
      description?: string[];
    };
  };
}



const FormClient: React.FC = () => {
  const [isSubmit, setIsSubmit] = useState(false);
  const router = useRouter()

  const afterToastFunction = () => {
    router.refresh()
    router.back()
  };


  const submitData = async (data: any) => {
    const headers: HeadersInit = new Headers();
    headers.append("Content-Type", "application/json");
    const response: Response = await fetch(`${process.env.BACK_URL}api/customer`, {
      method: 'POST',
      headers,
      body: JSON.stringify(
        data
      )
    });
    const responseJSON: DataResponse = await response.json();
    setIsSubmit(prev=> !prev)
    if (responseJSON.data.errors) {
      if (responseJSON.data.errors.phone) {
        responseJSON.data.errors.phone.map(el => toast.error(el))
      }
      if (responseJSON.data.errors.email) {
        responseJSON.data.errors.email.map(el => toast.error(el))
      }
      if (responseJSON.data.errors.description) {
        responseJSON.data.errors.description.map(el => toast.error(el))
      }
      return
    }
    toast.success(`Cliente ${responseJSON.data.company} creado con exito`, {
      onClose: afterToastFunction
    })
  }

  return (
    <Formik
      initialValues={{
        company: "",
        rut:"",
        name:"",
        email:"",
        phone:"",
        country:"",
        language:"",
        description:""
      }}
      onSubmit={(values)=>{
        setIsSubmit(prev=> !prev);
        submitData(values)
      }}
    >{({handleSubmit})=>(
      <Form className='w-full h-auto' onSubmit={handleSubmit} >
      <div className=" flex flex-col md:grid md:grid-cols-2 md:gap-2 text-xs w-full bg-white py-4 px-4 shadow-xl rounded-md">
        <div className="mt-2 flex flex-col gap-1">
          <label className='text-gray-400 font-bold'>
            Nombre de la Empresa
          </label>
          <Field
            id="company"
            name="company"
            type="text"
            placeholder='Escribe el nombre'
            autoComplete="off"
            required
            className="block w-full  border-0 px-4 py-2 shadow-sm ring-1 text-negroSidebar ring-inset ring-gray-300 placeholder:text-negro focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div className="mt-2 flex flex-col gap-1">
          <label className='text-gray-400 font-bold'>
            Rut de la Empresa
          </label>
          <Field
            id="rut"
            name="rut"
            type="text"
            placeholder='Rut de la compañia'
            required
            className="block w-full  border-0 px-4 py-2 shadow-sm ring-1 text-negroSidebar ring-inset ring-gray-300 placeholder:text-negro focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div className="mt-2 flex flex-col gap-1">
          <label className='text-gray-400 font-bold'>
            Nombre del Cliente
          </label>
          <Field
            id="name"
            name="name"
            type="text"
            placeholder='Escribe el nombre'
            autoComplete="off"
            required
            className="block w-full  border-0 px-4 py-2 shadow-sm ring-1 text-negroSidebar ring-inset ring-gray-300 placeholder:text-negro focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div className="mt-2 flex flex-col gap-1">
          <label className='text-gray-400 font-bold'>
            Correo Electrónico
          </label>
          <Field
            id="email"
            name="email"
            type="email"
            placeholder='Escribe el correo'
            autoComplete="off"
            className="block w-full  px-4 border-0 text-negroSidebar py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div className="mt-2 flex flex-col gap-1 col-span-2">
          <div className=" pr-2">
          <label className='text-gray-400 font-bold'>
            Numero Telefonico
          </label>
          <Field
            id="phone"
            name="phone"
            type="text"
            placeholder='Escribe el telefono'
            autoComplete="off"
            required
            className="block w-full  border-0 px-4 py-2 shadow-sm ring-1 text-negroSidebar ring-inset ring-gray-300 placeholder:text-negro focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          </div>
        </div>
        <div className="mt-2 flex flex-col gap-1">
          <label className='text-gray-400 font-bold'>
            Ubicación
          </label>
          <Field
            id="country"
            name="country"
            as="select"
            autoComplete="off"
            className="block w-full px-4 border-0 text-negroSidebar py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          >
            <option>--</option>
            {
              COUNTRY.map(el => <option key={el.id} value={el.id}>{el.value}</option>)
            }
          </Field>
        </div>
        <div className="mt-2 flex flex-col gap-1">
          <label className='text-gray-400 font-bold'>
            Idioma
          </label>
          <Field
            id="language"
            name="language"
            as="select"
            autoComplete="off"
            className="block w-full px-4 border-0 text-negroSidebar py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          >
            <option>--</option>
            {
              LENGUAJE.map(el => <option key={el.id} value={el.id}>{el.value}</option>)
            }
          </Field>
        </div>
        <div className="md:col-span-full mt-2 flex flex-col gap-1">
          <label className='text-gray-400 font-bold'>
            Descripcion
          </label>
          <Field
            id="description"
            name="description"
            type="text"
            placeholder='Descripcion'
            autoComplete="off"
            className="block w-full px-4 border-0 text-negroSidebar py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div className='w-full mt-3 bg-white shadow-xl rounded-md flex flex-col md:flx-row md:justify-center gap-2 py-2'>
        <button
          type="button"
          onClick={()=>router.back()}
          className="flex w-auto  justify-center rounded-md bg-white px-3 py-1.5 text-sm font-semibold leading-6 text-gray-400 shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:bg-opacity-50"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isSubmit}
          className={`flex w-full md:w-20 justify-center items-center rounded-md bg-blueprimary px-3 py-1 text-sm font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:bg-opacity-50 ${isSubmit && "bg-opacity-20"}`}
        >
          {isSubmit ? <div className="border-4 border-gray-300 border-t-gray-700 rounded-full w-4 h-4 animate-spin"></div> : "Agregar"}
        </button>
      </div>
    </Form>
    )}</Formik>
  );
};

export default FormClient;