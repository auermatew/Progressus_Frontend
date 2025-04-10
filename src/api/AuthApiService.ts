import apiService from './apiService.ts';
import { User } from '../schema/user';

class AuthApiService {
  static subUrl: string = "/auth";

  public static async login(credentials: { username: string; password: string }): Promise<User> {
    const response = await apiService.post(`${AuthApiService.subUrl}/login`, credentials);
    const data = response.data;

    if (response.status !== 200) {
      throw new Error("Login failed");
    }

    return data as User;
  }

  public static async getUser(): Promise<User> {
    const response = await apiService.get(`${AuthApiService.subUrl}/me`);
    const data = response.data;

    if (response.status !== 200) {
      throw new Error("Error fetching user data");
    }

    return data as User;
  }

  public static async logout(): Promise<void> {
    await apiService.post(`${AuthApiService.subUrl}/logout`);
  }
}

export default AuthApiService;
