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

  const [img, setImg] = useState<File | null>(null);
  const [serverImg, setServerImg] = useState<string>("");
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

  const [updateStore, setUpdateStore] = useState<StoreInfo>({
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
        setServerImg(data.logoUrl);
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

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const checkUrl = () => {
    if (typeof store.logoUrl === "string") {
      const validExtensions = [".jpg", ".jpeg", ".png"];
      const urlExtension = store.logoUrl
        .slice(store.logoUrl.lastIndexOf("."))
        .toLowerCase();

      const url = store.logoUrl.slice(store.logoUrl.indexOf("."));

      if (validExtensions.includes(urlExtension)) {
        return url;
      }else {
        return null;
      }
    }
    return null;
  };

  const changeBlob = () => {
    const urlExtension = checkUrl();
    if(urlExtension && typeof store.logoUrl === 'string') {
      const mimeTypeMap: {[key: string]: string} = {
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".png": "image/png"
      };
      const mimeType = mimeTypeMap[urlExtension];
      const blob = new Blob([store.logoUrl], {type: mimeType});
      return blob;
    }
    return null;
  }

  const changeFile = () => {
    const blob = changeBlob();
    if(blob && typeof store.logoUrl === 'string') {
      const file = new File([blob], store.logoUrl.split("/")[1], {
        type: blob.type
      });
      return file;
    }
    return null;
  }

  
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
      formData.append(field, newValue || oldValue || "");
    });

    if (img) {
      formData.append("logoUrl", img);
    } 
    
    if (!token) {
      alert("로그인 해주세요.");
      return;
    }
    try {
      console.log(changeFile());
      const response = await axios.put(
        "http://localhost:4041/api/v1/stores/update",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
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
            {imgPreview ? (
              <img
                src={imgPreview}
                alt="logo preview"
                css={css.logoImg}
                onClick={handleImageClick}
              ></img>
            ) : (
              serverImg && (
                <img
                  src={`http://localhost:4041/image/${serverImg}`}
                  alt="logo"
                  css={css.logoImg}
                  onClick={handleImageClick}
                ></img>
              )
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
          css={css.storeSubmitButton}
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