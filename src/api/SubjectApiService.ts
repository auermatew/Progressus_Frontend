import apiService from './apiService';
import { Subject } from '../schema/subject';

export class SubjectApiService {
  static subUrl: string = "/subject";

  public static async getAll(): Promise<Subject[]> {
    const response = await apiService.get(SubjectApiService.subUrl);
    if (response.status !== 200) {
      throw new Error("Error fetching subjects");
    }
    return response.data as Subject[];
  }

  public static async getById(id: string): Promise<Subject> {
    const response = await apiService.get(`${SubjectApiService.subUrl}/${id}`);
    if (response.status !== 200) {
      throw new Error("Error fetching subject");
    }
    return response.data as Subject;
  }

  public static async create(data: { name: string; isVerified: boolean }): Promise<Subject> {
    const response = await apiService.post(SubjectApiService.subUrl, data);
    if (response.status !== 200) {
      throw new Error("Error creating subject");
    }
    return response.data as Subject;
  }

  public static async update(id: string, data: { name?: string; isVerified?: boolean }): Promise<Subject> {
    const response = await apiService.patch(`${SubjectApiService.subUrl}/${id}`, data);
    if (response.status !== 200) {
      throw new Error("Error updating subject");
    }
    return response.data as Subject;
  }

  public static async delete(id: string): Promise<void> {
    await apiService.delete(`${SubjectApiService.subUrl}/${id}`);
  }
}

export default SubjectApiService;