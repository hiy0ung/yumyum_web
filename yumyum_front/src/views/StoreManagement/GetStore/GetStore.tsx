/** @jsxImportSource @emotion/react */
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { StoreInfo } from "../../../types/Store";
import * as css from "./Style";
import { useNavigate } from "react-router-dom";
import { HOME_PATH, UPDATE_STORE_PATH } from "../../../constants";

export default function Store() {
  const navigate = useNavigate();
  const [cookies] = useCookies(["token"]);
  const token = cookies.token;
  const [imageData, setImgData] = useState<string>();
  const [store, setStore] = useState<StoreInfo>({
    storeName: "",
    logoUrl: "",
    category: "",
    openingTime: "",
    closingTime: "",
    breakStartTime: "",
    breakEndTime: "",
    address: "",
    detailAddress: "",
    detail2Address: "",
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
        setImgData(data.logoUrl);
        console.log(data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
      fetchStore();
  }, []);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleDeleteClick = () => {
    setIsOpen(true);
  }
  const handleClose = () => {
    setIsOpen(false);
  }
  const handleConfirmDelete = () => {
    deleteStore();
    setIsOpen(false);
  }

  const deleteStore = async () => {
    try {
      const response = await axios.delete(
        "http://localhost:4041/api/v1/stores/delete",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data) {
        const data = response.data.data;
        alert(data);
        navigate(HOME_PATH);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
    <h2 css={css.storeTitle}>{store.storeName}</h2>
      <Box css={css.StoreInfo}>
        <Box css={css.BasicInfo}>
          {store.logoUrl && (
            <img
              src={imageData}
              css={css.logoUrl}
            />
          )}
          <Box css={css.BasicInfoContent}>
            {store.address && <p>가게주소: {store.detailAddress} {store.detail2Address}</p>}
            <p>카테고리: {store.category}</p>
            {store.description && <div css={css.description}><p>가게설명: {store.description}</p></div>}
          </Box>
        </Box>
        <Box css={css.StoreTimeAndBreakTime}>
        <Box css={css.Time}>
          <div>
            <p>오픈시간</p>
            <div>{store.openingTime}</div>
          </div>
          <div>
            <p>마감시간</p>
            <div>{store.closingTime}</div>
          </div>
        </Box>
        {(store.breakStartTime || store.breakEndTime) && (
          <Box css={css.Time}>
            <div>
              <p>브레이크 시작</p>
              <div>{store.breakStartTime}</div>
            </div>
            <div>
              <p>브레이크 마감</p>
              <div>{store.breakEndTime}</div>
            </div>
          </Box>
        )}
        </Box>
        <Box css={css.buttons}>
          <Button
            variant="outlined"
            startIcon={<DeleteIcon />}
            css={css.updateButton}
            onClick={(e) => {
              e.preventDefault();
              navigate(UPDATE_STORE_PATH);
            }}
          >
            가게 수정
          </Button>
          <Button
            variant="outlined"
            startIcon={<DeleteIcon />}
            css={css.deleteButton}
            onClick={handleDeleteClick}
          >
            가게 삭제
          </Button>
        </Box>
      </Box>
      <Dialog open={isOpen} onClose={handleClose} fullWidth={true} maxWidth="md" PaperProps={{
        sx: {
          width: '400px',
          height: '130px',
          overflow: 'hidden'
        }
      }}>
            <DialogTitle sx={{fontSize: '16px'}}>가게삭제</DialogTitle>
            <DialogContent sx={{overflow: 'hidden'}}>
              <DialogContentText sx={{fontSize: '14px'}}>
                정말 삭제하시겠습니까?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>취소</Button>
              <Button onClick={handleConfirmDelete} color="error">삭제</Button>
            </DialogActions>
      </Dialog>
    </>
  );
}
