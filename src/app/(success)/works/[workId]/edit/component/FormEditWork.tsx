"use client"
import { MODALITY, SERVICE_MODEL } from '@/tools/constants';
import { Field, Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

interface FormClientProps {
  user: any;
  work: any;
  workId: any;
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

interface DataResponse {
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
      name: string[];
      description: string[];
      manager: string[];
      priority: string[];
    }
  }
}


const FormEditWork: React.FC<FormClientProps> = ({ user, work, clients, workId }) => {
  const [isSubmit, setIsSubmit] = useState(false);
  const [servicio, setServicio] = useState<any[]>([]);
  const router = useRouter()

  const afterToastFunction = () => {
    router.refresh()
    router.back()
  };

  useEffect(() => {
    if(work){
      const filter: any = SERVICE_MODEL.find(el=> el.id === work.service_model)
      setServicio(filter?.servicios);
    }
  }, [work])
  

  const submitData = async (data: any) => {
    console.log(data)
    const parsedDate = new Date(data.cutoff_date);
    const formattedDate = parsedDate.toISOString();
    data.cutoff_date = formattedDate
    console.log(data)
    const headers: HeadersInit = new Headers();
    headers.append("Content-Type", "application/json");
    const response: Response = await fetch(`${process.env.BACK_URL}api/works/workput`, {
      method: 'POST',
      headers,
      body: JSON.stringify(
        { data: data, id: workId, user: user }
      )
    });
    const responseJSON: DataResponse = await response.json();
    setIsSubmit(prev=> !prev)
    if(!responseJSON.data){
      console.log("null")
      return
    }
    if (responseJSON.data.errors) {
      if (responseJSON.data.errors.name) {
        responseJSON.data.errors.name.map(el => toast.error(el))
      }
      if (responseJSON.data.errors.description) {
        responseJSON.data.errors.description.map(el => toast.error(el))
      }
      if (responseJSON.data.errors.manager) {
        responseJSON.data.errors.manager.map(el => toast.error(el))
      }
      if (responseJSON.data.errors.priority) {
        responseJSON.data.errors.priority.map(el => toast.error(el))
      }
      return
    }
    toast.success(`Cliente ${responseJSON.data.name} editado con exito`, {
      onClose: afterToastFunction
    })
  }

  console.log(work)

  return (
    <Formik
    initialValues={{
      client_id: work?.client_id,
      name: work?.name,
      manager: work?.manager,
      service_model: work?.service_model,
      type_activity: work?.type_activity,
      priority: work?.priority,
      amount_work: work?.amount_work,
      modality: work?.modality,
      repetition: work?.repetition,
      description: work?.description,
      cutoff_date: work?.cutoff_date.split('T')[0]
    }}
    onSubmit={(values) => {
      setIsSubmit(prev=> !prev)
      submitData(values)
    }}
  >{({ handleSubmit, handleChange }) => (
    <Form className='w-full' onSubmit={handleSubmit} >
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-2 text-xs w-full bg-white py-4 px-4 shadow-xl rounded-md">
        <div className="mt-2 flex flex-col gap-1">
          <label className='text-gray-400 font-bold'>
            Nombre del Cliente
          </label>
          <Field
            id='client_id'
            name="client_id"
            as="select"
            className="block w-full px-4 border-0 text-negroSidebar py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          >
            <option>--</option>
            {
              clients.map(el => (<option key={el.id} value={el.id}>{el.name}</option>))
            }
          </Field>
        </div>
        <div className="mt-2 flex flex-col gap-1">
          <label className='text-gray-400 font-bold'>
            Nombre del Trabajo
          </label>
          <Field
            id="name"
            name='name'
            type="text"
            placeholder='Nombre del trabajo'
            className="block w-full  px-4 border-0 text-negroSidebar py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div className="mt-2 flex flex-col gap-1">
          <label className='text-gray-400 font-bold'>
            Encargado
          </label>
          <Field
            id="manager"
            name="manager"
            as="select"
            className="block w-full px-4 border-0 text-negroSidebar py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          >
            <option>--</option>
            <option value={"FACELAD"}>Facelad SPA</option>
            <option value={"8PRO"}>8 Pro Services</option>
            {/* <option value={"AMBOS"}>Ambos</option> */}
          </Field>
        </div>
        <div className="mt-2 flex flex-col gap-1">
          <label className='text-gray-400 font-bold'>
            Modelo de Servicio
          </label>
          <Field
            as="select"
            id="service_model"
            name="service_model"
            onChange={(e:any)=>{
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
          </Field>
        </div>
        <div className="mt-2 flex flex-col gap-1">
          <label className='text-gray-400 font-bold'>
            Servicio
          </label>
          <Field
            as="select"
            id="type_activity"
            name="type_activity"
            className="block w-full px-4 border-0 text-negroSidebar py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          >
            <option>--</option>
            {
              servicio.map(el => <option key={el?.id} value={el?.id}>{el?.value}</option>)
            }
          </Field>
        </div>
        <div className="mt-2 flex flex-col gap-1">
          <label className='text-gray-400 font-bold'>
            Prioridad
          </label>
          <Field
            id="priority"
            name="priority"
            as="select"
            className="block w-full px-4 border-0 text-negroSidebar py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          >
            <option>--</option>
            <option value={"LOW"}>Bajo</option>
            <option value={"MEDIUM"}>Medio</option>
            <option value={"HIGH"}>Alto</option>
            <option value={"URGENT"}>Urgente</option>
          </Field>
        </div>
        <div className="mt-2 flex flex-col gap-1">
          <label className='text-gray-400 font-bold'>
            Monto del Trabajo
          </label>
          <Field
            id="amount_work"
            name="amount_work"
            type="number"
            className="block w-full  px-4 border-0 text-negroSidebar py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div className="mt-2 flex flex-col gap-1">
          <label className='text-gray-400 font-bold'>
            Modalidad de Pago
          </label>
          <Field
            id="modality"
            as="select"
            name="modality"
            className="block w-full px-4 border-0 text-negroSidebar py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          >
            <option>--</option>
            {
              MODALITY.map(el => <option key={el.id} value={el.id}>{el.value}</option>)
            }
          </Field>
        </div>
        <div className="mt-2 flex flex-col gap-1">
          <label className='text-gray-400 font-bold'>Fecha de Corte:</label>
          <Field 
            type="date" 
            id="cutoff_date" 
            name="cutoff_date"
            value={work?.cutoff_date.split('T')[0]}
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
            value={work?.repetition}
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
            value={work?.description}
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
          {isSubmit ? <div className="border-4 border-gray-300 border-t-gray-700 rounded-full w-4 h-4 animate-spin"></div> : "Editar"}
        </button>
      </div>
      <ToastContainer />
    </Form>
  )}</Formik>

  );
};

export default FormEditWork;