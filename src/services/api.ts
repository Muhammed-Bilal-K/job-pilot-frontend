import axios from "axios";

const Api = axios.create({
    baseURL: 'http://localhost:3000'
});

const Api2 = axios.create({
    baseURL : 'http://localhost:3001'
})

const Api3 = axios.create({
    baseURL : 'http://localhost:3002'
})

export {Api , Api2 , Api3}


//time out, axios interceptor, cancel tokens. 