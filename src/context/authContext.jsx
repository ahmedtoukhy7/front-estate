import { createContext, useEffect, useState } from "react";

export const auth=createContext()


export function AuthContextProvier({children}){

    let [token,setToken]=useState(null)
    let [avatar,setAvatar]=useState('')
    let [userData,setUserData]=useState(
        JSON.parse(localStorage.getItem('userdata')) || null
    )

    const updateUser = (data) => {
        setUserData(data);
      };

    useEffect(()=>{
        if(localStorage.getItem('token')!=null){
            setToken(localStorage.getItem('token'))
        }
       

       
    },[])

    useEffect(()=>{
        localStorage.setItem('userdata',JSON.stringify(userData))
    },[userData])


    // console.log(userData)
   
    return <auth.Provider value={{token,setToken,setUserData,userData , updateUser ,avatar, setAvatar}}>
        {children}
    </auth.Provider>
}