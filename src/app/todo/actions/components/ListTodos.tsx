import { ITodo } from '@/interfaces'
import React from 'react'
import { ItemTodo } from './ItemTodo'
interface Props {
    todos: ITodo[]
}
export const ListTodos = ({todos}:Props) => {
    if (!todos || todos.length===0) {
        return (
            <div className='text-center text-2xl'>No hay tareas</div>
          )
    }
  return (
    <div className='text-center text-2xl'>
   {
    todos.map((todo)=>(
        <ItemTodo key={todo.id} todo={todo} />
    ))
   }
    </div>
    
  )
}
