import React from 'react'
import { useSelector } from 'react-redux'
import {Navigate} from "react-router-dom"

const Public = ({children}) => {
    
    const user = useSelector(state => state.auth.user)
    console.log(user , "user in public")
    if(user){

      return <Navigate to="/" />

    }


    
  return (
    <div>
        {children}
    </div>
  )
}

export default Public