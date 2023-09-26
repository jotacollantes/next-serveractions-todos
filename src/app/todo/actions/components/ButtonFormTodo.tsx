"use client";
import React from "react";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { FaSpinner } from "react-icons/fa";

export const ButtonFormTodo = () => {
  const { pending } = useFormStatus();
  return (
    <button 
    type="submit"
    disabled={pending}
    className="border rounded border-gray-400 w-28 p-2 grid place-items-center">
      {pending ? (
        <span className="block animate-spin">
          <FaSpinner className="transform rotate-90"/>
        </span>
      ) : (
        "Add"
      )}
    </button>
  );
};
