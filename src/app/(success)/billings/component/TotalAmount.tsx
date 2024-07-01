"use client"
import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';

interface props {
  user:any,
  totalAmountInit: any,
  yearInit: any,
  monthInit: any;

}

const TotalAmount: React.FC<props> = ({user, totalAmountInit, yearInit, monthInit }) => {
  const [valueYear, setValueYear] = useState("")
  const [valueMonth, setValueMonth] = useState("")
  const [totalAmount, setTotalAmount] = useState<number | null>(null);

  const evalueMonth = (monthNumber: string) =>{
    let nombreMes: string = '';

    switch (monthNumber) {
        case "1":
            nombreMes = 'Enero';
            break;
        case "2":
            nombreMes = 'Febrero';
            break;
        case "3":
            nombreMes = 'Marzo';
            break;
        case "4":
            nombreMes = 'Abril';
            break;
        case "5":
            nombreMes = 'Mayo';
            break;
        case "6":
            nombreMes = 'Junio';
            break;
        case "7":
            nombreMes = 'Julio';
            break;
        case "8":
            nombreMes = 'Agosto';
            break;
        case "9":
            nombreMes = 'Septiembre';
            break;
        case "10":
            nombreMes = 'Octubre';
            break;
        case "11":
            nombreMes = 'Noviembre';
            break;
        case "12":
            nombreMes = 'Diciembre';
            break;
        default:
            nombreMes = 'Mes no válido';
            break;
    }

    return nombreMes;
  }

  const SearchAmount = async (values:any)=>{
    console.log(values)
    setValueYear(values.year)
    setValueMonth(values.month)
    try {
      const headers: HeadersInit = new Headers();
      headers.append("Content-Type", "application/json");
      const response: Response = await fetch(`${process.env.BACK_URL}api/billings/totalamount`, {
        method: 'POST',
        headers,
        body: JSON.stringify(
          {user, year: values.year, month: values.month}
        )
      });
      const responseJSON = await response.json();
      if(!responseJSON.total_amount_sum){
        console.log("entre al if")
        setTotalAmount(0)
        return
      }
      setTotalAmount(responseJSON.total_amount_sum)
    } catch (error: any) {
      console.log("soy el error del get de cliente", error)
    }
  }

  console.log(totalAmount)

  // useEffect(()=>{
  //   SearchAmount("2024", "6");
  // }, [])

  return (
    <div className='w-full h-auto md:h-32 py-4 md:py-0 bg-gradient-to-r flex items-center from-fondogradien1 to-fondogradien2'>
      <div className=' px-20 flex flex-col items-center md:items-start gap-4 md:gap-4 lg:flex-row justify-between w-full'>
        <div className=''>
          <h1 className='text-white text-lg'>
            {totalAmount === null ? <>{evalueMonth(monthInit)} {yearInit} , Total: {totalAmountInit}</>: <> {evalueMonth(valueMonth)} {valueYear}, Total: {totalAmount}</> }
          </h1>
        </div>
        <Formik
          initialValues={{
            year:"",
            month: "",
          }}
          onSubmit={async (values)=>{
            SearchAmount(values)
          }}
        >{({handleChange, handleSubmit})=>(
          <Form onSubmit={handleSubmit} className='flex flex-col md:flex-row  gap-2 md:gap-4'>
            <div>
            <Field name="year" as="select" className='px-4 py-1 rounded-md'>
              <option>
                Ingresos del año
              </option>
              <option value={"2020"}>
                2020
              </option>
              <option value={"2021"}>
                2021
              </option>
              <option value={"2022"}>
                2022
              </option >
              <option value={"2023"}>
                2023
              </option>
              <option value={"2024"}>
                2024
              </option>
            </Field>
          </div>
          <div>
            <Field name="month" as="select" className='px-4 py-1 rounded-md'>
              <option>
                Ingresos del mes
              </option>
              <option value="1">
                Enero
              </option>
              <option value="2">
                Febrero
              </option>
              <option value="3">
                Marzo
              </option>
              <option value="4">
                Abril
              </option>
              <option value="5">
                Mayo
              </option>
              <option value="6">
                Junio
              </option>
              <option value="7">
                Julio
              </option>
              <option value="8">
                Agosto
              </option>
              <option value="9">
                Septiembre
              </option>
              <option value="10">
                Octubre
              </option>
              <option value="11">
                Noviembre
              </option>
              <option value="12">
                Diciembre
              </option>
            </Field>
          </div>
          <button className="text-black rounded-md flex items-center justify-center text-xs bg-slatesecondary shadow-md  focus:ring-4 focus:ring-blue-300 font-medium  px-3 py-1  w-auto" type="submit">Buscar</button>
          </Form>
        )}</Formik>
      </div>
    </div>
  );
};

export default TotalAmount
