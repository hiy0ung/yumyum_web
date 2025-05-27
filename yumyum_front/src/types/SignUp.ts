export interface UserSignUpInfo {
  userId: string;
  userPw: string;
  checkPw: string;
  userName : string;
  userEmail : string;
  userPhone : string;
  userBusinessNumber : string;
  privacyPolicyAgreed : boolean;
  marketingAgreed : boolean;
  snsId: string | null;
  joinPath: string;
}

export interface Errors {
  userId: string;
  userPw: string;
  checkPw: string;
  userName : string;
  userEmail : string;
  userPhone : string;
  userBusinessNumber : string;
  form?: string;
}

export interface PasswordStrength {
  strength: string;
  color: string;
  emoji: string
}

export interface DuplicationStatus {
  userId: boolean;
  userEmail: boolean;
  userBusinessNumber: boolean;
}

export interface Success {
  userId: string;
  checkPw: string;
  userBusinessNumber: string;
  userEmail: string;
}