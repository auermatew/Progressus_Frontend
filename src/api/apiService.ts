import axios, { Axios } from "axios";

export const fetchData = async () => {
    try {
        const response = await apiService.get(`/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
};
const apiService: Axios = axios.create({
    baseURL: "http://localhost:8080/api",
    timeout: 1000,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
});

export default apiService;