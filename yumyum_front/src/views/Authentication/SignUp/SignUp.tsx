/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { Errors, UserSignUpInfo } from "../../../types";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Checkbox,
  InputAdornment,
  Typography,
  Modal,
} from "@mui/material";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneAndroidOutlinedIcon from "@mui/icons-material/PhoneAndroidOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import * as css from "./Style";
import axios from "axios";
import { MAIN_PATH } from "../../../constants";
import { PasswordStrength } from "../../../types/SignUp";

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

  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>({
    strength: "",
    color: "",
    emoji: "",
  });

  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState<boolean>(false);

  const [isMarketingModalOpen, setIsMarketingModalOpen] = useState<boolean>(false);

  const getPasswordStrength = (password: string) => {
    const length = password.length;
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*]/.test(password);

    let strength = "";
    let color = "#9e9e9e";
    let emoji = "";

    if (length >= 10 && hasLowercase && hasNumber && hasSpecialChar) {
      if (length >= 10 && length < 12) {
        strength = "약함";
        color = "#f44336"
        emoji = "😥";
      } else if (length >= 13 && !hasUppercase) {
        strength = "보통";
        color = "#ff9800";
        emoji = "😐";
      } else if (length >= 15 && hasUppercase) {
        strength = "강함";
        color = "#4caf50";
        emoji = "💪";
      }
    }
    return { strength, color, emoji };
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
      userEmail: "",
    }));
    setErrorsMsg((prev) => ({ ...prev, userEmail: "", form: "" }));

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

  const PrivacyPolicyAgreedModal = ({
    open,
    onClose,
  }: {
    open: boolean;
    onClose: () => void;
  }) => {
    return (
      <Modal open={open} onClose={onClose} aria-labelledby="modal-title">
        <Box
          css={css.modalBoxStyle}>
          <Typography
            id="modal-title"
            variant="h6"
            component="h2"
            css={css.modalTitle}
          >
            개인정보 동의 내용
          </Typography>
          <Typography 
            variant="body2" 
            css={css.modalText}
          >
            여기에 개인정보 동의에 대한 자세한 내용을 입력하세요. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit. Proin ac metus nec
            purus volutpat commodo.
          </Typography>
          <Button
            onClick={onClose}
            variant="contained"
            css={css.modalCloseBtn}
          >
            닫기
          </Button>
        </Box>
      </Modal>
    );
  };

  const MarketingAgreedModal = ({
    open,
    onClose,
  }: {
    open: boolean;
    onClose: () => void;
  }) => {
    return (
      <Modal open={open} onClose={onClose} aria-labelledby="modal-title">
        <Box
          css={css.modalBoxStyle}>
          <Typography
            id="modal-title"
            variant="h6"
            component="h2"
            css={css.modalTitle}
          >
            마케팅 수신 동의
          </Typography>
          <Typography 
            variant="body2" 
            css={css.modalText}
          >
            마케팅 수신 동의 항목에 대해서 어쩌고 추가
          </Typography>
          <Button
            onClick={onClose}
            variant="contained"
            css={css.modalCloseBtn}
          >
            닫기
          </Button>
        </Box>
      </Modal>
    );
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
      const { strength, color, emoji } = getPasswordStrength(value);
    setPasswordStrength({ strength, color, emoji });
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

  const handlePrivacyModalOpen = () => {
    setIsPrivacyModalOpen(true);
  };

  const handlePrivacyModalClose = () => {
    setIsPrivacyModalOpen(false);
  };

  const handleMarketingModalOpen = () => {
    setIsMarketingModalOpen(true);
  };

  const handleMarketingModalClose = () => {
    setIsMarketingModalOpen(false);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setUserSignUpInfo((prev) => ({
      ...prev,
      [name]: checked,
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
              <div css={css.gridLabel}>
                <span>아이디</span>
                <span style={{ color: "#f44336" }}> *</span> 
              </div>
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
              <div css={css.gridLabel}>
                <span>비밀번호</span>
                <span style={{ color: "#f44336" }}> *</span> 
                </div>
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
                    <div css={[css.gridHelper, { color: "#f44336" }]}>
                      {errorsMsg?.userPw}
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
              <div css={css.passwordStrength}>
                <span>{passwordStrength.emoji}</span>
                <span 
                  style={{
                    color: passwordStrength.color,
                    marginLeft: "10px",
                }}>
                  {passwordStrength.strength}</span>
              </div>
            </Box>

            {/* 비밀번호 확인 */}
            <Box css={css.gridRow}>
              <div css={css.gridLabel}>
                <span>비밀번호 확인</span>
                <span style={{ color: "#f44336" }}> *</span> 
              </div>
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
              <div css={css.gridLabel}>
                <span>이름</span>
                <span style={{ color: "#f44336" }}> *</span> 
              </div>
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
                    <div css={[css.gridHelper, { color: "#f44336" }]}>
                      {errorsMsg?.userName}
                    </div>
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
              <div css={css.gridLabel}>
                <span>이메일</span>
                <span style={{ color: "#f44336" }}> *</span> 
              </div>
              <Box css={css.inputBox}>
                <TextField
                  placeholder="이메일"
                  type="email"
                  name="userEmail"
                  variant="outlined"
                  value={userSignUpInfo.userEmail}
                  onChange={handleInputChange}
                  error={!!errorsMsg?.userEmail}
                  helperText={
                    userSignUpInfo.userEmail &&
                    (errorsMsg.userEmail || successMsg.userEmail) ? (
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
              <div css={css.gridLabel}>
                <span>핸드폰 번호</span>
                <span style={{ color: "#f44336" }}> *</span> 
              </div>
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
                    <div css={[css.gridHelper, { color: "#f44336" }]}>
                      {" "}
                      {errorsMsg?.userPhone}{" "}
                    </div>
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
              <div css={css.gridLabel}>
                <span>사업자 번호</span>
                <span style={{ color: "#f44336" }}> *</span> 
              </div>
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
              <div css={css.gridLabel}>
                <span>개인정보 이용 동의</span>
                <span style={{ color: "#f44336" }}> *</span> 
              </div>
              <TextField
                value={
                  userSignUpInfo.privacyPolicyAgreed
                    ? "동의함"
                    : "동의하지 않음"
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Checkbox
                        name="privacyPolicyAgreed"
                        checked={userSignUpInfo.privacyPolicyAgreed}
                        onChange={handleCheckboxChange}
                      />
                    </InputAdornment>
                  ),
                }}
                slotProps={{
                  input: {
                    startAdornment: userSignUpInfo.privacyPolicyAgreed ? (
                      <InputAdornment position="start">
                        <CheckCircleOutlineIcon />
                      </InputAdornment>
                    ) : (
                      <InputAdornment position="start">
                        <PanoramaFishEyeIcon />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <Checkbox
                          name="privacyPolicyAgreed"
                          checked={userSignUpInfo.privacyPolicyAgreed}
                          onChange={handleCheckboxChange}
                        />
                      </InputAdornment>
                    ),
                  },
                }}
                variant="outlined"
                css={css.customInputStyle}
              />
              <Button
                variant="text"
                onClick={handlePrivacyModalOpen}
                css={css.modalOpenBtn}
              >
                자세히 보기
              </Button>
              <PrivacyPolicyAgreedModal open={isPrivacyModalOpen} onClose={handlePrivacyModalClose} />
            </Box>

            {/* 마케팅 동의 */}
            <Box css={css.gridRow}>
              <div css={css.gridLabel}>
                <span>마케팅 수신 동의</span>
              </div>
              <TextField
                value={
                  userSignUpInfo.marketingAgreed ? "동의함" : "동의하지 않음"
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Checkbox
                        name="marketingAgreed"
                        checked={userSignUpInfo.marketingAgreed}
                        onChange={handleCheckboxChange}
                      />
                    </InputAdornment>
                  ),
                }}
                slotProps={{
                  input: {
                    startAdornment: userSignUpInfo.marketingAgreed ? (
                      <InputAdornment position="start">
                        <CheckCircleOutlineIcon />
                      </InputAdornment>
                    ) : (
                      <InputAdornment position="start">
                        <PanoramaFishEyeIcon />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <Checkbox
                          name="marketingAgreed"
                          checked={userSignUpInfo.marketingAgreed}
                          onChange={handleCheckboxChange}
                        />
                      </InputAdornment>
                    ),
                  },
                }}
                variant="outlined"
                css={css.customInputStyle}
              />
              <Button
                variant="text"
                onClick={handleMarketingModalOpen}
                css={css.modalOpenBtn}
              >
                자세히 보기
              </Button>
              <MarketingAgreedModal open={isMarketingModalOpen} onClose={handleMarketingModalClose} />
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