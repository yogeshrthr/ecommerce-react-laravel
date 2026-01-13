export const apiUrl='http://localhost:8000/api';
export const adminToken = ()=>{
   return JSON.parse(localStorage.getItem('adminInfo')).token;

 
}