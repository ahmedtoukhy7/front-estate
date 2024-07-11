import React, { useContext, useEffect, useState } from 'react'
import Slider from '../Slider/Slider'
import './SinglePage.scss'
import { singlePostData } from '../../lib/data'
import Map from '../Map/Map'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { postContext } from '../../context/postContext'
import { auth } from '../../context/authContext'


export default function SinglePage() {
  let {id}=useParams()
  let{posts,setPosts}=useContext(postContext)
  let {userData}= useContext(auth)

  
  

 


  const [post,setPost]=useState(null)
  const[save,setSave]=useState(localStorage.getItem('save'))
  console.log(post)
  console.log(userData)

  useEffect(()=>{
    getPost(id)
  },[])

  
  console.log(id)

  async function getPost(id){
   try {
    const {data}= await axios.get(`https://back-estate-production.up.railway.app/api/posts/${id}`,{
      headers:{
        token:localStorage.getItem('token')
      }
    })
    console.log(data)
    setPost(data)
    
   } catch (error) {
    console.log(error)
   }
  }

  //saved
 // console.log(save)
  console.log(post?.isSave)

  async function savesPost(){
   try {
    let {data}= await axios.post('https://back-estate-production.up.railway.app/api/users/save',{
     
      userId:userData.id,
      postId:post?.id,

    },{
      headers:{
        token:localStorage.getItem('token')
      }
    })
    if(data.message=='Post saved'){

      post.isSave=true
      localStorage.setItem('save',post?.isSave)
      setSave(post.isSave)
    }
   


    if(data.message=='Post removed from saved list'){
      post.isSave=false
      setSave(post?.isSave)
      localStorage.setItem('save',post.isSave)
    }

  



    console.log(post)

    console.log(data)
    
   } catch (error) {
    console.log(error)
    
    
   }
  }

  console.log(post?.isSave)

  const saveStorage= localStorage.getItem('save')




console.log(saveStorage)


  return <>

  <div className='single'>
    <div className='left'>
      

      <Slider post={post}/>

      <div className='text'>
       <div className='cont'>
       <div className='left-text'>
       <h2>{post?.title}</h2>
        <div className="address">
                  <img src="/pin.png" alt="" />
                  <span>{post?.city}</span>
        </div>
        <p className='price'>{post?.price}</p>
       </div>
       <div className='user'>
       <img src={post?.user.avatar} alt="" />
                <h5>{post?.user.username}</h5>
       </div>
       </div>
          <p>{post?.postDetail.desc}</p>
      </div>
  
    </div>
    <div className="features">
        <div className="wrapper">
          <p className="title">{post?.title}</p>
          <div className="listVertical">
            <div className="feature">
              <img src="/utility.png" alt="" />
              <div className="featureText">
                <span>Utilities</span>
                <p>{post?.postDetail.utilities}</p>
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>Pet Policy</span>
                <p>{post?.postDetail.pet}</p>
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Property Fees</span>
                <p>{post?.postDetail.income}</p>
              </div>
            </div>
          </div>
          <p className="title">Sizes</p>
          <div className="sizes">
            <div className="size">
              <img src="/size.png" alt="" />
              <span>{post?.postDetail.size} sqft</span>
            </div>
            <div className="size">
              <img src="/bed.png" alt="" />
              <span>{post?.bedroom} beds</span>
            </div>
            <div className="size">
              <img src="/bath.png" alt="" />
              <span>{post?.bathroom} bathroom</span>
            </div>
          </div>
          <p className="title">Nearby Places</p>
          <div className="listHorizontal">
            <div className="feature">
              <img src="/school.png" alt="" />
              <div className="featureText">
                <span>School</span>
                <p>{post?.postDetail.school}m away</p>
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>Bus Stop</span>
                <p>{post?.postDetail.bus}m away</p>
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Restaurant</span>
                <p>{post?.postDetail.restaurant}m away</p>
              </div>
            </div>
          </div>
          <p className="title">Location</p>
          <div className="mapContainer">
            <Map items = {[post]}  />
          </div>
          <div className="buttons">
            <button>
              <img src="/chat.png" alt="" />
              Send a Message
            </button>
            <button className={saveStorage=='true' ? 'save' : ''} onClick={()=>{
              savesPost()
            }}>
              <img src="/save.png" alt="" />
              Save the Place
            </button>
          </div>
        </div>
      </div>
  </div>
  
  </>
}
