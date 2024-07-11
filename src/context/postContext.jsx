import axios from "axios";
import { createContext, useState } from "react";


export const postContext=createContext()

export function PostContextProvider({children}){
    let [posts,setPosts]=useState([])
    let[cityy,setCityy]=useState('')

     async function getPosts(city , type , minPrice , maxPrice ){
        try {
        
         const {data}= await axios.get(`https://back-estate-production.up.railway.app/api/posts?city=${city}&type=${type}&minPrice=${minPrice}&maxPrice=${maxPrice}`)
         return data
        //  setPosts(data?.data)
         
    //    console.log(posts)
        
         
        
         
        } catch (error) {
         
         console.log(error)
        }
     
       }

    return <postContext.Provider value={{posts,setPosts,setCityy,cityy , getPosts}}>
        {children}
    </postContext.Provider>
}