import axios from "axios";

const Api = axios.create({ baseURL: "http://localhost:3000" , timeout : 10000}); //auth

// Api.interceptors.request.use(
//   function (config) {
//     const token = localStorage.getItem("token");
//     config.headers.Authorization = token;
//     return config;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );


const Api2 = axios.create({ baseURL: "http://localhost:3001" }); //employer
const Api3 = axios.create({ baseURL: "http://localhost:3002" }); //job
const Api4 = axios.create({ baseURL: "http://localhost:3004" }); //chat
const Api5 = axios.create({ baseURL: "http://localhost:3003" }); //user

export { Api, Api2, Api3 , Api4 , Api5};
