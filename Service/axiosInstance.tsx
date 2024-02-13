import axios from "axios";

export const axiosInstance=axios.create({
    baseURL:"https://compsheets-admin.dedicateddevelopers.us/api"
})