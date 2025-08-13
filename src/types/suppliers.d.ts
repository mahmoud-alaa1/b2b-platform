interface ISuppliersFilters {
    search?: string;
    planName?: string;
    status?: string;
    page?: number | string;
    pageSize?: number | string;
    sortColumn?: string;
    sortOrder?: 'Asc' | 'Desc';
}

interface ISupplier {
    userId: number | string,
    companyName: string,
    userName: string,
    role: "Suppliers",
    categoryNames: string[],
    joinDate: string,
    locations: string[],
    email: string,
    phoneNumber: string
}