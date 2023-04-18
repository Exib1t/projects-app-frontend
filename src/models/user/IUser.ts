export interface IUser {
  _id?: string;
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password?: string;
  _v?: number;
}

export interface IUserSelect {
  id: number;
  fullName: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserRegister {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}
