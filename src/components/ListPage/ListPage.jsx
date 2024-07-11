import React, { useContext, useEffect, useState } from 'react'
import Map from '../Map/Map'
import Filter from '../Filter/Filter'
import'./ListPage.scss'
import { listData } from '../../lib/data'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { postContext } from '../../context/postContext'
import { auth } from '../../context/authContext'

export default function ListPage() {

  let [postList,setPostList]=useState(null)

  let [loading,setLoading]=useState(false)

  let {posts}=useContext(postContext)
  let {userData}=useContext(auth)

  console.log(posts)
 

  

  
  
  

  // useEffect(()=>{
  //   allPosts()
    
  // },[])

  // async function allPosts(){
  //  try {
  //   setLoading(true)
  //   const {data}=await axios.get(`http://localhost:8800/api/posts?city=${city}&type=${black}&minPrice=${minPrice}&maxPrice=${maxPrice}&property=${}`)
  //   console.log(data)
  //   setPostList(data?.data)
  //   setLoading(false)
    
  //  } catch (error) {
  //   setLoading(false)
  //   console.log(error)
  //  }

  // }

  
  return <>

  <section className='list'>

    <div className='result'>

      <div className='wrapper'>
      <Filter/>

      <div className='dataList'>

        { posts.length!=0 ? posts.map((ele,inx)=> {
          if(posts.id==ele.id){
              newpost=ele

          }
            return <Link to={`/list/${ele.id}`}>
             <div key={inx}   className='item'>
        
          
              <div className='image'>
                <img className='image' src={ele.images[0] ? ele.images[0] : 'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' } alt="" />
                </div>   
              <div className='text'>
              <p className="title">
          <Link to={`/list/${ele.id}`}>{ele.title}</Link>
                </p>
        <p className="address">
          <img src="/pin.png" alt="" />
          <span>{ele.address}</span>
        </p>
       
        <p className="price">$ {ele.price}</p>

      
        <div className="bottom">
          <div className="features">
            <div className="feature">
              <img src="/bed.png" alt="" />
              <span>{ele.bedroom} bedroom</span>
            </div>
            <div className="feature">
              <img src="/bath.png" alt="" />
              <span>{ele.bathroom} bathroom</span>
            </div>
          </div>
          <div  className="icons save">
           
            <div className="icon">
              <img src="/chat.png" alt="" />
            </div>
          </div>
          </div>
        </div>   
        </div>
        </Link>
           
        
              
       }
        ) : <div className='nopost'>No Posts Yet !
        <Link to='/profile/add'>
        <button className='update'>Add Post</button>
        </Link>
        </div>
        }
      
      </div>


      </div>


    </div>

   <div className='map'>
   
   <Map items ={posts}/>

  
   </div>


  </section>
  
  
  </>
}
