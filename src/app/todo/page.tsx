//import React from "react";
import { prisma } from "../../../libs/prismadb";
import { FormTodo } from "./actions/components/FormTodo";
import { ListTodos } from './actions/components/ListTodos';

const TodoPage = async () => {
  //console.log(process.env)
  const todos = await prisma.todo.findMany();
  //console.log(process.env.DATABASE_URL)

  //console.log(todos)
  return (
    <div className=" space-y-5">
      <h1 className="text-center text-3xl my-10">Todos</h1>
      <FormTodo />
      {/* <pre>{JSON.stringify(todos, null, 2)}</pre> */}
      <ListTodos todos={todos} />
    </div>
  );
};
export default TodoPage;
