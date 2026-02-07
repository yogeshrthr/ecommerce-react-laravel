export const apiUrl='http://localhost:8000/api';
export const adminToken = ()=>{
   return JSON.parse(localStorage.getItem('adminInfo')).token;
}
// http.jsx
export const userToken = () => {
    try {
        const user = JSON.parse(localStorage.getItem("userInfo") || "{}");
        return user.token || null;
    } catch (err) {
        console.error("Error reading token from localStorage", err);
        return null;
    }
};
