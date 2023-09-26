"use client";
import React from "react";
import { useTransition } from "react";
import { ITodo } from "@/interfaces";

import { FaSpinner, FaTrash } from "react-icons/fa";
import { deleteTodo } from "../todoActionsServer";
import toast from "react-hot-toast";

interface Props {
  todo: ITodo;
}

export const ItemTodo = ({ todo }: Props) => {
  const [isPending, startTransition] = useTransition();
  const handleClickDelete = async (id: string) => {
    //return alert(id)
    const resp = await deleteTodo(id);
    if (resp.error) {
      toast.error(resp.error);
    } else {
      toast.success("Todo eliminado");
    }
  };
  return (
    <div className="border border-gray-400 rounded mb-1 p-2 flex justify-between items-center">
      <span>{todo.title}</span>
      {/* Para usar una accion del servidor especifico dentro de un boton sin usar el Form action usamos el useTransition */}
      <button onClick={() => startTransition(() => handleClickDelete(todo.id))}>
        {isPending ? (
          <span className="block animate-spin">
            <FaSpinner className="transform rotate-90" />
          </span>
        ) : (
          <FaTrash className="text-red-600" />
        )}
      </button>
    </div>
  );
};
