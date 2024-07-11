import React, { useContext } from 'react'
import { auth } from '../../context/authContext'
import { Navigate } from 'react-router-dom'

export default function Protected(props) {
     const token = localStorage.getItem('token')

     if(token){

        return props.children

     }
     else{
        return <Navigate to ='/login'/>
     }

  return (
    <div>Protected</div>
  )
}
