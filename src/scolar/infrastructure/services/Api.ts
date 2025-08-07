import { API_URL } from "@/lib/api";
import axios from "axios";

const schoolapi = axios.create({
    baseURL: API_URL + "/",
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
    },
});;


export default schoolapi;