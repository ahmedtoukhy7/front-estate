import React, { useContext, useState } from 'react'
import './Navbar.scss'
import axios from 'axios'
import logo from '../../../public/logo.png'
import menu from '../../../public/menu.png'
import { auth } from '../../context/authContext'
import { Link } from 'react-router-dom'
export default function Navbar() {
  const [show,setShow]=useState(false)
  let{token,setToken,setUserData,userData,updateUser}=useContext(auth)


  const handleLogout =  ()=>{

    localStorage.removeItem('userdata')
    localStorage.removeItem('token')
    updateUser(null)
    setToken(null)
  
  }
  return <>



  <nav>
    <div className='left'>
     
      <div className='logo'>
        <Link className='logo'>
        <img src={logo} alt="logo" />
        <h3>RealEstate</h3>
        </Link>
     
      </div>
      <div className='links'>
        <ul>
          <li>
           <Link to='/'>
           <a href="">Home</a>
           </Link>
          </li>
          <li>
           <Link to='/about'>
           <a href="">About</a>
           </Link>
          </li>
          <li>
            <Link to='/list'>
          <a href="">ListPage</a>
            </Link>
 

          </li>
          <li>
          <a href="">Agent</a>
          </li>
         
        </ul>

      </div>
    </div>
    <div className='right'>

      {token ?  <>
      <Link to='profile'>
        <span className='signup'>Profile</span>
      </Link>
       <Link onClick={handleLogout} to='/login'>
       <span className='signup' >Logout</span>
       </Link>
        <span className='signup'>{userData ? userData.username : 'person'}</span>
      
      
      </>
: <>
 <Link to='/login'>
 <a href="">Sign in</a>
 </Link>
     <Link to='/register'>
     <a className='signup' href="">Sign up</a>
     </Link>
</> }
     
     
      <div onClick={()=>{
        setShow(true)
      }} className='menuicon'>
        <img src={menu} alt="menu" />
      </div>
      <div className={show ? 'sidebar active' : 'sidebar'}>

<h2 onClick={()=>setShow(false)}>X</h2>

  
          <Link to='/'>
           <a href="">Home</a>
           </Link>

 
           <Link to='/about'>
           <a href="">About</a>
           </Link>


    <a href="">ListPage</a>
 
    <a href="">Agent</a>
    <Link to='profile'>
        <a className='signup' href="">Profile</a>
      </Link>
       <Link onClick={handleLogout} to='/login'>
       <a className='signup' href="">Logout</a>
       </Link>
  

</div>
    </div>
  </nav>


  
  
  </>
}
