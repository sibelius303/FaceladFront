"use client"
import { MODALITY, SERVICE_MODEL } from '@/tools/constants';
import { Field, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

interface FormClientProps {
  user: any;
  clients: [{
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
  }]
}

interface Task {
  data: {
    id: number;
    name: string;
    description: string;
    is_paid: boolean;
    priority: 'URGENT' | 'HIGH' | 'MEDIUM' | 'LOW';
    manager: string;
    is_active: boolean;
    is_deleted: boolean;
    created_at: string;
    updated_at: string;
    errors: {
      name?: string[];
      priority?: string[];
      description?: string[];
      manager?: string[];
    };
  }
}


const FormWork: React.FC<FormClientProps> = ({ user, clients }) => {
  const [isSubmit, setIsSubmit] = useState(false);
  const [servicio, setServicio] = useState<any[]>([]);
  const router = useRouter()

  const afterToastFunction = () => {
    router.refresh()
    router.back()
  };

  const submitData = async (data: any) => {
    data.client_id = parseInt(data.client_id)
    const parsedDate = new Date(data.cutoff_date);
    const formattedDate = parsedDate.toISOString();
    data.cutoff_date = formattedDate
    console.log(data)
    const headers: HeadersInit = new Headers();
    headers.append("Content-Type", "application/json");
    const response: Response = await fetch(`${process.env.BACK_URL}api/works`, {
      method: 'POST',
      headers,
      body: JSON.stringify(
        data
      )
    });
    const responseJSON: Task = await response.json();
    setIsSubmit(prev=> !prev)
    if (responseJSON.data.errors) {
      if (responseJSON.data.errors.name) {
        responseJSON.data.errors.name.map(el => toast.error(el))
      }
      if (responseJSON.data.errors.priority) {
        responseJSON.data.errors.priority.map(el => toast.error(el))
      }
      if (responseJSON.data.errors.description) {
        responseJSON.data.errors.description.map(el => toast.error(el))
      }
      if (responseJSON.data.errors.manager) {
        responseJSON.data.errors.manager.map(el => toast.error(el))
      }
      return
    }
    toast.success(`${responseJSON.data.name} creado con exito`, {
      onClose: afterToastFunction
    })

  }

  return (
    <Formik
      initialValues={{
        client_id: "",
        name: "",
        manager: "",
        service_model: "",
        type_activity: "",
        priority: "",
        amount_work: 0,
        modality: "",
        repetition: 0,
        description: ""
      }}
      onSubmit={(values) => {
        setIsSubmit(prev=> !prev)
        submitData(values)
      }}
    >{({ handleSubmit, handleChange }) => (
      <form className='w-full' onSubmit={handleSubmit} >
        <div className=" grid grid-cols-1 md:grid-cols-2 gap-2 text-xs w-full bg-white py-4 px-4 shadow-xl rounded-md">
          <div className="mt-2 flex flex-col gap-1">
            <label className='text-gray-400 font-bold'>
              Nombre del Cliente
            </label>
            <select
              id='client_id'
              name="client_id"
              onChange={(e)=>{handleChange(e)}}
              autoComplete="off"
              className="block w-full px-4 border-0 text-negroSidebar py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <option>--</option>
              {
                clients.map(el => (<option key={el.id} value={el.id}>{el.name}</option>))
              }
            </select>
          </div>
          <div className="mt-2 flex flex-col gap-1">
            <label className='text-gray-400 font-bold'>
              Nombre del Trabajo
            </label>
            <input
              id="name"
              type="text"
              onChange={(e)=>{handleChange(e)}}
              placeholder='Escribe el correo'
              className="block w-full  px-4 border-0 text-negroSidebar py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="mt-2 flex flex-col gap-1">
            <label className='text-gray-400 font-bold'>
              Encargado
            </label>
            <select
              id="manager"
              name="manager"
              onChange={(e)=>{handleChange(e)}}
              className="block w-full px-4 border-0 text-negroSidebar py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <option>--</option>
              <option value={"FACELAD"}>Facelad SPA</option>
              <option value={"8PRO"}>8 Pro Services</option>
              {/* <option value={"AMBOS"}>Ambos</option> */}
            </select>
          </div>
          <div className="mt-2 flex flex-col gap-1">
            <label className='text-gray-400 font-bold'>
              Modelo de Servicio
            </label>
            <select
              id="service_model"
              name="service_model"
              autoComplete="off"
              onChange={(e)=>{
                if(e.target.value !== ""){
                  const filter: any = SERVICE_MODEL.find(el=> el.id === e.target.value)
                  setServicio(filter?.servicios);
                  handleChange(e)
                }
                handleChange(e)
                
              }}
              className="block w-full px-4 border-0 text-negroSidebar py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <option>--</option>
              {
                SERVICE_MODEL.map(el => <option key={el.id} value={el.id}>{el.value}</option>)
              }
            </select>
          </div>
          <div className="mt-2 flex flex-col gap-1">
            <label className='text-gray-400 font-bold'>
              Servicio
            </label>
            <select
              id="type_activity"
              name="type_activity"
              onChange={(e)=>{handleChange(e)}}
              className="block w-full px-4 border-0 text-negroSidebar py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <option>--</option>
              {
                servicio.map(el => <option key={el?.id} value={el?.id}>{el?.value}</option>)
              }
            </select>
          </div>
          <div className="mt-2 flex flex-col gap-1">
            <label className='text-gray-400 font-bold'>
              Prioridad
            </label>
            <select
              id="priority"
              name="priority"
              onChange={(e)=>{handleChange(e)}}
              className="block w-full px-4 border-0 text-negroSidebar py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <option>--</option>
              <option value={"LOW"}>Bajo</option>
              <option value={"MEDIUM"}>Medio</option>
              <option value={"HIGH"}>Alto</option>
              <option value={"URGENT"}>Urgente</option>
            </select>
          </div>
          <div className="mt-2 flex flex-col gap-1">
            <label className='text-gray-400 font-bold'>
              Monto del Trabajo
            </label>
            <input
              id="amount_work"
              type="number"
              onChange={(e)=>{handleChange(e)}}
              className="block w-full  px-4 border-0 text-negroSidebar py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="mt-2 flex flex-col gap-1">
            <label className='text-gray-400 font-bold'>
              Modalidad de Pago
            </label>
            <select
              id="modality"
              name="modality"
              onChange={(e)=>{handleChange(e)}}
              className="block w-full px-4 border-0 text-negroSidebar py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <option>--</option>
              {
                MODALITY.map(el => <option key={el.id} value={el.id}>{el.value}</option>)
              }
            </select>
          </div>
          <div className="mt-2 flex flex-col gap-1">
            <label className='text-gray-400 font-bold'>Fecha de Corte:</label>
            <Field 
              type="date" 
              id="cutoff_date" 
              name="cutoff_date"
              className="block w-full px-4 border-0 text-negroSidebar py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="mt-2 flex flex-col gap-1">
            <label className='text-gray-400 font-bold'>
              Repeticion de Facturacion
            </label>
            <input
              id="repetition"
              name="repetition"
              type="number"
              onChange={(e)=>{handleChange(e)}}
              autoComplete="off"
              className="block w-full  px-4 border-0 text-negroSidebar py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="col-span-full mt-2 flex flex-col gap-1">
            <label className='text-gray-400 font-bold'>
              Descripcion
            </label>
            <input
              id="description"
              name="description"
              type="text"
              placeholder='Descripcion'
              onChange={(e)=>{handleChange(e)}}
              autoComplete="off"
              className="block w-full px-4 border-0 text-negroSidebar py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className='w-full mt-3 bg-white shadow-xl rounded-md flex justify-center gap-2 py-2'>
          <button
            type="button"
            className="flex w-auto  justify-center rounded-md bg-white px-3 py-1.5 text-sm font-semibold leading-6 text-gray-400 shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:bg-opacity-50"
          >
            Cancelar
          </button>
          <button
          type="submit"
          disabled={isSubmit}
          className={`flex w-20 justify-center items-center rounded-md bg-blueprimary px-3 py-1 text-sm font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:bg-opacity-50 ${isSubmit && "bg-opacity-20"}`}
        >
          {isSubmit ? <div className="border-4 border-gray-300 border-t-gray-700 rounded-full w-4 h-4 animate-spin"></div> : "Agregar"}
        </button>
        </div>
        <ToastContainer />
      </form>
    )}</Formik>
  );
};

export default FormWork;