import React, { useEffect, useState, } from 'react'
import Header from './../common/Header';
import Footer from './../common/Footer';
import { apiUrl } from './http';
import { CategoryContext } from '../Context/CategoryContext';
// 1. Create the Context object
// export const CategoryContext = createContext();
const Layout = ({children}) => {

   const [category,setCategory]=useState([]);
    const getCategoryries=()=>{
        fetch(apiUrl+`/get-category`,{
            method:'GET',
            headers:{
                'Accept':'applicaton/json',
                'Content-type':'applicaton/json',
            }
        }).then(res=>res.json()).then(result=>{
            console.log(result)
            if(result.status==200){
                setCategory(result.data);
            }else{
                // 
            }
        })
    }
    useEffect(()=>{
        getCategoryries();
    },[])

  return (
    // <>
    //   <Header category={category} />
    //   {children}
    //   <Footer />
    // </>

    <CategoryContext.Provider value={category}>
        <Header category={category} />
        <main>
            {children} 
        </main>
        <Footer category={category} />
    </CategoryContext.Provider>
  )
}

export default Layout
