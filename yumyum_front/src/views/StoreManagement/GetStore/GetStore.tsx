/** @jsxImportSource @emotion/react */
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import React, {useEffect, useState} from "react";
import {useCookies} from "react-cookie";
import {StoreInfo} from "../../../types/Store";
import * as css from "./Style";
import {useNavigate} from "react-router-dom";
import {HOME_PATH, UPDATE_STORE_PATH} from "../../../constants";
import useStoreImage from "../../../Store/storeImg.store";

export default function Store() {
    const navigate = useNavigate();
    const [cookies] = useCookies(["token"]);
    const token = cookies.token;
    const [imageData, setImgData] = useState<string>();
    const {setStoreImg} = useStoreImage();
    const [store, setStore] = useState<StoreInfo>({
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
    };
    const handleClose = () => {
        setIsOpen(false);
    };
    const handleConfirmDelete = () => {
        deleteStore();
        setIsOpen(false);
    };

    const deleteStore = async () => {
        try {
            const response = await axios.delete(
                "http://localhost:4041/api/v1/stores/delete",
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.data) {
                const data = response.data.data;
                alert(data);
                setStoreImg("");
                localStorage.removeItem("storeImage");
                navigate(HOME_PATH);
            }
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <>

            <h2 css={css.storeTitle}>가게 정보</h2>
            <div css={css.StoreInfo}>
                {store.logoUrl && (
                    <div css={css.logoUrlContainer}>
                        <img src={imageData} css={css.logoUrl} alt="로고 이미지"/>
                    </div>
                )}
                <div css={css.BasicInfo}>
                    <div css={css.infoContainer}>
                        <div css={css.storeName}>
                            <span>이&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;름 :</span>
                            <span>{store.storeName && (store.storeName)}</span>
                        </div>
                        <div css={css.storeAddress}>
                            <span>가게 주소 :</span>
                            <span>
                            {store.address ? store.address + (store.detailAddress ? ` ${store.detailAddress}` : '') : ''}</span>
                        </div>
                        <div css={css.storeCategory}>
                            <span>카테고리 :</span>
                            <span>{store.category && (store.category)}</span>
                        </div>
                        <div>
                            <span>가게 설명 :</span>
                            <span>{store.description && (store.description)}</span>
                        </div>
                        <div>
                            <span>영업 시간 :</span>
                            <span>
                            {(store.openingTime || store.closingTime) && `${store.openingTime} ~ ${store.closingTime}`}</span>
                        </div>
                        <div>
                            <span>휴게 시간 :</span>
                            <span>
                            {(store.breakStartTime || store.breakEndTime) && `${store.breakStartTime} ~ ${store.breakEndTime}`}</span>
                        </div>
                    </div>
                </div>

                <div css={css.buttons}>
                    <Button
                        variant="contained"
                        onClick={(e) => {
                            e.preventDefault();
                            navigate(UPDATE_STORE_PATH);
                        }}
                    >
                        가게 수정
                    </Button>
                    <Button
                        variant="contained"
                        css={css.deleteButton}
                        onClick={handleDeleteClick}
                    >
                        가게 삭제
                    </Button>
                </div>
            </div>
            <Dialog
                open={isOpen}
                onClose={handleClose}
                fullWidth={true}
                maxWidth="md"
                PaperProps={{
                    sx: {
                        width: "400px",
                        height: "130px",
                        overflow: "hidden",
                    },
                }}
            >
                <DialogTitle sx={{fontSize: "16px"}}>가게삭제</DialogTitle>
                <DialogContent sx={{overflow: "hidden"}}>
                    <DialogContentText sx={{fontSize: "15px"}}>
                        정말 삭제하시겠습니까?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>취소</Button>
                    <Button onClick={handleConfirmDelete} color="error">
                        삭제
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
