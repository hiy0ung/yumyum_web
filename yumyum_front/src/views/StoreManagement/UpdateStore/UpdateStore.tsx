/** @jsxImportSource @emotion/react */
import { Box } from "@mui/system";
import * as css from "./Style";
import React, { useEffect, useRef, useState } from "react";
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
import { STORE_API } from "../../../apis";

export default function Store() {
  const navigate = useNavigate();
  const [cookies] = useCookies(["token"]);
  const token = cookies.token;
  const [category, setCategory] = useState<string>("");
  const [imageData, setImgData] = useState<string>();
  const [base64, setBase64] = useState<string | null>();
  const [zoneCode, setZoneCode] = useState("");
  const [address, setAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [openPostcode, setOpenPostcode] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [updateStore, setUpdateStore] = useState<StoreInfo>({
    storeName: "",
    logoUrl: "",
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

  const clickButton = () => {
    setOpenPostcode((current) => !current);
  };

  const fetchStore = async () => {
    try {
      const response = await axios.get(
        STORE_API.GET_STORE,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data) {
        const data = response.data.data;
        setUpdateStore(data);
        setZoneCode(data.zoneCode);
        setAddress(data.address);
        setDetailAddress(data.detailAddress);
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

  const selectAddress = (data: any) => {
    setUpdateStore((prev) => ({
      ...prev,
      zoneCode: data.zonecode,
      address: data.address,
    }));
    setZoneCode(data.zonecode);
    setAddress(data.address);
    setOpenPostcode(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const IMAGE_MAX_SIZE = 10 * 1024 * 1024;

    if (file) {
      if (file.size > IMAGE_MAX_SIZE) {
        alert("업로드 가능한 최대 용량은 10MB입니다.");
        return;
      }

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
      ...updateStore,
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
    setUpdateStore((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const checkStoreInput = () => {
    const emptyFields: string[] = [];

    if (!updateStore.storeName) emptyFields.push("가게명");
    if (!updateStore.logoUrl) emptyFields.push("가게 로고");
    if (!updateStore.category) emptyFields.push("카테고리");
    if (!updateStore.openingTime) emptyFields.push("오픈시간");
    if (!updateStore.closingTime) emptyFields.push("마감시간");

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
      "zoneCode",
      "address",
      "detailAddress",
      "description",
    ];

    fields.forEach((field) => {
      const newValue = updateStore[field as keyof StoreInfo];
      const oldValue = updateStore[field as keyof StoreInfo];
      const valueToAppend = newValue || oldValue || "";
      formData.append(field, valueToAppend);
    });

    const logoUrl = base64 || imageData;
    if (!logoUrl) {
      alert("이미지를 선택해주세요");
      return;
    }
    formData.append("logoUrl", logoUrl);

    if (!token) {
      alert("로그인 해주세요.");
      return;
    }
    try {
      const response = await axios.put(
        STORE_API.UPDATE_STORE,
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
            {base64 ? (
              <img
                src={base64}
                alt="profile"
                css={css.logoImg}
                onClick={handleImageClick}
              ></img>
            ) : (
              <img
                src={imageData}
                alt="profile"
                style={{ maxHeight: "200px" }}
                onClick={handleImageClick}
                css={css.logoImg}
              ></img>
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
              label="가게이름"
              name="storeName"
              value={updateStore.storeName}
              onChange={handleStoreChange}
            />
            <FormControl css={css.category}>
              <InputLabel id="category-select-label">카테고리*</InputLabel>
              <Select
                labelId="category-select-label"
                id="category-select"
                value={category}
                defaultValue={updateStore.category}
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
        <Box>
          <div>
            <div style={{ display: "inline" }}>
              <input
                id="address_kakao"
                onClick={clickButton}
                value={zoneCode}
                placeholder="주소를 입력해주세요 (예: 판교역로 235)"
                css={css.address}
              />
              <div style={{ position: "relative", display: "inline-block" }}>
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
            </div>
            <Box sx={{ margin: "20px 0px" }}>
              <tr style={{ width: "100%" }}>
                <td>
                  <input
                    value={address}
                    css={css.detailAddress}
                    onChange={(e) => {
                      setDetailAddress(e.target.value);
                    }}
                  />
                </td>
                <input
                  value={detailAddress}
                  css={css.detailAddress}
                  onChange={(e) => {
                    setDetailAddress(e.target.value);
                  }}
                />
              </tr>
            </Box>
          </div>
        </Box>
        <Box css={css.openAndCloseTime}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              label="오픈 시간 *"
              name="openingTime"
              value={
                updateStore.openingTime
                  ? dayjs(updateStore.openingTime, "HH:mm")
                  : null
              }
              defaultValue={dayjs(updateStore.openingTime)}
              onChange={(newTime) => handleTimeChange("openingTime", newTime)}
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              label="마감 시간 *"
              name="closingTime"
              value={
                updateStore.closingTime
                  ? dayjs(updateStore.closingTime, "HH:mm")
                  : null
              }
              defaultValue={dayjs(updateStore.closingTime)}
              onChange={(newTime) => handleTimeChange("closingTime", newTime)}
            />
          </LocalizationProvider>
        </Box>
        <Box css={css.breakTime}>
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

        <Box>
          <p style={{ fontSize: "20px", margin: "10px" }}>가게 설명</p>
          <textarea
            css={css.descriptionBox}
            value={updateStore.description}
            defaultValue={updateStore.description}
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
