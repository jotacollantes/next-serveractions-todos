"use client";
import { useRef } from "react";

import { ButtonFormTodo } from './ButtonFormTodo';
import { createTodo } from "../todoActionsServer";
import toast from "react-hot-toast";


export const FormTodo = () => {
    //Usamos el hook useRef para hacer el reset del formulario
const formRef=useRef<HTMLFormElement>(null)
  const handlerSubmit = async (data: FormData) => {
    const title = data.get("title") as string;
    
    // if (!title || title.trim().length===0) {
    //     return toast.error("Ingrese title")
    // }
    //Uso el server action createTodo desde un componente del cliente
    const resp=await createTodo(title);
    if(resp?.error) {
      return toast.error(resp.error)
    }

    formRef.current?.reset()
    toast.success("todo creado")
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
