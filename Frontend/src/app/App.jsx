import React, { useEffect } from 'react'
import useAuth from '../features/auth/hook/useAuth'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const App = () => {

  const loading = useSelector(state => state.auth.loading)
 

  return (

    loading ? <div>loading</div> :
    <div className='bg-amber-600 text-8xl'>
      hello
      <Outlet/>
    </div>
  )
}

export default App
