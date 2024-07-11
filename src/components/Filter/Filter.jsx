import React, { useContext, useEffect, useState } from 'react'
import './Filter.scss'
import search from '../../../public/search.png'
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { postContext } from '../../context/postContext';

export default function Filter() {
  const [searchParams,setSearchParams] = useSearchParams();

  const [city, setcity] = useState(searchParams.get('city') || '');
  const [type, settype] = useState(searchParams.get('type') || '');
  const [property, setproperty] = useState(searchParams.get('property') || '');
  const [minPrice, setminPrice] = useState(searchParams.get('minPrice') || 0);
  const [maxPrice, setmaxPrice] = useState(searchParams.get('maxPrice') || 11000000);
  const [bedroom, setbedroom] = useState(searchParams.get('bedroom') || 0);

  let{posts,setPosts}=useContext(postContext)

  useEffect(()=>{
    filterPosts(city , type , property , minPrice , maxPrice , bedroom)

  },[city , type , property , minPrice , maxPrice , bedroom])


  
  


  async function filterPosts(city , type , property , minPrice , maxPrice , bedroom){
   try {
   
    const {data}= await axios.get(`https://back-estate-production.up.railway.app/api/posts?city=${city}&type=${type}&minPrice=${minPrice}&maxPrice=${maxPrice}&bedroom=${bedroom}&property=${property}`,{
      headers:{
        token:localStorage.getItem('token')
      }
    })
    console.log(data)
    setPosts(data.data)
    
    console.log(posts)
   
    
   
    
   } catch (error) {
    
    console.log(error)
   }

  }


 
  return <>
  

 <div className='filter'>
 <p>Search result for</p>


<label className='' htmlFor="location">Location</label>
<input onChange={(e)=>{
  setcity(e.target.value)

}} className='location' type="text" name='location' placeholder='City Location' />

<div className='inputes'>
  <div className='item'>
       <label htmlFor="type">type</label>
      <select onChange={(e)=>{
  settype(e.target.value)

}} name="type" id="">
      <option value="">any</option>
            <option value="buy">Buy</option>
            <option value="rent">Rent</option>
       </select>
   </div>
   <div className='item'>
       <label htmlFor="productiv">producty</label>
      <select onChange={(e)=>{
  setproperty(e.target.value)

}} name="type" id="">
      <option value="">any</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="condo">Condo</option>
            <option value="land">Land</option>
       </select>
   </div>
   <div className='item'>
   <label htmlFor="minprice">minprice</label>
   <input onChange={(e)=>{
  setminPrice(e.target.value)

}} placeholder='any' type="text" name="minprice"  id="" />
   </div>
   <div className='item'>
   <label htmlFor="maxprice">maxprice</label>
   <input onChange={(e)=>{
  setmaxPrice(e.target.value)

}} placeholder='any' type="text" name="maxprice"  id="" />
   </div>
   <div className='item'>
   <label htmlFor="bedroom">bedroom</label>
   <input onChange={(e)=>{
  setbedroom(e.target.value)

}} placeholder='any' type="text" name="bedroom"  id="" />     </div>
  
   <button on onClick={()=>{
    setSearchParams({city,type,property,minPrice,maxPrice,bedroom})
    filterPosts(city , type , property , minPrice , maxPrice , bedroom)
   }}>
          <img src={search} alt="" />
      </button>


  
</div>
 </div> 
   
  
  </>
}
