/** @jsxImportSource @emotion/react */
import { Box } from "@mui/system";
import * as css from "./Style";
import React, { useEffect, useRef, useState } from "react";
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

export default function Store() {
  const navigate = useNavigate();
  const [cookies] = useCookies(["token"]);
  const token = cookies.token;
  const [category, setCategory] = useState<string>("");
  const [imageData, setImgData] = useState<string>();
  const [base64, setBase64] = useState<string | null>();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [store, setStore] = useState<StoreInfo>({
    storeName: "",
    logoUrl: "",
    category: "",
    openingTime: "",
    closingTime: "",
    breakStartTime: "",
    breakEndTime: "",
    address: "",
    description: "",
  });

  const [updateStore, setUpdateStore] = useState<StoreInfo>({
    storeName: "",
    logoUrl: "",
    category: "",
    openingTime: "",
    closingTime: "",
    breakStartTime: "",
    breakEndTime: "",
    address: "",
    description: "",
  });

  const fetchStore = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4041/api/v1/stores/get",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data) {
        const data = response.data.data;
        setStore(data);
        setUpdateStore(data);
        setImgData(data.logoUrl);
        setCategory(data.category);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchStore();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setBase64(reader.result as string);
      };
    }
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    setCategory(event.target.value);
    setUpdateStore({
      ...store,
      category: event.target.value,
    });
  };

  const handleTimeChange = (name: string, newTime: dayjs.Dayjs | null) => {
    if (newTime) {
      setUpdateStore({
        ...updateStore,
        [name]: newTime.format("HH:mm"),
      });
    } else {
      setUpdateStore({
        ...updateStore,
        [name]: "",
      });
    }
  };

  const handleStoreChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    setUpdateStore({
      ...updateStore,
      [e.target.name]: e.target.value,
    });
  };

  const checkStoreInput = () => {
    const emptyFields: string[] = [];

    if (!store.storeName) emptyFields.push("가게명");
    if (!store.logoUrl) emptyFields.push("가게 로고");
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

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const formData = new FormData();
    const fields = [
      "storeName",
      "category",
      "openingTime",
      "closingTime",
      "breakStartTime",
      "breakEndTime",
      "address",
      "description",
    ];

    fields.forEach((field) => {
      const newValue = updateStore[field as keyof StoreInfo];
      const oldValue = store[field as keyof StoreInfo];
      const valueToAppend = newValue || oldValue || "";
      formData.append(field, valueToAppend);
    });

    if(base64) {
      formData.append("logoUrl", base64);
    }else if(imageData){
      formData.append("logoUrl", imageData);
    } else {
      alert("이미지는 jpg 또는 jpeg로 선택해주세요");
      return;
    }

    if (!token) {
      alert("로그인 해주세요.");
      return;
    }
    try {
      const response = await axios.put(
        "http://localhost:4041/api/v1/stores/update",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data) {
        alert("가게수정에 성공하였습니다.");
        navigate(STORE_PATH);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <h2 css={css.storeTitle}>가게수정</h2>
      <Box css={css.formStyle} component="form">
        <Box css={css.basicProfile}>
          <Box>
            {
              base64 ? (
                <img src={base64} alt="profile" css={css.logoImg} onClick={handleImageClick}></img>
              ) : (<img src={imageData} alt="profile" style={{maxHeight: "200px"}} onClick={handleImageClick} css={css.logoImg}></img>)
            }
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
              value={updateStore.storeName}
              defaultValue={store.storeName}
              onChange={handleStoreChange}
            />
            <FormControl css={css.category}>
              <InputLabel id="category-select-label">카테고리*</InputLabel>
              <Select
                labelId="category-select-label"
                id="category-select"
                value={category}
                defaultValue={store.category}
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
              name="openingTime"
              value={
                updateStore.openingTime
                  ? dayjs(updateStore.openingTime, "HH:mm")
                  : null
              }
              defaultValue={dayjs(store.openingTime)}
              onChange={(newTime) => handleTimeChange("openingTime", newTime)}
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              label="마감 시간 *"
              name="closingTime"
              value={
                store.closingTime
                  ? dayjs(updateStore.closingTime, "HH:mm")
                  : null
              }
              defaultValue={dayjs(store.closingTime)}
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
                updateStore.breakStartTime
                  ? dayjs(updateStore.breakStartTime, "HH:mm")
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
                updateStore.breakEndTime
                  ? dayjs(updateStore.breakEndTime, "HH:mm")
                  : null
              }
              onChange={(newTime) => handleTimeChange("breakEndTime", newTime)}
            />
          </LocalizationProvider>
        </Box>
        <Box css={css.address}>
          <p style={{ fontSize: "20px", margin: "10px" }}>주소 API</p>
          <textarea
            value={updateStore.address}
            defaultValue={store.address}
            name="address"
            onChange={handleStoreChange}
          ></textarea>
        </Box>
        <Box>
          <p style={{ fontSize: "20px", margin: "10px" }}>가게 설명</p>
          <textarea
            css={css.descriptionBox}
            value={updateStore.description}
            defaultValue={store.description}
            name="description"
            onChange={handleStoreChange}
          ></textarea>
        </Box>
        <Button
          css={css.storeUpdateButton}
          onClick={(e) => {
            if (checkStoreInput()) {
              handleSubmit(e);
            }
          }}
        >
          가게 수정
        </Button>
      </Box>
    </>
  );
}
