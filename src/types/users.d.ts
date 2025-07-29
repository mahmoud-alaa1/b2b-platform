declare interface IUser {
  userId: number;
  companyName: string;
  email: string;
  role: "client" | "jobber" | "supplier";
  createdAt: string;
  categoryNames: string[];
  joinDate: string;
}

declare interface IPendingUser {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  logoURL: string;
  pdfURL: string;
  categories: string[];
}
