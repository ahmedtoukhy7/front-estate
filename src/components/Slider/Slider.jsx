import React, { useState } from 'react'

import './Slider.scss'
import { singlePostData } from '../../lib/data'


export default function Slider({post}) {

   
    
console.log(post?.images)
let images =[]

if(post !=null){

     images= post?.images
}
   

    const [indeximg,setindeximg]=useState(null)

    function changeImg(dir){
        if(dir=='left'){
            if(indeximg==0){
                setindeximg(images.length-1)
            }
            else{
                setindeximg(indeximg-1)
            }

        }
        else{
            if(indeximg ==images.length - 1){
                setindeximg(0)
            }
            else{
                setindeximg(indeximg + 1)
            }

        }

    }
    
  return <>

  {indeximg !=null ? <div className='bigSlider'>
    <div onClick={()=>changeImg('left')} className='arrow'>
    <img src="/arrow.png" alt="" />
    </div>
    <img className='centerimg' src={images[indeximg]} alt="" />
    <div  onClick={()=>changeImg('right')}  className='arrow'>
    <img className='rotate' src="/arrow.png" alt="" />
    </div>
    <h1 onClick={()=>{
        setindeximg(null)
    }} className='close'>X</h1>
   
    </div> : '' }
 
  <div className='slider'>
   
    <div className='big'>
        <img onClick={()=>{
            setindeximg(0)
        }} src={images[0]} alt="" />
    </div>
    <div className='small'>
        {images.slice(1).map((ele,inx)=> 
            <img key={inx}  onClick={()=>{
                setindeximg(inx+1)
            }} src ={ele}/>
        )}
    </div>

  </div>
  
  </>
}
