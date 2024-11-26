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
} from "@mui/material";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneAndroidOutlinedIcon from "@mui/icons-material/PhoneAndroidOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import * as css from "./Styles";
import axios from "axios";

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
  });

  const [slideState, setSlideState] = useState({
    privacyPolicyAgreed: false,
    marketingAgreed: false,
  });

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

    switch (name) {
      case "userId":
        const userIdRegex = /^(?=.*[a-z])(?=.*\d)[a-z\d]{4,20}$/;
        if (!userIdRegex.test(value)) {
          errorMsg = "영문과 숫자를 조합하여 4 ~ 20자 사이로 입력해주세요.";
        }
        break;
      case "userPw":
        const passwordRegex =
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[^\s]{8,15}$/;
        if (!passwordRegex.test(value)) {
          errorMsg =
            "비밀번호는 영문자, 숫자, 특수문자를 포함하여 10자 이상 입력해주세요.";
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
    Object.entries(errorsMsg).some(([key, msg]) => key !== "form" && msg !== "") ||
    userSignUpInfo.privacyPolicyAgreed === false;
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
        navigate("/logIn");
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
      <h2 css={css.signUpTitle}>회원가입</h2>
      <Box css={css.formStyle} component="form">
        <Box
          css={css.duplicatedContainer}
          sx={{
            "&:nth-of-type(1)": {
              marginBottom:
                errorsMsg.userId || successMsg.userId ? "40px" : "20px",
            },
          }}
        >
          <TextField
            label="아아디"
            type="text"
            name="userId"
            variant="outlined"
            value={userSignUpInfo.userId}
            onChange={handleInputChange}
            error={!!errorsMsg?.userId}
            helperText={
              successMsg.userId ? successMsg?.userId : errorsMsg?.userId
            }
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
          <Button onClick={userIdDuplicationCheck} variant="outlined">
            중복 확인
          </Button>
        </Box>
        <TextField
          label="비밀번호"
          type="password"
          name="userPw"
          variant="outlined"
          value={userSignUpInfo.userPw}
          onChange={handleInputChange}
          error={!!errorsMsg?.userPw}
          helperText={errorsMsg?.userPw}
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
        <TextField
          label="비밀번호 확인"
          type="password"
          name="checkPw"
          variant="outlined"
          value={userSignUpInfo.checkPw}
          onChange={handleInputChange}
          error={!!errorsMsg?.checkPw}
          helperText={
            userSignUpInfo.userPw === userSignUpInfo.checkPw
              ? successMsg.checkPw
              : errorsMsg?.checkPw
          }
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
        <TextField
          label="이름"
          type="text"
          name="userName"
          variant="outlined"
          value={userSignUpInfo.userName}
          onChange={handleInputChange}
          error={!!errorsMsg?.userName}
          helperText={errorsMsg?.userName}
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
        <TextField
          label="이메일"
          type="email"
          name="userEmail"
          variant="outlined"
          value={userSignUpInfo.userEmail}
          onChange={handleInputChange}
          error={!!errorsMsg?.userEmail}
          helperText={errorsMsg?.userEmail}
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
        <TextField
          label="핸드폰 번호( - 제외하고 입력)"
          type="text"
          name="userPhone"
          variant="outlined"
          value={userSignUpInfo.userPhone}
          onChange={handleInputChange}
          error={!!errorsMsg?.userPhone}
          helperText={errorsMsg?.userPhone}
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
        <Box css={css.duplicatedContainer}>
          <TextField
            label="사업자 번호( - 제외하고 입력)"
            type="text"
            name="userBusinessNumber"
            variant="outlined"
            value={userSignUpInfo.userBusinessNumber}
            onChange={handleInputChange}
            error={!!errorsMsg?.userBusinessNumber}
            helperText={
              successMsg.userBusinessNumber
                ? successMsg.userBusinessNumber
                : errorsMsg?.userBusinessNumber
            }
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
          <Button
            onClick={userBusinessNumberDuplicationCheck}
            variant="outlined"
          >
            중복 확인
          </Button>
        </Box>
        <Box
          sx={{
            "&": {
              marginTop:
                errorsMsg.userBusinessNumber || successMsg.userBusinessNumber
                  ? "18px"
                  : "0px",
            },
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                name="privacyPolicyAgreed"
                checked={userSignUpInfo.privacyPolicyAgreed}
                onChange={handleCheckboxChange}
              />
            }
            label="개인정보 동의"
          />
          <KeyboardArrowDownOutlinedIcon
            onClick={() => handleSlideToggle("privacyPolicyAgreed")}
          />
        </Box>
        <Collapse in={slideState.privacyPolicyAgreed}>
          <Box css={css.agreed}>적어~</Box>
        </Collapse>

        <Box>
          <FormControlLabel
            control={
              <Checkbox
                sx={{
                  fontSize: 200,
                }}
                name="marketingAgreed"
                checked={userSignUpInfo.marketingAgreed}
                onChange={handleCheckboxChange}
              />
            }
            label="마케팅 수신동의"
          />
          <KeyboardArrowDownOutlinedIcon
            onClick={() => handleSlideToggle("marketingAgreed")}
          />
        </Box>
        <Collapse in={slideState.marketingAgreed}>
          <Box css={css.agreed}>된다~~</Box>
        </Collapse>

        <Box>
          <Button
            css={css.submitButton}
            type="submit"
            onClick={handleSubmit}
            variant="contained"
            color="primary"
          >
            가입하기
          </Button>
          <Button
            css={css.submitButton}
            variant="outlined"
            onClick={handleGoBack}
          >
            뒤로가기
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default SignUp;
