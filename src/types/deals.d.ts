interface  ISupplierDeal {
  dealId: number | string;
  description: string;
  CompanyName: string;
  CompanyEmail: string;
  CompanyPhone: string;
  contactPersonName: string;
  contactPersonPhone: string;
  dealStatus: keyof typeof EDealStatus;
  OrderStatus: keyof typeof EOrderStatus;
}
