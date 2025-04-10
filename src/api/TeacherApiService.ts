import {Teacher} from "../schema/teacher";
import apiService from "./apiService";

export class TeacherApiService {
    static subUrl: string = "/teacher";
    public static async get(url: string = ""): Promise<Teacher[]> {
        const response = await apiService.get(`${TeacherApiService.subUrl + url}`);
        const data = response.data;
        if (response.status !== 200) {
            throw new Error("Error fetching data");
        }
        return data as Teacher[];
    }

    public static async post(data: Teacher): Promise<Teacher> {
        const response = await apiService.post(TeacherApiService.subUrl, data);
        const result = response.data;
        if (response.status !== 200) {
            throw new Error("Error fetching data");
        }
        return result as Teacher;
    }

    public static async delete(id: string = ""): Promise<Teacher> {
        const response = await apiService.delete(`${TeacherApiService.subUrl}/${id}`);
        const result = response.data;
        if (response.status !== 200) {
            throw new Error("Error fetching data");
        }
        return result as Teacher;
    }
}