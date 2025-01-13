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