import React, { useEffect } from 'react'
import useAuth from '../features/auth/hook/useAuth'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import useProduct from "../features/products/hooks/useProduct.js"

const App = () => {

  const loading = useSelector(state => state.auth.loading)
 


  return (

    loading ? <div>loading</div> :
    <div className='bg-amber-600 '>
    
      <Outlet/>
    </div>
  )
}

export default App
