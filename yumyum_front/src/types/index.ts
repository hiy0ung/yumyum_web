export interface UserSignUpInfo {
  userId: string; // 아이디
  userPw: string; // 비밀번호
  checkPw: string; // 비밀번호 확인
  userName : string; // 이름
  userEmail : string; // 이메일
  userPhone : string; // 휴대폰 번호
  userBusinessNumber : string; // 사업자 번호
  privacyPolicyAgreed : boolean; // 개인정보 동의 / 비동의
  marketingAgreed : boolean; // 마케팅 수신 동의 / 비동의
}

export interface Errors {
  userId: string; // 아이디
  userPw: string; // 비밀번호
  checkPw: string; // 비밀번호 확인
  userName : string; // 이름
  userEmail : string; // 이메일
  userPhone : string; // 휴대폰 번호
  userBusinessNumber : string; // 사업자 번호
  form?: string; // 전체 폼 오류 메세지 (ex 서버 오류 등)
}

