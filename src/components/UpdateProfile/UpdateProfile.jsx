import React, { useContext, useState } from 'react'
import './UpdateProfile.scss'
import { auth } from '../../context/authContext'
import { useFormik } from 'formik'
import * as yup from 'yup'
import avt from '../../../public/avt.webp'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { BallTriangle } from 'react-loader-spinner'
import UploadWidget from '../UploadWidget/UploadWidget'

export default function UpdateProfile() {
  let {userData,updateUser}=useContext(auth)
  let [err,setError]=useState('')
  let [loading,setLoading]=useState(false)
  // let [avatar,setAvatar]=useState('')

  const {avatar,setAvatar}=useContext(auth)
  console.log(avatar)

  let validationSchema= yup.object({
    username:yup.string().max(15,'max length is 15').min(3,'min length is 3').required('name is required'),
    email:yup.string().email('email is invalid').required('email is required'),
    
   
})

let nav =useNavigate()



const formik =useFormik({
  initialValues:{
    username:userData.usernme,
    email:userData.email,
   
   
  },
  validationSchema:validationSchema,
  onSubmit : updateProfile
})

async function updateProfile(val){

  const {username,email}=val

 

  try {
    setLoading(true)
    const {data}=await axios.put(`https://back-estate-production.up.railway.app/api/users/${userData.id}`,{
      username,
      email,
      avatar:avatar[0]
      
    },{
      headers :{
        token:localStorage.getItem('token')
      }
    })

    console.log(data)

  if(data.message=='success'){
    setLoading(false)
    updateUser(data.data)
    nav('/profile')
  }
    
  } catch (error) {
    setLoading(false)
    console.log(error)
    setError(error)
    setTimeout( ()=>{nav('/login')} , 3000)
    //  nav('/login')
    
  }

}


  return <>

  <div className='updateprofile'>
    <h2>Update Your Profile</h2>
    

   {/* {err ? <p className='error'>{err.response.data.message}</p>:''} */}
    <form onSubmit={formik.handleSubmit} action="">
        <input name='username' onChange={formik.handleChange} onBlur={formik.handleBlur} defaultValue={userData.username}   type="text" />
        {formik.errors.username ? <p>{formik.errors.username}</p> : ''}
        <input name='email' onChange={formik.handleChange} onBlur={formik.handleBlur} defaultValue={userData.email}   type="text" />
        {formik.errors.email ? <p>{formik.errors.email}</p> : ''}

        <div className='center'><UploadWidget
          uwConfig={{
            cloudName: "dr9rrwxcl",
            uploadPreset: "estate-back",
            multiple: false,
            folder: "avatars",
          }}
          setAvatar={setAvatar}
        /></div>


       <button type='submit' className='updateuser'>{loading ? <BallTriangle
  height={50}
  width={50}
  radius={5}
  color="#4fa94d"
  ariaLabel="ball-triangle-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  /> : 'Update' }</button>
    </form>

    {/* <h3 className='avatar'>{avatar ? <img src={avatar} alt="" /> : <img className='avt' src={avt} alt="" />}</h3> */}

    

    
  </div>
  
  
  </>
}
