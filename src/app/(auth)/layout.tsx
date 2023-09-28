import React from 'react'
interface Props {
    children: React.ReactNode
}
const AuthLayout = ({children}:Props) => {
  return (
    //Como no se especifica el numero de celdas del grid, solo se configura una y se coloca los elementos en el centro (ejes x,y)
    <div className='grid place-items-center min-h-screen'>
        {children}
   </div>
  )
}

export default AuthLayout