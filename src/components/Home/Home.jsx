import React from 'react'
import './Home.scss'
import bg from '../../../public/bg.png'
import Searchbar from '../Searchbar/Searchbar'
export default function Home() {

   
  return <>

  <div className='home'>
    <div className='text'>
        <div className='wrapper'>
        <h1 className="title">Find Real Estate & Get Your Dream Place</h1>
        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
            explicabo suscipit cum eius, iure est nulla animi consequatur
            facilis id pariatur fugit quos laudantium temporibus dolor ea
            repellat provident impedit!
          </p>
         
          <Searchbar/>

          <div className='box'>
            <div className='item'>
                <h3>16+</h3>
                <p>Years of experince</p>
            </div>
            <div className='item'>
                <h3>200</h3>
                <p>Aard Gained</p>
            </div>
            <div className='item'>
                <h3>1200+</h3>
                <p>Property Ready</p>
            </div>
          </div>
        </div>
        
    </div>
    <div className='image'>
    <img src={bg} alt="" />
    </div>
  </div>


  
  
  </>
}
