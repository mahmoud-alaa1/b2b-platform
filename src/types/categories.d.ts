interface ICategory {
    categoryId: number,
    categoryName: string,
    numberOfAssociatedSuppliers: number,
    numberOfAssociatedClients: number,
    imageURL: string
}

interface ICategoryFilters {
    search?: string
    page?: number
    pageSize?: number
    sortColumn?: string
    sortColumnDirection?: 'Asc' | 'Desc'
}