import { createContext,useState } from "react";

export  const UserAuthContext= createContext();

export const UserAuthProvider=({children})=>{
    const userInfo =localStorage.getItem('userInfo');
    const [user, setUser]= useState(userInfo);


    const login =(user)=>{
        setUser(user);
    }
    const Logout =()=>{
        localStorage.removeItem('userInfo');
        setUser(null);
    }
    return  <UserAuthContext.Provider  value={{
        user,
        login,
        Logout
        }}>
        {children}
    </UserAuthContext.Provider>
}