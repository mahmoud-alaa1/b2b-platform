
declare interface IOrder {
  categoryId: string | number; 
  contactPersonName: string;
  contactPersonPhone: string;
  deadline: Date | string; 
  description: string;
  numSuppliersDesired: number | string; 
  quantity: number | string; 
  requiredLocation: string;
}