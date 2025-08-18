interface ISuppliersFilters {
  search?: string;
  planName?: string;
  status?: string;
  page?: number | string;
  pageSize?: number | string;
  sortColumn?: string;
  sortOrder?: "Asc" | "Desc";
}

interface ISupplier {
  id: 75;
  companyName: string;
  email: string;
  categoryNames: string[];
  phoneNumber: string;
  logoUrl: string;
  locations: string[];
  planName: string;
  joinDate: string;
}
