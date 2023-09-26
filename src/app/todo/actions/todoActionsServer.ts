"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "../../../../libs/prismadb";

export const createTodo = async (title: string) => {
  //console.log(title)
  if (!title || title.trim().length === 0) {
    return {
      error: "Ingrese title (backend)",
    };
  }
  try {
    await prisma.todo.create({
      data: {
        title,
      },
    });
    //revalidatePath trata a la variable todos como un state y compara el valor de todos que esta en cache del servidor de next con el nuevo valor y pinta el dato actualizado
    revalidatePath("/todo");
    return {
      success:true
    }
  } catch (error) {
    return {
      error: "No se pudo grabar en bd (backend)",
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