/** @jsxImportSource @emotion/react */
import { Box } from "@mui/system";
import * as css from "./Style";
import React, { useState } from "react";
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

export default function Store() {
  const navigate = useNavigate();
  const [cookies, ,setCookies] = useCookies(['token']);

  const [img, setImg] = useState<File | null>(null);
  const [imgPreview, setImgPreview] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  const [store, setStore] = useState<StoreInfo>({
    storeName: "",
    logoUrl: null,
    category: "",
    openingTime: "",
    closingTime: "",
    breakStartTime: "",
    breakEndTime: "",
    address: "",
    description: "",
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImg(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setImgPreview(e.target?.result as string);
        }
      };
      reader.readAsDataURL(file);
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

  const checkStoreInput = () => {
    const emptyFields: string[] = [];

    if (!store.storeName) emptyFields.push("가게명");
    if (!img) emptyFields.push("가게 로고");
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

  const handleStoreChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    setStore({
      ...store,
      [e.target.name]: e.target.value,
    });
  };

  const formData = new FormData();
  formData.append("storeName", store.storeName);
  formData.append("category", store.category);
  formData.append("openingTime", store.openingTime);
  formData.append("closingTime", store.closingTime);
  formData.append("breakStartTime", store.breakStartTime);
  formData.append("breakEndTime", store.breakEndTime);
  formData.append("address", store.address);
  formData.append("description", store.description);
  if (img) {
    formData.append("logoUrl", img);
  }

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const token = cookies.token;
    if (!token) {
      alert("로그인 해주세요.");
      return;
    }
    console.log(store);
    const response = await axios.post(
      "http://localhost:4041/api/v1/stores/create",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (response.data) {
      alert("가게등록에 성공하였습니다.");
      navigate("/main");
    }
  };

  return (
    <>
      <h2 css={css.storeTitle}>가게등록</h2>
      <Box css={css.formStyle} component="form">
        <Box css={css.basicProfile}>
          <Box>
            {imgPreview && (
              <img src={imgPreview} alt="logo" css={css.logoImg}></img>
            )}
            <input type="file" onChange={handleFileChange} name="img" />
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
        <Box css={css.address}>
          <p style={{ fontSize: "20px", margin: "10px" }}>주소 API</p>
          <textarea
            value={store.address}
            name="address"
            onChange={handleStoreChange}
          ></textarea>
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
