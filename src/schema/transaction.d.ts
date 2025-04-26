import { BillingDetails } from './billingDetails';
import { TeacherClassLesson } from './lesson';

export interface Transaction {
  id: number;
  billingDetails: BillingDetails;
  date: string;
  lesson: TeacherClassLesson;
}
