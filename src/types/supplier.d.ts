declare interface ISupplierInfo {
  id: number | string;
  name: string;
  email: string;
  phoneNumber: string;
  logoUrl: string;
  description: string;
  locations: (string | null)[];
  countOfOrderAccepted: number;
  categories: string[];
  averageRating: number;
  productCount: number;
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

// interface for supplier Product and reviews
declare interface ISupplierProductsAndReviews {
  products: ISupplierProducts[];
  allReviews: ISupplierReviews[];
  companyName: string;
}

export interface ISupplierProducts {
  id: number;
  name: string;
  price: number;
  description: string;
  companyName: string;
  productImageURl: string;
  offer: number;
  isSpecial: boolean;
}

declare interface ISupplierReviews {
  reviewerName: string;
  rating: number;
  comment: string;
}
