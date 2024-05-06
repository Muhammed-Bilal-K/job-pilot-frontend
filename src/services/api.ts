// import axios from "axios";

// const Api = axios.create({ baseURL: "http://localhost:3000" , timeout : 10000}); //auth

// const Api2 = axios.create({ baseURL: "http://localhost:3001" }); //employer

// Api2.interceptors.request.use(
//   function (config) {
//     const token = localStorage.getItem("Emplo");
//     config.headers.Authorization = token;
//     return config;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );

// const Api3 = axios.create({ baseURL: "http://localhost:3002" }); //job
// const Api4 = axios.create({ baseURL: "http://localhost:3004" }); //chat
// const Api5 = axios.create({ baseURL: "http://localhost:3003" }); //user

// Api5.interceptors.request.use(
//   function (config) {
//     const token = localStorage.getItem("Token");
//     config.headers.Authorization = token;
//     return config;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );

// export { Api, Api2, Api3 , Api4 , Api5};

import axios from "axios";

const Api = axios.create({ baseURL:"https://www.jobpilot.dev" });
const Api2 = ''
const Api3 = ''
const Api4 = ''
const Api5 = ''

export { Api, Api2, Api3, Api4, Api5};