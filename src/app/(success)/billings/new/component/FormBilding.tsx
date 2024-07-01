"use client"
import { Field, Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

interface Work {
  id: number,
  name: string,
  description: string,
  is_paid: true,
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  manager: string,
  is_active: true,
  is_deleted: true,
  created_at: string,
  updated_at: string,
  client_id: number,
  tasks_list: any,
  amount_work: number
}

interface Billing {
  id: number;
  currency: string;
  billing_date: string;
  due_date: string;
  total_amount: number;
  title: string;
  folio: string;
  description: string;
  status: string;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  work_id: number;
  errors: {
    title?: string[];
    currency?: string[];
    due_date?: string[];
    folio?: string[];
  };
}

interface BillingResponse {
  data: Billing;
}

interface FormEditBillingsProps {
  user: any;
  works: Work[];
}


const FormBilding: React.FC<FormEditBillingsProps> = ({ user, works }) => {
  const [isSubmit, setIsSubmit] = useState(false);
  const [monto, setMonto] = useState(0);
  const router = useRouter()

  const afterToastFunction = () => {
    router.refresh()
    router.back()
  };

  const submitData = async (data: any) => {
    data.work_id = parseInt(data.work_id)
    const filterWork = works.find(el => el.id === data.work_id)
    console.log(filterWork)
    data.total_amount = filterWork?.amount_work
    const parsedDate = new Date(data.due_date);
    const formattedDate = parsedDate.toISOString();
    data.due_date = formattedDate
    console.log(data)
    const headers: HeadersInit = new Headers();
    headers.append("Content-Type", "application/json");
    const response: Response = await fetch(`${process.env.BACK_URL}api/billings`, {
      method: 'POST',
      headers,
      body: JSON.stringify(
        data
      )
    });
    const responseJSON: BillingResponse = await response.json();
    setIsSubmit(prev=> !prev)
    if (responseJSON.data.errors) {
      if (responseJSON.data.errors.title) {
        responseJSON.data.errors.title.map(el => toast.error(el))
      }
      if (responseJSON.data.errors.currency) {
        responseJSON.data.errors.currency.map(el => toast.error(el))
      }
      return
    }
    toast.success(`${responseJSON.data.title} creado con exito`, {
      onClose: afterToastFunction
    })

  }

  return (
    <Formik
      initialValues={{
        work_id: "",
        currency:"",
        title:"",
        folio:0,
        due_date:"",
        description:""
      }}
      onSubmit={(values) => {
        setIsSubmit(prev=> !prev)
        submitData(values);
      }}
    >{({ handleSubmit, handleChange }) => (
      <Form className='w-full' onSubmit={handleSubmit} >
        <div className=" grid grid-cols-1 md:grid-cols-2 gap-2 text-xs w-full bg-white py-4 px-4 shadow-xl rounded-md">
          <div className="mt-2 flex flex-col gap-1">
            <label className='text-gray-400 font-bold'>
              Trabajo
            </label>
            <Field
              name='work_id'
              id='work_id'
              as="select"
              onChange={(e:any) => {
                const filterWork = works.find(el => el.id === parseInt(e.target.value))?.amount_work || 0
                setMonto(filterWork);
                handleChange(e)
              }}
              className="block w-full px-4 border-0 text-negroSidebar py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <option>--</option>
              {
                works.map(el => (<option key={el.id} value={el.id}>{el.name}</option>))
              }
            </Field>
          </div>
          <div className="mt-2 flex flex-col gap-1">
            <label className='text-gray-400 font-bold'>
              Monto Total
            </label>
            <Field
              type="number"
              disabled
              value={monto}
              className="block w-full  px-4 border-0 text-negroSidebar py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="mt-2 flex flex-col gap-1">
            <label className='text-gray-400 font-bold'>
              Moneda
            </label>
            <Field
              name="currency"
              id='currency'
              as="select"
              autoComplete="off"
              className="block w-full px-4 border-0 text-negroSidebar py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <option>--</option>
              <option>USD</option>
              <option>EUR</option>
              <option>BTC</option>
              <option>USDT</option>
              <option>ETH</option>
              <option>CLP</option>
            </Field>
          </div>
          <div className="mt-2 flex flex-col gap-1">
            <label className='text-gray-400 font-bold'>
              Titulo
            </label>
            <Field
              id="title"
              name="title"
              type="string"
              autoComplete="off"
              className="block w-full  px-4 border-0 text-negroSidebar py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div className=" mt-2 flex flex-col gap-1">
            <label className='text-gray-400 font-bold'>
              Folio
            </label>
            <Field
              id="folio"
              name="folio"
              type="number"
              placeholder='Descripcion'
              autoComplete="off"
              className="block w-full px-4 border-0 text-negroSidebar py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="mt-2 flex flex-col gap-1">
            <label className='text-gray-400 font-bold'>Fecha:</label>
            <Field
              type="date"
              id="due_date"
              name="due_date"
              className="block w-full px-4 border-0 text-negroSidebar py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
              placeholder='Descripcion'
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
          {isSubmit ? <div className="border-4 border-gray-300 border-t-gray-700 rounded-full w-4 h-4 animate-spin"></div> : "Crear"}
        </button>
        </div>
        <ToastContainer />
      </Form>
    )}</Formik>
  );
};

export default FormBilding;