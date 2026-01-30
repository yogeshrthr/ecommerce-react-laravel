import { useContext } from "react"
import { UserAuthContext } from "./Context/UserAuth"
import {Navigate} from 'react-router-dom'

export const UserRequireAuth=({children})=>{
    const {user}=useContext(UserAuthContext)
    if(!user){
        return <Navigate to={`/login `}/>        
    }
    return children;

}