import React, { useContext, useEffect, useState } from 'react'
import './profile.scss'
import avt from '../../../public/avt.webp'
import { Link } from 'react-router-dom'

import { auth } from '../../context/authContext'
import { postContext } from '../../context/postContext'
import axios from 'axios'

export default function Profile() {


  let{userData}=useContext(auth)

    

    const newData= JSON.parse(localStorage.getItem('userdata'))
    // console.log(newData)

    const {avatar,setAvatar}=useContext(auth)
    // let{posts}=useContext(postContext)
    let[posts,setPosts]=useState([])
    let[saveposts,setsavePosts]=useState([])
    // console.log(posts)

    useEffect(()=>{
      getPosts ()
      savepost()
    },[])

    async function getPosts (){
      let {data}=await axios.get('https://back-estate-production.up.railway.app/api/posts',
        {
          headers:{
            token:localStorage.getItem('token')
          }
        }
      )
      // console.log(data.data)
      setPosts(data.data)

    }

    async function savepost(){
      let{data}=await axios.get('https://back-estate-production.up.railway.app/api/users/save',
      {
        headers:{
          token:localStorage.getItem('token')
        }
      })
      //  console.log(data)
      setsavePosts(data.data)
    }
    

      // console.log(saveposts)
    
  return <>

  <div className='profile'>
    <div className='info'>
        <div className='info-cont'>
            <h2>User Information</h2>
            <div className='cont'>
                <h3 className='avatar'>Avatar :{userData.avatar ? <img src={userData.avatar} alt="" /> : <img className='avt' src={avt} alt="" />} </h3>
              
          
          
                <h3>UserName : <span>{userData.username}</span></h3>
                <h3>Email : <span>{userData.email}</span></h3>
            </div>
        </div>
        <Link to='/profile/update'>
        <button className='update'>Update </button>
        </Link>
        <Link to='/profile/add'>
        <button className='update'>Add Post</button>
        </Link>
    </div>

    <div className='posts-save'>
    <div className='posts'>
      <h3>Posts</h3>
      {posts ? posts.map((ele)=>{
        return <div className='item'>
          <div className='image'>
          {ele.images[0] ?<img className='pic' src={ele.images[0]} alt="" /> : <img className='picavt' src='avt.webp' alt="" /> }
          
          </div>
          <div className='data'>
            <h3>{ele.title}</h3>
            <p className="address">
          <img className='pen' src="/pin.png" alt="" />
          <span>{ele.address}</span>
        </p>
       
        <p className="price">$ {ele.price}</p>
        <div className="feature">
              <img className='bed' src="/bed.png" alt="" />
              <span>{ele.bedroom} bedroom</span>
            </div>
            <div className="feature">
              <img src="/bath.png" alt="" />
              <span>{ele.bathroom} bathroom</span>
            </div>
            
          </div>

        </div>
      }): <h1>No Posts</h1>}
    </div>
    <div className='savepost'>
    <h3>Save Posts</h3>
    {saveposts ? saveposts.map((ele)=>{
        return <div className='item'>
          <div className='image'>
            {ele.post.images[0] ?<img className='pic' src={ele.post.images[0]} alt="" /> : <img className='picavt' src='avt.webp' alt="" /> }
            
          </div>
          <div className='data'>
            <h3>{ele.post.title}</h3>
            <p className="address">
          <img src="/pin.png" alt="" />
          <span>{ele.post.address}</span>
        </p>
       
        <p className="price">$ {ele.post.price}</p>
        <div className="feature">
              <img src="/bed.png" alt="" />
              <span>{ele.post.bedroom} bedroom</span>
            </div>
            <div className="feature">
              <img src="/bath.png" alt="" />
              <span>{ele.post.bathroom} bathroom</span>
            </div>
            
          </div>

        </div>
      }): <h1>No Posts</h1>}
    </div>
   
    
    </div>
  </div>
  
  
  </>
}
