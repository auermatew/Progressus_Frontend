import apiService from './apiService';
import { BillingDetails } from '../schema/payment';

export class PaymentApiService {
  static subUrl: string = "/billing-details";

  public static async create(data: BillingDetails): Promise<BillingDetails> {
    const response = await apiService.post(`${this.subUrl}/create`, data);
    if (response.status !== 200) throw new Error("Error creating billing details");
    return response.data as BillingDetails;
  }

  public static async getForCurrentUser(): Promise<BillingDetails> {
    const response = await apiService.get(`${this.subUrl}/user`);
    if (response.status !== 200) throw new Error("Error fetching billing details");
    return response.data as BillingDetails;
  }

  public static async getByUserId(userId: number): Promise<BillingDetails> {
    const response = await apiService.get(`${this.subUrl}/${userId}`);
    if (response.status !== 200) throw new Error("Error fetching billing details by userId");
    return response.data as BillingDetails;
  }
}
