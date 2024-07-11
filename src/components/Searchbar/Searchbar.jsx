import React, { useContext, useEffect, useState } from 'react'
import './Searchbar.scss'
import search from '../../../public/search.png'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { postContext } from '../../context/postContext'
export default function Searchbar() {

    const btn = ['buy', 'rent']

    const [black,setBlack]=useState('buy')
    const [city, setCity] = useState('');
    const [minPrice, setminPrice] = useState('');
    const [maxPrice, setmaxPrice] = useState('');
    

    
    // console.log(minPrice)
    // console.log(typeof(maxPrice))
    console.log(black)
    let nav=useNavigate()
    let{posts,setPosts,setCityy,cityy}=useContext(postContext)
    console.log(cityy)

    async function postsFilter(city,black,minPrice,maxPrice){
    try {
      const {data}= await axios.get(`https://back-estate-production.up.railway.app/api/posts?city=${city}&type=${black}&minPrice=${minPrice}&maxPrice=${maxPrice}`,{
        headers:{
          token:localStorage.getItem('token')
        }
      })

      console.log(data)
      if(data.message=='success'){
        setPosts(data.data)

        nav(`/list?city=${city}&type=${black}&minPrice=${parseInt(minPrice)}&maxPrice=${Number(maxPrice)}`)

      }
    } catch (error) {
      console.log(error)
    }
    }

    // useEffect(()=>{
    //   postsFilter()
    // },[])
  return <>
<div className='search'>
<div className='btn '>
           {btn.map((ele,inx)=> (
            <button  onClick={
              ()=>setBlack(ele)
              
            } className={black==ele? 'butns black' : 'butns'} key={inx}>{ele}</button>
           ))}
          </div>

     <form>
        <input  onChange={(e)=>{
            setCity(e.target.value)
            setCityy(e.target.value)
          }} on type="text" name="location" placeholder="City Location" />
        <input
          type="number"
          name="minPrice"
          min={0}
          max={10000000}
          placeholder="Min Price"
          onChange={(e)=>{
            setminPrice(e.target.value)
          }}
        />
        <input
          type="number"
          name="maxPrice"
          min={0}
          max={10000000}
          placeholder="Max Price"
          onChange={(e)=>{
            setmaxPrice(e.target.value)
          }}
        />

        <Link onClick={()=>{
          postsFilter(city,black,parseInt(minPrice),parseInt(maxPrice))
        }} >
        <button>
          <img className='searchbtn' src={search} alt="" />
        </button>

        </Link>
       
      </form>
</div>
  </>
}
