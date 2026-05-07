import React, { useEffect } from 'react'
import useAuth from '../features/auth/hook/useAuth'
import { Outlet } from 'react-router-dom'

const App = () => {

 

  return (
    <div className='bg-amber-600 text-8xl'>
      hello
      <Outlet/>
    </div>
  )
}

export default App
