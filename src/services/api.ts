import axios from "axios";

const Api = axios.create({ baseURL:"https://www.recardo.store" });

export { Api };