import axios from "axios";

const GATEWAY_API = "https://12e1on8jwj.execute-api.us-east-1.amazonaws.com/prod/"

export default axios.create({
    baseURL: GATEWAY_API,
    headers: {
        "Content-type": "application/json"
    }
});