import React from "react";
import { prisma } from "../../libs/prismadb";
import { FormTodo } from "./todo/actions";
import { ListTodos } from "./todo/actions/components/ListTodos";

import { UserButton, currentUser } from "@clerk/nextjs";
import type { User } from "@clerk/nextjs/api";

const TodoPage = async () => {
  //console.log(process.env)
  const user: User | null = await currentUser();
  if (!user) {
    return <div>Loading...</div>
  }
  const todos = await prisma.todo.findMany({where :{userId:user?.id}});
  //console.log(process.env.DATABASE_URL)

  //console.log(todos)
  console.log(user.username)
  return (
    <div className=" space-y-5">
      <h1 className="text-center text-3xl my-10">Todos {user.username}</h1>
      <UserButton afterSignOutUrl="/"/>
      <FormTodo />
      {/* <pre>{JSON.stringify(todos, null, 2)}</pre> */}
      <ListTodos todos={todos} />
    </div>
  );
};
export default TodoPage;