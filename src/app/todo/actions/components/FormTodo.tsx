"use client";
import { useRef } from "react";

import { ButtonFormTodo } from './ButtonFormTodo';
import { createTodo } from "../todoActionsServer";
import toast from "react-hot-toast";
import { TodoZodSchema } from "../../schema";
import { ZodError } from "zod";


export const FormTodo = () => {
    //Usamos el hook useRef para hacer el reset del formulario
const formRef=useRef<HTMLFormElement>(null)
  const handlerSubmit = async (data: FormData) => {
    const title = data.get("title") as string;
    
    // if (!title || title.trim().length===0) {
    //     return toast.error("Ingrese title")
    // }
    
    //!Zod dispara un throw new error
    try {
      TodoZodSchema.parse({title})
      const resp=await createTodo(title);


      if (!resp.success) {
       return  toast.error(resp.message)
      }
      return toast.success(resp.message)
      
    } catch (error ) {
      //!Valido si error es una instancia de ZodError
      if (error instanceof ZodError)
      {
          console.log(error.issues)
          return error.issues.map((issue)=>toast.error(issue.message))
      }
    } finally {
      // haya o no error siempre se ejecuta el finally
      formRef.current?.reset()
    }
    
    //Uso el server action createTodo desde un componente del cliente


    // if(resp?.error) {
    //   return toast.error(resp.error)
    // }

    
    
  };
  return (
    //el metodo action se puede ejecutar en el componente del cliente
    //
    <form   ref={formRef} action={handlerSubmit} className="flex">
      <input
        type="text"
        name="title"
        className="border rounded border-gray-400 mr-2 p-2 w-full"
      />
      <ButtonFormTodo/>
    </form>
  );
};
