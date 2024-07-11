import axios from 'axios'
import { connect, useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { auth } from './../../context/authContext';
import './AddPost.scss'
import UploadWidget from '../UploadWidget/UploadWidget';
import { useNavigate } from 'react-router-dom';

export default  function AddPost() {

  let {userData}=useContext(auth)
  // console.log(userData.id)
  let nav =useNavigate()


  let[images,setImages]=useState([])

  const formik=useFormik({
    initialValues:{
        title:'',
        price:0,
        address  :  '',
        city     :  '',
        bedroom  :  0,
        bathroom :  0,
        latitude  : "",
        longitude : "",
        images:[],
        type     : "",
        property  : "",
        desc:'',
        utilities:'',
        pet:'',
        income:'',
        size:'',
        school:'',
        bus:'',
        restaurant:'',

            
    },
    onSubmit : addPost
})

    async function addPost (val){
      console.log(val)

      console.log(images)
           
             const{title,price,address,city,bedroom,bathroom,latitude,longitude,type,property,desc,utilities,pet,income,size,school,restaurant,bus}=val
         
      
          try {
           
            
        const {data}= await axios.post('https://back-estate-production.up.railway.app/api/posts',{

        postData:{
          title:title,
          price:Number(price),
          address:address,
          city:city,
          images:images,
          bedroom:Number(bedroom),
          bathroom:Number(bathroom),
          latitude:latitude,
          longitude:longitude,
          type:type,
          property:property,
          userId:userData.id,
        },
       
         
          postDetail:{
            desc:desc,
            utilities:utilities,
            pet:pet,
            income:income,
            size:Number(size),
            school:Number(school),
            bus:Number(bus),
            restaurant:Number(restaurant),

          }
        
          
        },{
          headers:{
            token:localStorage.getItem('token')
          
        }
        }
       )

            console.log(data)
            nav('/list')
            
          } catch (error) {
            console.log(error)
            
          }
    }

   
  return <>

 <div className='addpost'>
 <form  onSubmit={formik.handleSubmit} action="">
   <div className='postdata'>
   <input onChange={formik.handleChange} placeholder='title' name='title' type="text" />
    <input onChange={formik.handleChange} placeholder='price' name='price' type="number" />
    <input onChange={formik.handleChange} placeholder='address' name='address' type="text" />
    <input onChange={formik.handleChange} placeholder='city' name='city' type="text" />
    <input onChange={formik.handleChange} placeholder='bedroom num' name='bedroom' type="number" />
    <input onChange={formik.handleChange} placeholder='bathroom num' name='bathroom' type="number" />
    <input onChange={formik.handleChange} placeholder='latitude' name='latitude' type="text" />
    <input onChange={formik.handleChange} placeholder='longitude' name='longitude' type="text" />
    <input onChange={formik.handleChange} placeholder='utilities' name='utilities' type="text" />
    <input onChange={formik.handleChange} placeholder='pet' name='pet' type="text" />
    <input onChange={formik.handleChange} placeholder='income' name='income' type="text" />
    <input onChange={formik.handleChange} placeholder='size' name='size' type="number" />
    <input onChange={formik.handleChange} placeholder='school' name='school' type="number" />
    <input onChange={formik.handleChange} placeholder='bus' name='bus' type="number" />
    <input onChange={formik.handleChange} placeholder='restaurant' name='restaurant' type="number" />
    
   <select onChange={formik.handleChange} value={formik.values} name="type" id="">
    <option value="">any</option>
    <option value="buy">buy</option>
    <option value="rent">rent</option>
   </select>
   <select   onChange={formik.handleChange} value={formik.values} name="property" id="">
   
   <option value="">any</option>
   <option value="apartment">apartment</option>
    <option value="house">house</option>
    <option value="condo">condo</option>
    <option value="land">land</option>
 
   </select>
   <button className='addimg'>
   <UploadWidget  uwConfig={{
            cloudName: "dr9rrwxcl",
            uploadPreset: "estate-back",
            multiple: true,
           
            folder: "posts",
          }}
          setImages={setImages}/>
   </button>
   <textarea placeholder='Enter description' onChange={formik.handleChange} name="desc" id=""></textarea>

  

   
   
  
   </div>
  
    
    <button className='btn' type='submit'>Add Post</button>
 </form>

 </div>
  
  
  </>
}
