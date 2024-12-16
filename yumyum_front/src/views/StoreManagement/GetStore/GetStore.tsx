/** @jsxImportSource @emotion/react */
import { Box } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { StoreInfo } from "../../../types/Store";
import * as css from "./Style";

export default function Store() {
  const [cookies, , setCookies] = useCookies(["token"]);
  const token = cookies.token;
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

  useEffect(() => {
    console.log("token:", token);
    fetchStore();
  }, []);

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
        setStore(response.data.data);
        console.log(response.data.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Box css={css.StoreInfo}>
        <Box css={css.BasicInfo}>
          <img src={`http://localhost:4041/image/${store.logoUrl}`} css={css.logoUrl} alt="스토어 사진"/>
          <Box css={css.BasicInfoContent}>
            <p>가게명: {store.storeName}</p>
            <p>가게주소: {store.address}</p>
            <p>카테고리: {store.category}</p>
            <p>가게설명: {store.description}</p>
          </Box>
        </Box>
        <Box css={css.Time}>
          <p>오픈시간</p>
          <div>{store.openingTime}</div>
          <p>마감시간</p>
          <div>{store.closingTime}</div>
        </Box>
        <Box css={css.Time}>
          <p>브레이크 시작</p>
          <div>{store.breakStartTime}</div>
          <p>브레이크 마감</p>
          <div>{store.breakEndTime}</div>
        </Box>
      </Box>
    </>
  );
}
