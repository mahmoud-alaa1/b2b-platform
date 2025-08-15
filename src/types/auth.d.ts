declare interface IUser {
  id: string | number;
  email: string;
  name: string;
  role: 'Admin' | 'Suppliers' | 'Clients' | 'JobSeeker';
}

interface ILoginResponse {
  user: IUser;
  token: string;
}
interface IForgotPasswordResponse {
  message: string;
}


declare interface IRefreshResponse {
  accessToken: string;
}

interface IRegisterResponse {
  message: string;
}