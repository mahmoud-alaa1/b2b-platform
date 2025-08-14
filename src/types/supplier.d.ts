declare interface ISupplierInfo {
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

interface IAccountInfoPatchResponse {
  id: number | string;
  description: string;
  locations: string[];
}

interface IAccountLogoPatchResponse {
  id: number | string;
  logoUrl: string | File | null | undefined;
}
