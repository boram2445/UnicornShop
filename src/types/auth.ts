export type JoinPost = {
  username: string;
  password: string;
  password2: string;
  phone_number: string;
  name: string;
  email?: string;
  company_registration_number?: string;
  store_name?: string;
};

export type LoginPost = {
  username: string;
  password: string;
  login_type: string;
};

export type UserType = "BUYER" | "SELLER";
