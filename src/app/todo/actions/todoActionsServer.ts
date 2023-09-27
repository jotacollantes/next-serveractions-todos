"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "../../../../libs/prismadb";
import { TodoZodSchema } from "../schema";
import { ZodError } from "zod";

interface ResponseCreateTodo{
  success: boolean;
  message: string;
}
export const createTodo = async (title: string):Promise<ResponseCreateTodo> => {
  //console.log(title)
  // if (!title || title.trim().length === 0) {
  //   return {
  //     error: "Ingrese title (backend)",
  //   };
  // }
  try {
    TodoZodSchema.parse({title})
    await prisma.todo.create({
      data: {
        title,
      },
    });
    //revalidatePath trata a la variable todos como un state y compara el valor de todos que esta en cache del servidor de next con el nuevo valor y pinta el dato actualizado
    revalidatePath("/todo");
    return {
      success:true,
      message:"Todo creado con exito"
    }
  } catch (error) {
    // return {
    //   error: "No se pudo grabar en bd (backend)",
    // };
    //!Valido si error es una instancia de ZodError
    if (error instanceof ZodError)
    {
        //console.log(error)
        return {
          success:false,
          message: error.issues[0].message
        }

    }
      return {
        success:false,
       message: "No se pudo grabar en bd (backend)",
      };
  } finally {
  }
};

export const deleteTodo = async (id: string) => {
  //console.log(title)
  if (!id || id.trim().length === 0) {
    return {
      error: "id is required (backend)",
    };
  }
  try {
    await prisma.todo.delete({
      where: {
        id,
      },
    });
    //revalidatePath trata a la variable todos como un state y compara el valor de todos que esta en cache del servidor de next con el nuevo valor y pinta el dato actualizado
    revalidatePath("/todo");
    return {
      success:true
    }
  } catch (error) {
    return {
      error: "Error remove todo (backend)",
    };
  } finally {
  }
};