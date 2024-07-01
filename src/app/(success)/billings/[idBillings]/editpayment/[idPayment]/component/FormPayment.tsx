"use client"
import { Field, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

interface FormEditPayProps {
  user: any;
  paydata: any;
  billing: any;
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
      title?: string[];
      currency?: string[];
    };
  }
}


const FormPayment: React.FC<FormEditPayProps> = ({user, paydata, billing}) => {
  const [isSubmit, setIsSubmit] = useState(false);
  const [monto, setMonto] = useState(0);
  const router = useRouter()

  const validationAmount = (amountWork: number, monto: string, payments: any[]) => {
    const montoInt = parseFloat(monto)
    const total = amountWork;
    const totalPayment = payments.reduce((total, item) => total + parseFloat(item.amount), 0)
    const result = total - totalPayment
    
    if (result > 0) {
      if (montoInt <= result) {
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  }

  const RestAmount = (amountWork: number, payments: any[]) => {
    const total = amountWork;
    const totalPayment = payments.reduce((total, item) => total + parseFloat(item.amount), 0)
    const result = total - totalPayment
    return result
  }

  const afterToastFunction = () => {
    router.refresh()
    router.back()
  };

  const submitData = async (data: any) => {
      data.id = paydata.id
      data.payment_date = paydata.payment_date
      data.is_deleted = paydata.is_deleted
      data.created_at = paydata.created_at
      data.updated_at = paydata.updated_at
      data.billing_id = paydata.billing_id
    const headers: HeadersInit = new Headers();
    headers.append("Content-Type", "application/json");
    const response: Response = await fetch(`${process.env.BACK_URL}api/billings/paymentput`, {
      method: 'POST',
      headers,
      body: JSON.stringify(
        { data: data, id: paydata.id, user: user }
      )
    });
    const responseJSON = await response.json();
    setIsSubmit(prev => !prev)
    // if (responseJSON.data.errors) {
    //   if (responseJSON.data.errors.title) {
    //     responseJSON.data.errors.title.map(el => toast.error(el))
    //   }
    //   if (responseJSON.data.errors.currency) {
    //     responseJSON.data.errors.currency.map(el => toast.error(el))
    //   }
    //   return
    // }
    toast.success(`Pago editado con exito`, {
      onClose: afterToastFunction
    })

  }

  return (
    <Formik
      initialValues={{
        description:paydata.description,
        amount: paydata.amount,
        payment_method:paydata.payment_method
      }}
      onSubmit={(values) =>{
          if(validationAmount(billing.work.amount_work, String(values.amount), billing.payments_list)){
            setIsSubmit(prev => !prev)
            submitData(values)
          } else {
            toast.error("El monto no puede sobrepasar el total del valor")
          }
      }}
    >
      {({ handleSubmit, handleChange }) => (
        <form className='w-full' onSubmit={handleSubmit} >
          <div className=" grid grid-cols-2 gap-2 text-xs w-full bg-white py-4 px-4 shadow-xl rounded-md">
            <div className="mt-2 flex flex-col gap-1">
              <label className='text-gray-400 font-bold'>
                Descripcion del Pago
              </label>
              <Field
                id="description"
                name="description"
                type="text"
                className="block w-full  px-4 border-0 text-negroSidebar py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <div className="mt-2 flex flex-col gap-1">
              <label className='text-gray-400 font-bold'>
                Monto del Pago
              </label>
              <Field
                id="amount"
                name="amount"
                type="text"
                
                onChange={(e:any) => {
                  if(parseFloat(e.target.value) > 0){
                    if(validationAmount(billing.work.amount_work, e.target.value, billing.payments_list)){
                      handleChange(e)
                    } else {
                      toast.error("El monto no puede sobrepasar el total del valor")
                      handleChange(e)
                    }
                  }
                }}
                className="block w-full  px-4 border-0 text-negroSidebar py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <div className="mt-2 flex flex-col gap-1">
              <label className='text-gray-400 font-bold'>
                Metodo de Pago
              </label>
              <Field
                as="select"
                id='payment_method'
                name='payment_method'
                className="block w-full px-4 border-0 text-negroSidebar py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option>--</option>
                <option value={"Transferencia"}>Transferencia</option>
                <option value={"Cripto"}>Cripto</option>
                <option value={"Efectivo"}>Efectivo</option>
              </Field>
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
        </form>
      )}
    </Formik>

  );
};

export default FormPayment;