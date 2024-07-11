import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Login.scss'
import bg from '../../../public/bg.png'
import {useFormik} from 'formik'
import * as yup from 'yup'
import { Audio } from 'react-loader-spinner'
import axios from 'axios'
import { auth } from '../../context/authContext'

export default function Login() {

  let{token,setToken,setUserData,userData , updateUser}=useContext(auth)
  
  const nav =useNavigate()
  let validationSchema= yup.object({
   
    email:yup.string().email('email is invalid').required('email is required'),
    password:yup.string().required('password is required').matches(/^[a-z0-9]{3,15}$/,'enter valid password'),
   
})
let [loading,setLoading]=useState(false)
let [err,setErr]=useState('')

async function submitLog(val){

  try {
    setLoading(true)
    let {data}= await axios.post('https://back-estate-production.up.railway.app/api/auth/login',val)
    console.log(data)
    if(data.message=='success'){
      localStorage.setItem('token',data.data.token)
      // localStorage.setItem('userdata',JSON.stringify(data.data))
    
      updateUser(data.data)
      nav('/')
      setToken(data.data.token)
      console.log(userData)
      console.log('token =>' + token)
      setLoading(false)
    }
    
    console.log(userData)
    

    
  } catch (error) {
    setLoading(false)
    setErr(error.response.data.message)
    console.log(error)
    
  }

}

const formik =useFormik({
  initialValues:{
    email:'',
    password:''
  },
  validationSchema:validationSchema,
  onSubmit : submitLog
})



  return <div className='login'>
  <div className='form'>
      <form onSubmit={formik.handleSubmit} action="">
          <h2>Login Now</h2>
          {err? <div className='alert'>{err}</div>:null}
          <input onBlur={formik.handleBlur} onChange={formik.handleChange}  placeholder='Enter email' type="text" name='email' />
          {formik.errors.email && formik.touched.email ? <div className='alert'>{formik.errors.email}</div>:null}
          <input onBlur={formik.handleBlur} onChange={formik.handleChange}  placeholder='Enter password' type="password" name='password' />
          {formik.errors.password && formik.touched.password ? <div className='alert'>{formik.errors.password}</div>:null}
          <button className='submit' type='submit'>{loading ? <Audio
  height="50"
  width="80"
  radius="9"
  color="green"
  ariaLabel="loading"
  wrapperStyle
  wrapperClass
/> : 'Login'}</button>
      </form>
          <Link to='/register'>create account</Link>
  </div>
  <div className='image'>
  <img src={bg} alt="" />
  </div>
</div>
}
