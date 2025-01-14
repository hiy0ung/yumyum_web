/** @jsxImportSource @emotion/react */
import { Box } from "@mui/system";
import * as css from "./Style";
import React, {useEffect, useRef, useState} from "react";
import DaumPostcode from "react-daum-postcode";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  TextField,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { StoreInfo } from "../../../types/Store";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { STORE_PATH } from "../../../constants";
import useStoreImage from "../../../Store/storeImg.store";
import defaultImage from "../../../img/default_Profile_Img.webp";
import useScrollTop from "../../../hooks/useScrollTop";

export default function Store() {
  const navigate = useNavigate();
  const [cookies] = useCookies(["token"]);
  const [img, setImg] = useState<File | null>(null);
  const [imgPreview, setImgPreview] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [base64, setBase64] = useState<string | null>();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [zoneCode, setZoneCode] = useState("");
  const [address, setAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [openPostcode, setOpenPostcode] = useState(false);
  const {setStoreImg} = useStoreImage();
  const [store, setStore] = useState<StoreInfo>({
    storeName: "",
    logoUrl: null,
    category: "",
    openingTime: "",
    closingTime: "",
    breakStartTime: "",
    breakEndTime: "",
    zoneCode: "",
    address: "",
    detailAddress: "",
    description: "",
  });
  const scrollToTop = useScrollTop();

  useEffect(() => {
    scrollToTop();
  }, []);
  const clickButton = () => {
    setOpenPostcode((current) => !current);
  };

  const selectAddress = (data: any) => {
    setZoneCode(data.zonecode);
    setAddress(data.address);
    setOpenPostcode(false);
  };

  const defaultImg = defaultImage;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const IMAGE_MAX_SIZE = 10 * 1024 * 1024;

    if (file) {
      if (file.size > IMAGE_MAX_SIZE) {
        alert("업로드 가능한 최대 용량은 10MB입니다.");
        return;
      }
      
      setImg(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setBase64(reader.result as string);
        setImgPreview(reader.result as string);
      };
    } else {
      setImgPreview(defaultImg as string);
    }
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    setCategory(event.target.value);
    setStore({
      ...store,
      category: event.target.value,
    });
  };

  const handleTimeChange = (name: string, newTime: dayjs.Dayjs | null) => {
    if (newTime) {
      setStore({
        ...store,
        [name]: newTime.format("HH:mm"),
      });
    } else {
      setStore({
        ...store,
        [name]: "",
      });
    }
  };

  const handleStoreChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    setStore({
      ...store,
      [e.target.name]: e.target.value,
    });
  };

  const checkStoreInput = () => {
    const emptyFields: string[] = [];

    if (!store.storeName) emptyFields.push("가게명");
    if (!store.category) emptyFields.push("카테고리");
    if (!store.openingTime) emptyFields.push("오픈시간");
    if (!store.closingTime) emptyFields.push("마감시간");

    if (emptyFields.length > 0) {
      alert(`${emptyFields.join(",")}(이)가 비어있습니다. 모두 입력해 주세요.`);
      return false;
    } else {
      return true;
    }
  };

  const formData = new FormData();
  formData.append("storeName", store.storeName);
  formData.append("category", store.category);
  formData.append("openingTime", store.openingTime);
  formData.append("closingTime", store.closingTime);
  formData.append("breakStartTime", store.breakStartTime);
  formData.append("breakEndTime", store.breakEndTime);
  formData.append("zoneCode", zoneCode);
  formData.append("address", address);
  formData.append("detailAddress", detailAddress);
  formData.append("description", store.description);
  if (!base64) {
    formData.append("logoUrl", defaultImg);
  }else {
    formData.append("logoUrl", base64);
  }

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const token = cookies.token;
    if (!token) {
      alert("로그인 해주세요.");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:4041/api/v1/stores/create",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data) {
        alert("가게등록에 성공하였습니다.");
        const data = response.data.data;
        setStoreImg(data.logoUrl);
        navigate(STORE_PATH);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <h2 css={css.storeTitle}>가게등록</h2>
      <Box css={css.formStyle} component="form">
        <Box css={css.basicProfile}>
          <Box>
            {imgPreview ? (
              <img
                src={imgPreview || defaultImg}
                alt="logo"
                css={css.logoImg}
                onClick={handleImageClick}
              ></img>
            ) : (
              <input type="file" onClick={handleImageClick} name="img" />
            )}
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileChange}
              name="img"
              style={{ display: "none" }}
            />
          </Box>
          <Box css={css.storeNameAndCategory}>
            <TextField
              required
              id="outlined-required"
              label="가게명"
              name="storeName"
              value={store.storeName}
              onChange={handleStoreChange}
            />
            <FormControl css={css.category}>
              <InputLabel id="category-select-label">카테고리*</InputLabel>
              <Select
                labelId="category-select-label"
                id="category-select"
                value={category}
                label="카테고리*"
                onChange={handleCategoryChange}
              >
                <MenuItem value="치킨">치킨</MenuItem>
                <MenuItem value="피자">피자</MenuItem>
                <MenuItem value="패스트푸드">패스트푸드</MenuItem>
                <MenuItem value="분식">분식</MenuItem>
                <MenuItem value="한식">한식</MenuItem>
                <MenuItem value="양식">양식</MenuItem>
                <MenuItem value="중식">중식</MenuItem>
                <MenuItem value="아시안">아시안</MenuItem>
                <MenuItem value="돈까스_회">돈까스/회</MenuItem>
                <MenuItem value="찜_탕">찜/탕</MenuItem>
                <MenuItem value="족발_보쌈">족빌/보쌈</MenuItem>
                <MenuItem value="고기">고기</MenuItem>
                <MenuItem value="야식">야식</MenuItem>
                <MenuItem value="도시락">도시락</MenuItem>
                <MenuItem value="카페_디저트">카페/디저트</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Box css={css.storeTime}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              label="오픈 시간 *"
              name="opningTime"
              value={
                store.openingTime ? dayjs(store.openingTime, "HH:mm") : null
              }
              onChange={(newTime) => handleTimeChange("openingTime", newTime)}
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              label="마감 시간 *"
              name="closingTime"
              value={
                store.closingTime ? dayjs(store.closingTime, "HH:mm") : null
              }
              onChange={(newTime) => handleTimeChange("closingTime", newTime)}
            />
          </LocalizationProvider>
        </Box>
        <Box css={css.storeTime}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              label="브레이크 시간"
              name="breakStartTime"
              value={
                store.breakStartTime
                  ? dayjs(store.breakStartTime, "HH:mm")
                  : null
              }
              onChange={(newTime) =>
                handleTimeChange("breakStartTime", newTime)
              }
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              label="브레이크 시간"
              name="breakEndTime"
              value={
                store.breakEndTime ? dayjs(store.breakEndTime, "HH:mm") : null
              }
              onChange={(newTime) => handleTimeChange("breakEndTime", newTime)}
            />
          </LocalizationProvider>
        </Box>
        <Box>
          <div>
            <tr>
              <td className="title" style={{paddingRight: '5px'}}>주소</td>
              <input
                id="address_kakao"
                onClick={clickButton}
                value={zoneCode}
              ></input>
              <div
                style={{
                  position: "relative",
                  display: "inline-block",
                }}
              >
                {openPostcode && (
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: "110%",
                      zIndex: 1000,
                      border: "1px solid #ccc",
                      background: "#fff",
                      boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                      width: "400px",
                    }}
                  >
                    <DaumPostcode
                      onComplete={selectAddress}
                      autoClose={false}
                      defaultQuery="판교역로 235"
                      style={{ height: "400px" }}
                    />
                  </div>
                )}
              </div>
            </tr>
            <Box
              sx={{
                margin: "20px 0px",
              }}
            >
              <tr>
                <td className="title" style={{paddingRight: '5px'}}>상세주소</td>
                <td>
                  <input value={address} style={{marginRight: '5px'}}></input>
                </td>
                <input
                  value={detailAddress}
                  onChange={(e) => {
                    setDetailAddress(e.target.value);
                  }}
                ></input>
              </tr>
            </Box>
          </div>
        </Box>
        <Box>
          <p style={{ fontSize: "20px", margin: "10px" }}>가게 설명</p>
          <textarea
            css={css.descriptionBox}
            value={store.description}
            name="description"
            onChange={handleStoreChange}
          ></textarea>
        </Box>
        <Button
          css={css.storeSubmitButton}
          onClick={(e) => {
            if (checkStoreInput()) {
              handleSubmit(e);
            }
          }}
        >
          가게 등록
        </Button>
      </Box>
    </>
  );
}
