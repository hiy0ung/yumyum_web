/** @jsxImportSource @emotion/react */
import {
  Box,
  CloseReason,
  Fade,
  FormControlLabel,
  Modal,
  Switch,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import * as s from "./Style";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { AUTH_PATH_LOGIN } from "../../constants";
import { updateModalStore } from "../../Store/menuModal.store";
import {
  MenuModalProps,
  AddMenu,
  UpdateMenu,
  Menus,
  MenuOptions,
  MenuOptionDetails,
} from "../../types/Menu";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";

export default function MenuModal({
  modalStatus,
  closeModal,
  categories,
  fetchData,
  updateMenudata,
  updateOptionChecked,
  setUpdateOptionChecked,
  menus,
  selectedMenuId,
}: MenuModalProps) {
  type CloseReason = "backdropClick" | "escapeKeyDown" | "closeButtonClick";
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();

  const [addMenu, setAddMenu] = useState<AddMenu>({
    categoryId: categories.length > 0 ? categories[0].id : 0,
    menuName: "",
    imageUrl: "",
    menuDescription: "",
    menuPrice: 0,
    isAvailable: false,
    menuOptions: [
      {
        menuOptionId: 0,
        optionName: "옵션 없음",
        optionDetails: [
          {
            optionDetailName: "옵션 없음",
            additionalFee: 0,
          },
        ],
      },
    ],
  });
  const [checked, setChecked] = useState(false);
  const [file, setFile] = useState<null | File>(null);
  const [updateChecked, setUpdateChecked] = useState(true);
  const [menuChecked, setMenuChecked] = useState([true]);
  const [imgPreview, setImgPreview] = useState("");
  const [updateMenu, setUpdateMenu] = useState<UpdateMenu>({
    categoryId: updateMenudata.categoryId,
    imageUrl: updateMenudata.imageUrl,
    isAvailable: updateMenudata.isAvailable,
    menuDescription: updateMenudata.menuDescription,
    menuName: updateMenudata.menuName,
    menuPrice: updateMenudata.menuPrice,
    menuOptions: updateMenudata.menuOptions
      ? updateMenudata.menuOptions.map((option) => ({
          menuId: option.menuId || 0,
          optionName: option.optionName || "",
          optionDetails: option.optionDetails
            ? option.optionDetails.map((optionDetail) => ({
                menuOptionId: optionDetail.menuOptionId || 0,
                detailName: optionDetail.detailName
                  ? optionDetail.detailName.map((menuName) => ({
                      optionDetailName: menuName.optionDetailName || "",
                      additionalFee: menuName.additionalFee || 0,
                    }))
                  : [],
              }))
            : [],
        }))
      : [],
  });
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const handleImageClick = () => {
    console.log(fileInputRef.current);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const { updateModalState, updateModalOpen, updateModalClose } =
    updateModalStore();

  useEffect(() => {
    if (updateMenudata) {
      setUpdateMenu(updateMenudata);
      setUpdateOptionChecked(updateMenudata.menuOptions.map(() => true));
    }
  }, [updateMenudata]);

  const openOptionModal = () => {
    setChecked(true);
  };

  const openUpdateModal = () => {
    setUpdateOptionChecked((updateMenu.menuOptions || []).map(() => true));
  };

  const closeOptionModal = () => {
    setChecked(false);
  };

  const closeUpdateModal = (value: CloseReason) => {
    if (value === "backdropClick" || value === "escapeKeyDown") {
      return;
    } else {
      setUpdateChecked(false);
      setUpdateOptionChecked((updateMenu.menuOptions || []).map(() => false));
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    if (event.target.checked) {
      openOptionModal();
    }
  };

  const handleUpdateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateChecked(event.target.checked);
    if (event.target.checked) {
      openUpdateModal();
    } else {
      return;
    }
  };

  const menuHandleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    optionIndex: number
  ) => {
    setMenuChecked((prev) => {
      const newState = [...prev];
      newState[optionIndex] = event.target.checked;
      return newState;
    });
  };

  const updateOptionChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    optionIndex: number
  ) => {
    setUpdateOptionChecked((prev) => {
      const newState = [...prev];
      newState[optionIndex] = event.target.checked;
      return newState;
    });
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setAddMenu((prev) => ({
      ...prev,
      [name]: name !== "menuPrice" || "additionalFee" ? value : Number(value),
    }));
  };

  const changeUpdateHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUpdateMenu((prev) => ({
      ...prev,
      [name]: name !== "menuPrice" || "additionalFee" ? value : Number(value),
    }));
  };

  const changeOptionHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    optionIndex = 0
  ) => {
    const { name, value } = event.target;
    setAddMenu((prev) => ({
      ...prev,
      menuOptions: prev.menuOptions.map((option, index) =>
        index === optionIndex ? { ...option, [name]: value } : option
      ),
    }));
  };
  const changeOptionUpdateHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    optionIndex = 0
  ) => {
    const { name, value } = event.target;
    setUpdateMenu((prev) => ({
      ...prev,
      menuOptions: prev.menuOptions.map((option, index) =>
        index === optionIndex ? { ...option, [name]: value } : option
      ),
    }));
  };

  const changeDetailHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    optionIndex = 0,
    detailIndex = 0
  ) => {
    const { name, value } = event.target;
    setAddMenu((prev) => ({
      ...prev,
      menuOptions: prev.menuOptions.map((option, index) =>
        index === optionIndex
          ? {
              ...option,
              optionDetails: option.optionDetails.map((detail, dIndex) =>
                dIndex === detailIndex ? { ...detail, [name]: value } : detail
              ),
            }
          : option
      ),
    }));
  };
  const changeUpdateDetailHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    optionIndex = 0,
    detailIndex = 0,
    detailNameIndex = 0
  ) => {
    const { name, value } = event.target;
    setUpdateMenu((prev) => ({
      ...prev,
      menuOptions: prev.menuOptions.map((option, index) =>
        index === optionIndex
          ? {
              ...option,
              optionDetails: option.optionDetails.map((detail, dIndex) =>
                dIndex === detailIndex
                  ? {
                      ...detail,
                      detailName: detail.detailName.map((detailName, dnIndex) =>
                        dnIndex === detailNameIndex
                          ? {
                              ...detailName,
                              [name]:
                                name !== "additionalFee"
                                  ? value
                                  : Number(value),
                            }
                          : detailName
                      ),
                    }
                  : detail
              ),
            }
          : option
      ),
    }));
  };

  const addNewOption = () => {
    setAddMenu((prev) => ({
      ...prev,
      menuOptions: [
        ...prev.menuOptions,
        {
          menuOptionId: 0,
          optionName: "",
          optionDetails: [
            {
              optionDetailName: "",
              additionalFee: 0,
            },
          ],
        },
      ],
    }));
    setMenuChecked([...menuChecked, false]);
  };
  const addNewUpdateOption = (selectMenuId: number) => {
    setUpdateMenu((prev) => ({
      ...prev,
      menuOptions: [
        ...prev.menuOptions,
        {
          menuId: 0,
          optionName: "",
          optionDetails: [
            {
              menuOptionId: 0,
              detailName: [
                {
                  optionDetailName: "",
                  additionalFee: 0,
                },
              ],
            },
          ],
        },
      ],
    }));
  };

  const addDetailOption = async (optionIndex: number) => {
    setUpdateMenu((prev) => ({
      ...prev,
      menuOptions: prev.menuOptions.map((option, index) =>
        index === optionIndex
          ? {
              ...option,
              optionDetails: [
                ...option.optionDetails,
                {
                  menuOptionId: 0,
                  detailName: [
                    {
                      optionDetailName: "",
                      additionalFee: 0,
                    },
                  ],
                },
              ],
            }
          : option
      ),
    }));
  };

  const addNewOptionDetail = (optionIndex: number) => {
    setAddMenu((prev) => ({
      ...prev,
      menuOptions: prev.menuOptions.map((option, index) =>
        index === optionIndex
          ? {
              ...option,
              optionDetails: [
                ...option.optionDetails,
                { optionDetailName: "", additionalFee: 0 },
              ],
            }
          : option
      ),
    }));
  };

  const removeOption = (optionIndex: number) => {
    setAddMenu((prev) => ({
      ...prev,
      menuOptions:
        prev.menuOptions.length > 1
          ? prev.menuOptions.filter((_, index) => index !== optionIndex)
          : prev.menuOptions,
    }));
    if (optionIndex === 0) {
      alert("옵션은 최소 한개 이상이여야 합니다.");
    }
  };

  const removeUpdateOption = async (optionIndex: number) => {
    const token = cookies.token;
    setUpdateMenu((prev) => ({
      ...prev,
      menuOptions:
        prev.menuOptions.length > 1
          ? prev.menuOptions.filter((_, index) => index !== optionIndex)
          : prev.menuOptions,
    }));
    try {
      if (optionIndex === 0) {
        alert("옵션은 최소 한개 이상이여야 합니다");
      } else {
        const response = await axios.get(
          `http://localhost:4041/api/v1/menus/${selectedMenuId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = response.data.data;
        const deleteOptionId = data.menuOptions[optionIndex].menuOptionId;
        await axios.delete(
          `http://localhost:4041/api/v1/menus/options/delete/${deleteOptionId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  const removeOptionDetail = (optionIndex: number, detailIndex: number) => {
    setAddMenu((prev) => ({
      ...prev,
      menuOptions: prev.menuOptions.map((option, index) =>
        index === optionIndex
          ? {
              ...option,
              optionDetails:
                option.optionDetails.length > 1
                  ? option.optionDetails.filter(
                      (_, dIndex) => dIndex !== detailIndex
                    )
                  : option.optionDetails,
            }
          : option
      ),
    }));
    if (detailIndex === 0) {
      alert("디테일 옵션은 최소 한개 이상이여야 합니다.");
    }
  };
  const removeUpdateOptionDetail = async (
    optionIndex: number,
    detailIndex: number
  ) => {
    const token = cookies.token;
    setUpdateMenu((prev) => ({
      ...prev,
      menuOptions: prev.menuOptions.map((option, index) =>
        index === optionIndex
          ? {
              ...option,
              optionDetails:
                option.optionDetails.length > 1
                  ? option.optionDetails.filter(
                      (_, dIndex) => dIndex !== detailIndex
                    )
                  : option.optionDetails,
            }
          : option
      ),
    }));
    try {
      if (detailIndex === 0) {
        alert("디테일 옵션은 최소 한개 이상이여야 합니다");
      } else {
        const response = await axios.get(
          `http://localhost:4041/api/v1/menus/${selectedMenuId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = response.data.data;
        const deleteDetailId =
          data.menuOptions[optionIndex].optionDetails[detailIndex].detailId;

        await axios.delete(
          `http://localhost:4041/api/v1/menus/options/details/delete/${deleteDetailId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddMenu({ ...addMenu, isAvailable: event.target.checked });
  };

  const changeValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAddMenu({ ...addMenu, categoryId: Number(e.target.value) });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImgPreview(reader.result as string);
      };
    }
  };

  const menuAdd = async () => {
    try {
      const token = cookies.token;
      try {
        const formData = new FormData();
        formData.append("categoryId", addMenu.categoryId.toString());
        formData.append("menuName", addMenu.menuName);
        formData.append("menuDescription", addMenu.menuDescription);
        formData.append("menuPrice", addMenu.menuPrice.toString());
        formData.append("isAvailable", addMenu.isAvailable.toString());

        addMenu.menuOptions.forEach((option, index) => {
          formData.append(
            `menuOptions[${index}].optionName`,
            option.optionName
          );

          option.optionDetails.forEach((detail, detailIndex) => {
            formData.append(
              `menuOptions[${index}].optionDetails[${detailIndex}].optionDetailName`,
              detail.optionDetailName
            );
            formData.append(
              `menuOptions[${index}].optionDetails[${detailIndex}].additionalFee`,
              detail.additionalFee.toString()
            );
          });
        });

        if (file) {
          formData.append("imageUrl", file);
        } else {
          alert("이미지를 선택해주세요");
          console.warn("no file");
          return;
        }

        if (addMenu.menuName === "") {
          alert("메뉴명을 입력해주세요");
          return;
        } else if (addMenu.menuDescription === "") {
          alert("메뉴 설명을 입력해주세요");
          return;
        } else if (addMenu.menuPrice === 0) {
          alert("메뉴 가격을 입력해주세요");
          return;
        } else if (addMenu.categoryId === 0) {
          alert("메뉴 카테고리를 선택해주세요");
          return;
        } else {
          const response = await axios.post(
            `http://localhost:4041/api/v1/menus/add`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
              },
            }
          );
          setAddMenu({
            categoryId: 0,
            menuName: "",
            imageUrl: "",
            menuDescription: "",
            menuPrice: 0,
            isAvailable: false,
            menuOptions: [
              {
                menuOptionId: 0,
                optionName: "옵션 없음",
                optionDetails: [
                  {
                    optionDetailName: "옵션 없음",
                    additionalFee: 0,
                  },
                ],
              },
            ],
          });
          setChecked(false);
          setMenuChecked([false]);
          closeModal();
          fetchData();
        }
      } catch (e) {
        if (axios.isAxiosError(e)) {
          console.error("사진 추가 안됨", e);
        } else {
          console.error("사진 추가 안됨", e);
        }
      }
    } catch (e) {
      console.error("토큰 없음");
      alert("다시 로그인 해주세요");
      closeModal();
      navigate(AUTH_PATH_LOGIN);
    }
  };

  const menuUpdate = async (menuId: number) => {
    try {
      const token = cookies.token;
      const response = await axios.get(
        `http://localhost:4041/api/v1/menus/${menuId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = response.data.data;
      if (updateMenu.menuOptions.length > result.menuOptions.length) {
        for (
          let i = result.menuOptions.length;
          i < updateMenu.menuOptions.length;
          i++
        ) {
          const result2 = await axios.post(
            `http://localhost:4041/api/v1/menus/options/add`,
            {
              menuId: menuId,
              optionName: "",
              optionDetails: [],
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          await axios.post(
            `http://localhost:4041/api/v1/menus/options/details/add`,
            {
              menuOptionId: result2.data.data.menuOptionId,
              optionDetailName: "",
              additionalFee: 0,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        }
      }
      const response1 = await axios.get(
        `http://localhost:4041/api/v1/menus/${menuId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      for (let i = 0; i < updateMenu.menuOptions.length; i++) {
        if (
          updateMenu.menuOptions.map((menu) => menu.optionDetails.length)[i] >
          result.menuOptions.map(
            (menu: MenuOptions) => menu.optionDetails.length
          )[i]
        ) {
          for (
            let j = 0;
            j <
            updateMenu.menuOptions.map((menu) => menu.optionDetails.length)[i] -
              result.menuOptions.map(
                (menu: MenuOptions) => menu.optionDetails.length
              )[i];
            i++
          ) {
            await axios.post(
              `http://localhost:4041/api/v1/menus/options/details/add`,
              {
                menuOptionId: result.menuOptions[i].menuOptionId,
                optionDetailName: "",
                additionalFee: 0,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
          }
        }
      }

      const formData = new FormData();
      formData.append("categoryId", updateMenu.categoryId.toString());
      formData.append("menuName", updateMenu.menuName);
      formData.append("menuDescription", updateMenu.menuDescription);
      formData.append("menuPrice", updateMenu.menuPrice.toString());
      formData.append("isAvailable", updateMenu.isAvailable.toString());

      updateMenu.menuOptions.forEach((option, index) => {
        formData.append(
          `menuOptions[${index}].menuId`,
          selectedMenuId.toString()
        );
        formData.append(`menuOptions[${index}].optionName`, option.optionName);
        option.optionDetails.forEach((detail, detailIndex) => {
          formData.append(
            `menuOptions[${index}].optionDetails[${detailIndex}].menuOptionId`,
            (index + 1).toString()
          );
          detail.detailName.forEach((detailName, detailNameIndex) => {
            formData.append(
              `menuOptions[${index}].optionDetails[${detailIndex}].detailName[${detailNameIndex}].optionDetailName`,
              detailName.optionDetailName
            );
            formData.append(
              `menuOptions[${index}].optionDetails[${detailIndex}].detailName[${detailNameIndex}].additionalFee`,
              detailName.additionalFee.toString()
            );
          });
        });
      });
      if (file) {
        formData.append("imageUrl", file);
      } else {
        alert("이미지를 선택해주세요");
        console.warn("no file");
        return;
      }
      if (updateMenu.menuName === "") {
        alert("메뉴명을 입력해주세요");
        return;
      }
      if (!updateMenu.imageUrl) {
        alert("이미지를 선택해주세요");
        return;
      }
      if (updateMenu.menuPrice === 0) {
        alert("메뉴 가격을 입력해주세요");
        return;
      }
      if (updateMenu.categoryId === 0) {
        alert("카테고리를 선택해주세요");
        return;
      }
      await axios.post(
        `http://localhost:4041/api/v1/menus/update/${menuId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("성공적으로 변경되었습니다.");
      updateModalClose();
      fetchData();
    } catch (e) {
      console.error(e);
    }
  };

  const onClickUpload = () => {
    let myInput = document.getElementById("imageUrl");
    myInput?.click();
  };
  useEffect(() => {}, [addMenu]);
  return (
    <>
      <Modal open={modalStatus} onClose={closeModal}>
        <>
          <div css={s.inputMenu}>
            <div css={s.categoryHeader}>
              <div css={s.categoryCancle}>
                <button onClick={closeModal}>
                  <ClearIcon />
                </button>
              </div>
            </div>
            <div css={s.categoryBody}>
              <div>
                <div>메뉴명</div>
                <input
                  css={s.submitMenu}
                  type="text"
                  name="menuName"
                  value={addMenu.menuName}
                  onChange={changeHandler}
                  required
                />
              </div>
              <div>
                <div css={s.addMenuBody}>이미지</div>
                {imgPreview ? (
                  <img
                    src={imgPreview}
                    alt="이미지 예시"
                    onClick={handleImageClick}
                    css={s.imgPreview}
                  />
                ) : (
                  <label css={s.imageLabel} htmlFor="imageUrl">
                    <span>사진 추가</span>
                    <button css={s.image} onClick={onClickUpload}>
                      <AddIcon />
                    </button>
                  </label>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  id="imageUrl"
                  onChange={handleFileChange}
                  required
                  style={{
                    display: "none",
                  }}
                />
              </div>
              <div>
                <div css={s.addMenuBody}>메뉴 설명</div>
                <input
                  css={s.submitMenu}
                  type="text"
                  name="menuDescription"
                  value={addMenu.menuDescription}
                  onChange={changeHandler}
                  required
                />
              </div>
              <div>
                <div css={s.addMenuBody}>메뉴 가격</div>
                <input
                  css={s.submitMenu}
                  type="number"
                  name="menuPrice"
                  value={addMenu.menuPrice}
                  onChange={changeHandler}
                  required
                />
              </div>
              <div>
                <div css={s.addMenuBody}>메뉴 카테고리 선택</div>
                <select
                  css={s.submitMenu}
                  name="menuCategory"
                  onChange={changeValue}
                  value={addMenu.categoryId}
                >
                  <option value="0">옵션 없음</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category.id}>
                      {category.menuCategory}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <div css={s.addMenuBody}>메뉴 판매 가능 여부</div>
                <input
                  type="checkbox"
                  checked={addMenu.isAvailable}
                  onChange={handleCheckboxChange}
                  css={s.isAvailable}
                />
              </div>
              <FormControlLabel
                control={<Switch checked={checked} onChange={handleChange} />}
                label="옵션 그룹 보기"
              />
              <Modal open={checked} onClose={closeOptionModal}>
                <>
                  <div css={s.optionModal}>
                    <div css={s.categoryHeader}>
                      <div css={s.categoryCancle}>
                        <button onClick={closeOptionModal}>
                          <ClearIcon />
                        </button>
                      </div>
                    </div>
                    <div css={s.categoryBody}>
                      <Box sx={{ display: "flex" }}>
                        <Fade in={checked}>
                          {checked ? (
                            <div>
                              {addMenu.menuOptions.map(
                                (option, optionIndex) => (
                                  <div key={optionIndex} css={s.option}>
                                    <div>
                                      <div css={s.imageLabel}>
                                        <div>옵션 그룹명</div>
                                        <div css={s.addCategory}>
                                          <button
                                            onClick={() =>
                                              removeOption(optionIndex)
                                            }
                                          >
                                            <ClearIcon />
                                          </button>
                                        </div>
                                      </div>
                                      <input
                                        type="text"
                                        css={s.submitMenu}
                                        name="optionName"
                                        value={option.optionName}
                                        onChange={(event) =>
                                          changeOptionHandler(
                                            event,
                                            optionIndex
                                          )
                                        }
                                      />
                                    </div>
                                    <FormControlLabel
                                      control={
                                        <Switch
                                          checked={menuChecked[optionIndex]}
                                          onChange={(event) =>
                                            menuHandleChange(event, optionIndex)
                                          }
                                        />
                                      }
                                      label="옵션 보기"
                                    />
                                    <Box sx={{ display: "flex" }}>
                                      <Fade in={menuChecked[optionIndex]}>
                                        {menuChecked ? (
                                          <div css={s.optionDetail}>
                                            {option.optionDetails.map(
                                              (detail, detailIndex) => (
                                                <div
                                                  key={detailIndex}
                                                  css={s.optionAdd}
                                                >
                                                  <div css={s.optionAdd}>
                                                    옵션
                                                  </div>

                                                  <input
                                                    type="text"
                                                    css={s.submitMenu}
                                                    name="optionDetailName"
                                                    value={
                                                      detail.optionDetailName
                                                    }
                                                    onChange={(event) =>
                                                      changeDetailHandler(
                                                        event,
                                                        optionIndex,
                                                        detailIndex
                                                      )
                                                    }
                                                  />

                                                  <div css={s.optionAdd}>
                                                    옵션 가격
                                                  </div>
                                                  <div
                                                    css={s.deleteOptionDetail}
                                                  >
                                                    <input
                                                      type="number"
                                                      css={s.submitOptionMenu}
                                                      name="additionalFee"
                                                      value={
                                                        detail.additionalFee
                                                      }
                                                      onChange={(event) =>
                                                        changeDetailHandler(
                                                          event,
                                                          optionIndex,
                                                          detailIndex
                                                        )
                                                      }
                                                    />

                                                    <div css={s.addCategory}>
                                                      <button
                                                        onClick={() =>
                                                          removeOptionDetail(
                                                            optionIndex,
                                                            detailIndex
                                                          )
                                                        }
                                                      >
                                                        <ClearIcon />
                                                      </button>
                                                    </div>
                                                  </div>
                                                </div>
                                              )
                                            )}
                                            <div css={s.optionDetailAdd}>
                                              <div>옵션 추가</div>
                                              <button
                                                onClick={() =>
                                                  addNewOptionDetail(
                                                    optionIndex
                                                  )
                                                }
                                                css={s.addOptionDetail}
                                              >
                                                <AddIcon />
                                              </button>
                                            </div>
                                          </div>
                                        ) : (
                                          <div>not1</div>
                                        )}
                                      </Fade>
                                    </Box>
                                  </div>
                                )
                              )}
                              <div css={s.confirmButton}>
                                <div>
                                  <button onClick={addNewOption}>
                                    옵션그룹 추가
                                  </button>
                                </div>
                                <div>
                                  <button onClick={closeOptionModal}>
                                    확인
                                  </button>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div>not2</div>
                          )}
                        </Fade>
                      </Box>
                    </div>
                  </div>
                </>
              </Modal>
              <div css={s.modalButton}>
                <button onClick={menuAdd} css={s.modalSubmitButton}>
                  저장
                </button>
              </div>
            </div>
          </div>
        </>
      </Modal>

      {/* 업데이트 모달창 부분 */}
      <Modal open={updateModalState} onClose={updateModalClose}>
        <>
          <div css={s.inputMenu}>
            <div css={s.categoryHeader}>
              <div css={s.categoryCancle}>
                <button onClick={updateModalClose}>
                  <ClearIcon />
                </button>
              </div>
            </div>
            <div>
              <div css={s.categoryBody}>
                <div>메뉴명</div>
                <input
                  css={s.submitMenu}
                  type="text"
                  name="menuName"
                  value={updateMenu.menuName}
                  onChange={changeUpdateHandler}
                  required
                />
              </div>
              <div>
                <div css={s.addMenuBody}>이미지</div>
                {imgPreview ? (
                  <img
                    src={imgPreview}
                    alt="이미지 예시"
                    onClick={handleImageClick}
                    css={s.imgPreview}
                  />
                ) : (
                  <label css={s.imageLabel} htmlFor="imageUrl">
                    <span>사진 수정</span>
                    <button css={s.image} onClick={onClickUpload}>
                      <AddIcon />
                    </button>
                  </label>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  id="imageUrl"
                  onChange={handleFileChange}
                  required
                  style={{
                    display: "none",
                  }}
                />
              </div>
              <div>
                <div css={s.addMenuBody}>메뉴 설명</div>
                <input
                  css={s.submitMenu}
                  type="text"
                  name="menuDescription"
                  value={updateMenu.menuDescription}
                  onChange={changeUpdateHandler}
                  required
                />
              </div>
              <div>
                <div css={s.addMenuBody}>메뉴 가격</div>
                <input
                  css={s.submitMenu}
                  type="number"
                  name="menuPrice"
                  value={updateMenu.menuPrice}
                  onChange={changeUpdateHandler}
                  required
                />
              </div>
              <div>
                <div css={s.addMenuBody}>메뉴 카테고리 선택</div>
                <select
                  css={s.submitMenu}
                  name="categoryId"
                  onChange={changeUpdateHandler}
                  value={updateMenu.categoryId}
                >
                  <option value="0">옵션 없음</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category.id}>
                      {category.menuCategory}
                    </option>
                  ))}
                </select>
              </div>
              <FormControlLabel
                control={
                  <Switch
                    checked={updateChecked}
                    onChange={handleUpdateChange}
                  />
                }
                label="옵션 그룹 보기"
              />
              <Modal
                open={updateChecked}
                onClose={(_, reason) => closeUpdateModal(reason)}
              >
                <>
                  <div css={s.optionModal}>
                    <div css={s.categoryHeader}>
                      <div css={s.categoryCancle}>
                        <button
                          onClick={() => closeUpdateModal("closeButtonClick")}
                        >
                          <ClearIcon />
                        </button>
                      </div>
                    </div>
                    <div css={s.categoryBody}>
                      <Box sx={{ display: "flex" }}>
                        <Fade in={updateChecked}>
                          {updateChecked ? (
                            <div>
                              {updateMenu.menuOptions &&
                                updateMenu.menuOptions.length > 0 &&
                                updateMenu.menuOptions.map(
                                  (option, optionIndex) => (
                                    <div key={optionIndex} css={s.option}>
                                      <div>
                                        <div css={s.imageLabel}>
                                          <div>옵션 그룹명</div>
                                          <div css={s.addCategory}>
                                            <button
                                              onClick={() =>
                                                removeUpdateOption(optionIndex)
                                              }
                                            >
                                              <ClearIcon />
                                            </button>
                                          </div>
                                        </div>

                                        <input
                                          type="text"
                                          css={s.submitMenu}
                                          name="optionName"
                                          value={option.optionName}
                                          onChange={(event) =>
                                            changeOptionUpdateHandler(
                                              event,
                                              optionIndex
                                            )
                                          }
                                        />
                                      </div>
                                      <FormControlLabel
                                        control={
                                          <Switch
                                            checked={
                                              updateOptionChecked[optionIndex]
                                            }
                                            onChange={(event) =>
                                              updateOptionChange(
                                                event,
                                                optionIndex
                                              )
                                            }
                                          />
                                        }
                                        label="옵션 보기"
                                      />
                                      <Box sx={{ display: "flex" }}>
                                        <Fade
                                          in={updateOptionChecked[optionIndex]}
                                        >
                                          {updateOptionChecked[optionIndex] ? (
                                            <div css={s.optionDetail}>
                                              {option.optionDetails &&
                                                option.optionDetails.length >
                                                  0 &&
                                                option.optionDetails.map(
                                                  (detail, detailIndex) =>
                                                    detail.detailName &&
                                                    detail.detailName.length >
                                                      0 &&
                                                    detail.detailName.map(
                                                      (
                                                        detailName,
                                                        detailNameIndex
                                                      ) => (
                                                        <div
                                                          key={detailIndex}
                                                          css={s.optionAdd}
                                                        >
                                                          <div>옵션</div>

                                                          <input
                                                            type="text"
                                                            css={s.submitMenu}
                                                            name="optionDetailName"
                                                            value={
                                                              detailName.optionDetailName
                                                            }
                                                            onChange={(event) =>
                                                              changeUpdateDetailHandler(
                                                                event,
                                                                optionIndex,
                                                                detailIndex,
                                                                detailNameIndex
                                                              )
                                                            }
                                                          />
                                                          <div
                                                            css={s.optionAdd}
                                                          >
                                                            옵션 가격
                                                          </div>
                                                          <div
                                                            css={
                                                              s.deleteOptionDetail
                                                            }
                                                          >
                                                            <input
                                                              type="number"
                                                              css={s.submitMenu}
                                                              name="additionalFee"
                                                              value={
                                                                detailName.additionalFee
                                                              }
                                                              onChange={(
                                                                event
                                                              ) =>
                                                                changeUpdateDetailHandler(
                                                                  event,
                                                                  optionIndex,
                                                                  detailIndex,
                                                                  detailNameIndex
                                                                )
                                                              }
                                                            />
                                                            <div
                                                              css={
                                                                s.addCategory
                                                              }
                                                            >
                                                              <button
                                                                onClick={() =>
                                                                  removeUpdateOptionDetail(
                                                                    optionIndex,
                                                                    detailIndex
                                                                  )
                                                                }
                                                              >
                                                                <ClearIcon />
                                                              </button>
                                                            </div>
                                                          </div>
                                                        </div>
                                                      )
                                                    )
                                                )}
                                              <div css={s.optionDetailAdd}>
                                                <div>옵션 추가</div>
                                                <button
                                                  onClick={() =>
                                                    addDetailOption(optionIndex)
                                                  }
                                                  css={s.addOptionDetail}
                                                >
                                                  <AddIcon />
                                                </button>
                                              </div>
                                            </div>
                                          ) : (
                                            <div>not3</div>
                                          )}
                                        </Fade>
                                      </Box>
                                    </div>
                                  )
                                )}
                              <div css={s.confirmButton}>
                                <div>
                                  <button
                                    onClick={() =>
                                      addNewUpdateOption(selectedMenuId)
                                    }
                                  >
                                    옵션그룹 추가
                                  </button>
                                </div>
                                <div>
                                  <button
                                    onClick={() =>
                                      closeUpdateModal("closeButtonClick")
                                    }
                                  >
                                    확인
                                  </button>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div>not4</div>
                          )}
                        </Fade>
                      </Box>
                    </div>
                  </div>
                </>
              </Modal>
              <div css={s.modalButton}>
                <button
                  css={s.modalSubmitButton}
                  onClick={() => {
                    if (selectedMenuId !== null) {
                      menuUpdate(selectedMenuId);
                    } else {
                      console.error("menuId가 선택되지 않았습니다.");
                    }
                  }}
                >
                  저장
                </button>
              </div>
            </div>
          </div>
        </>
      </Modal>
    </>
  );
}
