import { createContext,useState } from "react";

export  const AdminAuthContext= createContext();

export const AdminAuthProvider=({children})=>{
    const adminInfo =localStorage.getItem('adminInfo');
    const [user, setUser]= useState(adminInfo);


    const login =(user)=>{
        setUser(user);
    }

    const Logout =()=>{
        localStorage.removeItem('adminInfo');
        setUser(null);
    }


    return  <AdminAuthContext.Provider  value={{
        user,
        login,
        Logout
        }}>
        {children}
    </AdminAuthContext.Provider>
}