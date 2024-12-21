export interface AuthState {
  token: string | null;
  user: UserData | null;
  isAuthenticated: boolean;
}

export interface UserData {
  _id: string;
  email: string;
  role: number;
  createdAt: string;
  updatedAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: UserData;
    token: string;
  };
  token: string;
  user: UserData;
}