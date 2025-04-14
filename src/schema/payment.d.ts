import { User } from './user';
export interface Transaction {
  id: number;
  billingDetails: BillingDetails;
  date: string;
  lessonReservation: LessonReservation | null;
}

export interface BillingDetails {
  id: number;
  user: User;
  address_city: string;
  address_zip: string;
  address_street: string;
  address_country: string;
}

export interface LessonReservation {
  id: number;
  topic: string;
  studentName: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
}