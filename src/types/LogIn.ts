export interface UserLogInInfo {
  userId: string;
  userPw: string;
}

export interface UserLogInError {
  userId: string;
  userPw: string;
}

export interface SignInResponseDto {
  token: string;
  exprTime: number;
}

export interface UserAuthData {
  id: number;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: number;
  userBusinessNumber: number;
  privacyPolicyAgreed: boolean;
  marketingAgreed: boolean;
}