import axios from "axios";
 const intergrate = axios.create({
     baseURL:`${import.meta.env.VITE_BACKEND_URL}/api`,
     headers: {
         "Content-Type": "application/json",
     },
 });

 export default intergrate;