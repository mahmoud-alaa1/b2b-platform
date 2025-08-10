declare interface supplierInfo {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  logoUrl: string;
  description: string;
  locations: (string | null)[];
  countOfOrderAccepted: number;
  categories: string[];
}
