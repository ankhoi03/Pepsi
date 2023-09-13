export interface CurrentUser {
  name: string;
  phone: string;
  password: string;
}

export interface AuthState {
  currentUser: CurrentUser;
  isLogin: boolean;
}
