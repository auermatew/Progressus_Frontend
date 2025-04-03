import axios from "axios";

const BASE_URL = "http://localhost:8080/api";

export const fetchData = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
};
