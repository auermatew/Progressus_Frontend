export interface Transaction {
  id: number;
  billingDetails: BillingDetails;
  date: string;
  lessonReservation: LessonReservation | null;
}

export interface BillingDetails {
  id: number;
  amount: number;
  currency: string;
}

export interface LessonReservation {
  id: number;
  topic: string;
  studentName: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
}