export interface User {
  email: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  remember?: boolean;
}

export interface LoginRequestData {
  email: string;
  password: string;
}

export interface LoginResponse {
  email: string;
  token: string;
}

export interface LoginErrorResponse {
  error: string;
}
