import axios from "axios";

const Api = axios.create({
    baseURL: 'http://localhost:3000'
});

export {Api}


//time out, axios interceptor, cancel tokens. 