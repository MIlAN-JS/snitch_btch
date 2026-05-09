import React from 'react'
import { useSelector } from 'react-redux'
import {Navigate} from "react-router-dom"

const Private = ({children}) => {
    
    const user = useSelector(state => state.auth.user)
    console.log("user is " , user)
    
    if( user === null){

      return <Navigate to="/register" />

    }
    
  return (
    <div>
        {children}
    </div>
  )
}

export default Private