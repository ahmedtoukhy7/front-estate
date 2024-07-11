import React, { useState } from 'react'
import './Register.scss'
import bg from '../../../public/bg.png'
import { Link, useNavigate } from 'react-router-dom'
import {useFormik} from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { Audio } from 'react-loader-spinner'
export default function Register() {

  const nav =useNavigate()
  let validationSchema= yup.object({
    username:yup.string().max(15,'max length is 15').min(3,'min length is 3').required('name is required'),
    email:yup.string().email('email is invalid').required('email is required'),
    password:yup.string().required('password is required').matches(/^[a-z0-9]{3,15}$/,'enter valid password'),
   
})

let [loading,setLoading]=useState(false)
let [err,setErr]=useState('')

async function submitReg(val){

  try {
    setLoading(true)
    let {data}= await axios.post('https://back-estate-production.up.railway.app/api/auth/register',val)

    if(data.message=='success'){
      setLoading(false)
      nav('/login')
    }
    console.log(data)
    

    
  } catch (error) {
    setLoading(false)
    console.log(error)
    setErr(error.response.data.message)
  }

}

  const formik =useFormik({
    initialValues:{
      username:'',
      email:'',
      password:''
    },
    validationSchema:validationSchema,
    onSubmit : submitReg
  })


  return <>

  <div className='register'>
    <div className='form'>
        <form onSubmit={formik.handleSubmit} action="">
            <h2>Create An Account</h2>
            {err? <div className='alert'>{err}</div>:null}
            <input onBlur={formik.handleBlur} onChange={formik.handleChange}  placeholder='Enter username' type="text" name='username' />
            {formik.errors.username && formik.touched.username ? <div className='alert'>{formik.errors.username}</div>:null}
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} placeholder='Enter email' type="text" name='email' />
            {formik.errors.email && formik.touched.email ? <div className='alert'>{formik.errors.email}</div>:null}
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} placeholder='Enter password' type="password" name='password' />
            {formik.errors.password && formik.touched.password ? <div className='alert'>{formik.errors.password}</div>:null}
            <button className='submit' type='submit'>{loading ? <Audio
  height="50"
  width="80"
  radius="9"
  color="green"
  ariaLabel="loading"
  wrapperStyle
  wrapperClass
/> : 'Register'}</button>
        </form>
            <Link to='/login'>Do yo have account</Link>
    </div>
    <div className='image'>
    <img src={bg} alt="" />
    </div>
  </div>
  
  
  </>
}
