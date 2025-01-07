/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { Errors, UserSignUpInfo } from "../../../types";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  Collapse,
  Typography,
} from "@mui/material";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneAndroidOutlinedIcon from "@mui/icons-material/PhoneAndroidOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import * as css from "./Style";
import axios from "axios";
import { MAIN_PATH } from "../../../constants";

function SignUp() {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };
  const [userSignUpInfo, setUserSignUpInfo] = useState<UserSignUpInfo>({
    userId: "",
    userPw: "",
    checkPw: "",
    userName: "",
    userEmail: "",
    userPhone: "",
    userBusinessNumber: "",
    privacyPolicyAgreed: false,
    marketingAgreed: false,
  });

  const [errorsMsg, setErrorsMsg] = useState<Errors>({
    userId: "",
    userPw: "",
    checkPw: "",
    userName: "",
    userEmail: "",
    userPhone: "",
    userBusinessNumber: "",
    form: "",
  });

  const [successMsg, setSuccessMsg] = useState({
    userId: "",
    checkPw: "",
    userBusinessNumber: "",
    userEmail: "",
  });

  const [slideState, setSlideState] = useState({
    privacyPolicyAgreed: false,
    marketingAgreed: false,
  });

  const [passwordStrength, setPasswordStrength] = useState<string>("");

  const getPasswordStrength = (password: string) => {
    const length = password.length;
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*]/.test(password);
    const specialCharCount = (password.match(/[!@#$%^&*]/g) || []).length;

    if (length >= 10 && hasLowercase && hasNumber && hasSpecialChar) {
      if (length >= 10 && length < 12) return "Weak";
      if (length >= 13) return "Medium";
      if (length >= 15 && specialCharCount >= 2 && hasUppercase)
        return "Strong";
    }
    return "";
  };

  const userIdDuplicationCheck = async () => {
    const userIdRegex = /^(?=.*[a-z])(?=.*\d)[a-z\d]{4,20}$/;
    if (!userIdRegex.test(userSignUpInfo.userId)) {
      return;
    } else {
      try {
        const response = await axios.post(
          `http://localhost:4041/api/v1/auth/signUp/search/userId`,
          { userId: userSignUpInfo.userId }
        );
        if (response.data.data.duplicatedStatus) {
          setSuccessMsg((prev) => ({
            ...prev,
            userId: "사용 가능한 아이디 입니다.",
          }));
        } else {
          setErrorsMsg((prev) => ({
            ...prev,
            userId: "이미 사용 중인 아이디입니다.",
          }));
        }
      } catch (error) {
        setErrorsMsg((prev) => ({
          ...prev,
          form: `${error}`,
        }));
      }
    }
  };

  const userEmailDuplicationCheck = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    setSuccessMsg((prev) => ({ 
      ...prev,
      userEmail: "" 
    })); 
    setErrorsMsg((prev) => 
      ({ ...prev, 
        userEmail: "",
        form: "",
    }));

    if (!emailRegex.test(userSignUpInfo.userEmail)) {
      setErrorsMsg((prev) => ({
        ...prev,
        userEmail: "유효한 이메일 주소를 입력해 주세요.",
      }));
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:4041/api/v1/auth/signUp/search/userEmail`,
        { userEmail: userSignUpInfo.userEmail }
      );
      if (response.data.data.duplicatedStatus) {
        setSuccessMsg((prev) => ({
          ...prev,
          userEmail: "사용 가능한 이메일입니다.",
        }));
      } else {
        setErrorsMsg((prev) => ({
          ...prev,
          userEmail: "이미 사용 중인 이메일입니다.",
        }));
      }
    } catch (error) {
      setErrorsMsg((prev) => ({
        ...prev,
        form: `${error}`,
      }));
    }
  };

  const userBusinessNumberDuplicationCheck = async () => {
    const businessNumberRegex = /^\d{10}$/;
    if (!businessNumberRegex.test(userSignUpInfo.userBusinessNumber)) {
      return;
    }
    try {
      const response = await axios.post(
        `http://localhost:4041/api/v1/auth/signUp/search/userBusinessNumber`,
        { userBusinessNumber: userSignUpInfo.userBusinessNumber }
      );
      if (response.data.data.duplicatedStatus) {
        setSuccessMsg((prev) => ({
          ...prev,
          userBusinessNumber: "사용 가능한 사업자 번호입니다.",
        }));
      } else {
        setErrorsMsg((prev) => ({
          ...prev,
          userBusinessNumber: "이미 사용 중인 사업자 번호입니다.",
        }));
      }
    } catch (error) {
      setErrorsMsg((prev) => ({
        ...prev,
        form: `${error}`,
      }));
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;

    setUserSignUpInfo((prev) => ({
      ...prev,
      [name]: value,
    }));

    let errorMsg = "";
    setSuccessMsg((prev) => ({
      ...prev,
      userId: "",
      userBusinessNumber: "",
    }));

    if (name === "userPw") {
      const strength = getPasswordStrength(value);
      setPasswordStrength(strength);
    }

    if (name === "userEmail") {
      setSuccessMsg((prev) => ({
        ...prev,
        userEmail: "",
      }));
      setErrorsMsg((prev) => ({
        ...prev,
        userEmail: "",
      }));
    }

    switch (name) {
      case "userId":
        const userIdRegex = /^(?=.*[a-z])(?=.*\d)[a-z\d]{4,20}$/;
        if (!userIdRegex.test(value)) {
          errorMsg = "영문과 숫자를 조합하여 4 ~ 20자 사이로 입력해주세요.";
        }
        break;
      case "userPw":
        const passwordRegex =
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[^\s]{10,}$/;
        if (!passwordRegex.test(value)) {
          errorMsg =
            "비밀번호는 영문자, 숫자, 특수문자 포함 10자 이상 입력해주세요.";
        }
        break;
      case "checkPw":
        if (value !== userSignUpInfo.userPw) {
          errorMsg = "비밀번호가 일치하지 않습니다.";
        } else if (value === userSignUpInfo.userPw) {
          setSuccessMsg((prev) => ({
            ...prev,
            checkPw: "비밀번호가 일치합니다.",
          }));
          setErrorsMsg((prev) => ({
            ...prev,
            [name]: "",
          }));
        }
        break;
      case "userName":
        const nameRegex = /^[가-힣]+$/;
        if (!nameRegex.test(value)) {
          errorMsg = "이름은 한글로 입력해주세요.";
        }
        break;
      case "userEmail":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          errorMsg = "유효한 이메일 주소를 입력해주세요.";
        }
        break;
      case "userPhone":
        const phoneRegex = /^\d{10,11}$/;
        if (!phoneRegex.test(value)) {
          errorMsg = "유효한 휴대폰 번호를 입력해주세요. (10~11자리)";
        }
        break;
      case "userBusinessNumber":
        const businessNumberRegex = /^\d{10}$/;
        if (!businessNumberRegex.test(value)) {
          errorMsg = "사업자 번호는 10자리 숫자로 입력해주세요.";
        }
        break;
      case "privacyPolicyAgreed":
        const privacyPolicyAgreementRegex = /^(true|false)$/;
        if (!privacyPolicyAgreementRegex.test(value)) {
          errorMsg = "개인정보 동의에 유효한 값을 넣어주세요.";
        }
        break;
      case "marketingAgreed":
        const marketingAgreedRegex = /^(true|false)$/;
        if (!marketingAgreedRegex.test(value)) {
          errorMsg = "마케팅 동의에 유효한 값을 넣어주세요.";
        }
        break;
      default:
        break;
    }

    setErrorsMsg((prev) => ({
      ...prev,
      [name]: errorMsg,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setUserSignUpInfo((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleSlideToggle = (
    item: "privacyPolicyAgreed" | "marketingAgreed"
  ) => {
    setSlideState((prev) => ({
      ...prev,
      [item]: !prev[item],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const hasErrors =
      Object.entries(errorsMsg).some(
        ([key, msg]) => key !== "form" && msg !== ""
      ) || !userSignUpInfo.privacyPolicyAgreed;
    if (hasErrors) {
      setErrorsMsg((prev) => ({ ...prev, form: "Errors in errorText" }));
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:4041/api/v1/auth/signUp`,
        userSignUpInfo
      );
      if (response.data.data) {
        alert("회원가입에 성공했습니다.");
        navigate(MAIN_PATH);
      } else {
        setErrorsMsg((prev) => ({ ...prev, form: "회원가입에 실패했습니다." }));
      }
    } catch (error) {
      setErrorsMsg((prev) => ({ ...prev, form: "서버 오류가 발생했습니다." }));
    }
    return;
  };
  return (
    <>
      <div css={css.container}>
        <h2 css={css.signUpTitle}>회원가입</h2>
        <div css={css.formContainer}>
          <Box component="form" css={css.formBox}>
            {/* 아이디 */}
            <Box css={css.gridRow}>
              <div css={css.gridLabel}>아이디</div>
              <Box css={css.inputBox}>
                <TextField
                  placeholder="아이디"
                  type="text"
                  name="userId"
                  variant="outlined"
                  value={userSignUpInfo.userId}
                  onChange={handleInputChange}
                  error={!!errorsMsg?.userId}
                  helperText={
                    userSignUpInfo.userId &&
                    (successMsg.userId || errorsMsg?.userId) ? (
                      <div
                        css={[
                          css.gridHelper,
                          errorsMsg.userId
                            ? { color: "#f44336" } 
                            : { color: "#43b9fd" },
                        ]}
                      >
                        {successMsg.userId || errorsMsg?.userId}
                      </div>
                    ) : null
                  }
                  autoComplete="아이디를 입력해주세요"
                  css={css.customInputStyle}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <PermIdentityIcon />
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              </Box>
              <Button
                onClick={userIdDuplicationCheck}
                variant="outlined"
                css={css.duplicatedBtn}
              >
                중복 확인
              </Button>
            </Box>

            {/* 비밀번호 */}
            <Box css={css.gridRow}>
              <div css={css.gridLabel}>비밀번호</div>
              <TextField
                placeholder="비밀번호"
                type="password"
                name="userPw"
                variant="outlined"
                value={userSignUpInfo.userPw}
                onChange={handleInputChange}
                error={!!errorsMsg?.userPw}
                helperText={
                  userSignUpInfo.userPw && errorsMsg?.userPw ? (
                    <div css={[
                      css.gridHelper,
                      { color: "#f44336"}
                    ]}>{errorsMsg?.userPw}</div>
                  ) : null
                }
                css={css.customInputStyle}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <VpnKeyOutlinedIcon />
                      </InputAdornment>
                    ),
                  },
                }}
              />
              {userSignUpInfo.userPw && <div>{passwordStrength}</div>}
            </Box>

            {/* 비밀번호 확인 */}
            <Box css={css.gridRow}>
              <div css={css.gridLabel}>비밀번호 확인</div>
              <TextField
                placeholder="비밀번호 확인"
                type="password"
                name="checkPw"
                variant="outlined"
                value={userSignUpInfo.checkPw}
                onChange={handleInputChange}
                error={!!errorsMsg?.checkPw}
                helperText={
                  userSignUpInfo.checkPw &&
                  (userSignUpInfo.userPw === userSignUpInfo.checkPw
                    ? successMsg.checkPw
                    : errorsMsg?.checkPw) ? (
                      <div
                        css={[
                          css.gridHelper,
                          errorsMsg.checkPw
                            ? { color: "#f44336" } 
                            : { color: "#43b9fd" },
                        ]}
                      >
                      {" "}
                      {userSignUpInfo.userPw === userSignUpInfo.checkPw
                        ? successMsg.checkPw
                        : errorsMsg?.checkPw}{" "}
                    </div>
                  ) : null
                }
                css={css.customInputStyle}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <VpnKeyOutlinedIcon />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Box>

            {/* 이름 */}
            <Box css={css.gridRow}>
              <div css={css.gridLabel}>이름</div>
              <TextField
                placeholder="이름"
                type="text"
                name="userName"
                variant="outlined"
                value={userSignUpInfo.userName}
                onChange={handleInputChange}
                error={!!errorsMsg?.userName}
                helperText={
                  userSignUpInfo.userName && errorsMsg?.userName ? (
                    <div css={[
                      css.gridHelper,
                      { color: "#f44336"}
                    ]}>{errorsMsg?.userName}</div>
                  ) : null
                }
                css={css.customInputStyle}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <PermIdentityIcon />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Box>

            {/* 이메일 */}
            <Box css={css.gridRow}>
              <div css={css.gridLabel}>이메일</div>
              <Box css={css.inputBox} >
                <TextField
                  placeholder="이메일"
                  type="email"
                  name="userEmail"
                  variant="outlined"
                  value={userSignUpInfo.userEmail}
                  onChange={handleInputChange}
                  error={!!errorsMsg?.userEmail}
                  helperText={
                    userSignUpInfo.userEmail && (errorsMsg.userEmail || successMsg.userEmail) ? (
                      <div
                        css={[
                          css.gridHelper,
                          errorsMsg.userEmail
                            ? { color: "#f44336" }
                            : { color: "#43b9fd" },
                        ]}
                      >
                        {errorsMsg.userEmail || successMsg.userEmail}
                      </div>
                    ) : null
                  }
                  css={css.customInputStyle}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailOutlinedIcon />
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              </Box>
              <Button
                onClick={userEmailDuplicationCheck}
                variant="outlined"
                css={css.duplicatedBtn}
              >
                중복 확인
              </Button>
            </Box>

            {/* 핸드폰 번호 */}
            <Box css={css.gridRow}>
              <div css={css.gridLabel}>핸드폰 번호</div>
              <TextField
                placeholder="핸드폰 번호( - 제외하고 입력)"
                type="text"
                name="userPhone"
                variant="outlined"
                value={userSignUpInfo.userPhone}
                onChange={handleInputChange}
                error={!!errorsMsg?.userPhone}
                helperText={
                  userSignUpInfo.userPhone && errorsMsg?.userPhone ? (
                    <div css={[
                      css.gridHelper,
                      { color: "#f44336"}
                    ]}> {errorsMsg?.userPhone} </div>
                  ) : null
                }
                css={css.customInputStyle}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneAndroidOutlinedIcon />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Box>

            {/* 사업자등록번호 */}
            <Box css={css.gridRow}>
              <div css={css.gridLabel}>사업자등록번호</div>
              <Box css={css.inputBox}>
                <TextField
                  placeholder="사업자 번호( - 제외하고 입력)"
                  type="text"
                  name="userBusinessNumber"
                  variant="outlined"
                  value={userSignUpInfo.userBusinessNumber}
                  onChange={handleInputChange}
                  error={!!errorsMsg?.userBusinessNumber}
                  helperText={
                    userSignUpInfo.userBusinessNumber &&
                    (successMsg.userBusinessNumber ||
                      errorsMsg?.userBusinessNumber) ? (
                        <div
                        css={[
                          css.gridHelper,
                          errorsMsg.userBusinessNumber
                            ? { color: "#f44336" } 
                            : { color: "#43b9fd" },
                        ]}
                      >
                        {successMsg.userBusinessNumber ||
                          errorsMsg?.userBusinessNumber}
                      </div>
                    ) : null
                  }
                  css={css.customInputStyle}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <StorefrontOutlinedIcon />
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              </Box>
              <Button
                onClick={userBusinessNumberDuplicationCheck}
                variant="outlined"
                css={css.duplicatedBtn}
              >
                중복 확인
              </Button>
            </Box>

            {/* 개인정보 동의 */}
            <Box css={css.gridRow}>
              <div css={css.gridLabel}>개인정보 동의</div>
              <FormControlLabel
                control={
                  <Checkbox
                    name="privacyPolicyAgreed"
                    checked={userSignUpInfo.privacyPolicyAgreed}
                    onChange={handleCheckboxChange}
                  />
                }
                label="개인정보 동의"
                sx={{
                  "& .MuiFormControlLabel-label": {
                    fontSize: "15px",
                    color: "#464545",
                  },
                }}
              />
              <KeyboardArrowDownOutlinedIcon
                onClick={() => handleSlideToggle("privacyPolicyAgreed")}
              />
              <Collapse in={slideState.privacyPolicyAgreed}>
                <Box css={css.agreed}>
                  넣기
                </Box>
              </Collapse>
            </Box>

            {/* 마케팅 동의 */}
            <Box css={css.gridRow}>
              <div css={css.gridLabel}>마케팅 동의</div>
              <FormControlLabel
                control={
                  <Checkbox
                    name="marketingAgreed"
                    checked={userSignUpInfo.marketingAgreed}
                    onChange={handleCheckboxChange}
                  />
                }
                label="마케팅 수신동의"
                sx={{
                  "& .MuiFormControlLabel-label": {
                    fontSize: "15px",
                    color: "#464545",
                  },
                }}
              />
              <KeyboardArrowDownOutlinedIcon
                onClick={() => handleSlideToggle("marketingAgreed")}
              />
              <Collapse in={slideState.marketingAgreed}>
                <Box css={css.agreed}>된다~~</Box>
              </Collapse>
            </Box>

            {/* 버튼 */}
            <Box css={css.submitButton}>
              <Button
                type="submit"
                onClick={handleSubmit}
                variant="contained"
                color="primary"
              >
                가입하기
              </Button>
              <Button variant="outlined" onClick={handleGoBack}>
                뒤로가기
              </Button>
            </Box>
          </Box>
        </div>
      </div>
    </>
  );
}

export default SignUp;
