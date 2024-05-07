import axios from "axios";

const Api = axios.create({ baseURL:"https://jobpilot.dev" });

export { Api };