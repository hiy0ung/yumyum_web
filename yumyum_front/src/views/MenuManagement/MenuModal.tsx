/** @jsxImportSource @emotion/react */
import { Box, Fade, FormControlLabel, Modal, Switch } from "@mui/material";
import React, { useEffect, useState } from "react";
import * as s from "./Style";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { AUTH_PATH_LOGIN } from "../../constants";
import { updateModalStore } from "../../Stroes/menuModal.store";
import { MenuModalProps , AddMenu, UpdateMenu} from "../../types/Menu"


export default function MenuModal({
  modalStatus,
  closeModal,
  categories,
  fetchData,
  updateMenudata,
}: MenuModalProps) {
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();

  const [addMenu, setAddMenu] = useState<AddMenu>({
    categoryId: categories.length > 0 ? categories[0].id : 0,
    menuName: "",
    imageUrl: "",
    menuDescription: "",
    menuPrice: 0,
    isAvailable: false,
    menuOption: [
      {
        optionName: "옵션 없음",
        optionDetail: [
          {
            optionDetailName: "옵션 없음",
            additionalFee: 0,
          },
        ],
      },
    ],
  });

  const [checked, setChecked] = useState(false);
  const [updateChecked, setUpdateChecked] = useState(false);
  const [menuChecked, setMenuChecked] = useState(true);
  const [optionModal, setOptionModal] = useState(false);
  const [updateMenu , setUpdateMenu] = useState<UpdateMenu>(updateMenudata);
  const [updateOptionChecked, setUpdateOptionChecked] = useState(true);
  const [updateOptionModal, setUpdateOptionModal] = useState(false);
  const {updateModalState, updateModalOpen, updateModalClose} = updateModalStore();

  useEffect(() => {
    if (updateMenudata) {
      setUpdateMenu(updateMenudata);
    }
  }, [updateMenudata])

  const openOptionModal = () => {
    setOptionModal(true);
    setMenuChecked(true);
    
    setChecked(true);
  };

  const openUpdateModal = () => {
    setUpdateOptionModal(true);
    setUpdateOptionChecked(true);
  }

  const closeOptionModal = () => {
    setOptionModal(false);
    setMenuChecked(false);
    
    setChecked(false);
  };

  const closeUpdateModal = () => {
    setUpdateChecked(false);
    setUpdateOptionChecked(false);
  }

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

  const menuHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMenuChecked(event.target.checked);
  };

  const updateOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateOptionChecked(event.target.checked);
  }

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setAddMenu((prev) => ({
      ...prev,
      [name]: name !== "menuPrice" || "additionalFee" ? value : Number(value),
    }));
  };

  const changeUpdateHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUpdateMenu((prev) => ({
      ...prev,
      [name]: name !== "menuPrice" || "additionalFee" ?
      value : Number(value),
    }))
  }

  const changeOptionHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    optionIndex = 0
  ) => {
    const { name, value } = event.target;
    setAddMenu((prev) => ({
      ...prev,
      menuOption: prev.menuOption.map((option, index) =>
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
      menuOption: prev.menuOption.map((option, index) =>
        index === optionIndex
          ? {
              ...option,
              optionDetail: option.optionDetail.map((detail, dIndex) =>
                dIndex === detailIndex ? { ...detail, [name]: value } : detail
              ),
            }
          : option
      ),
    }));
  };

  const addNewOption = () => {
    setAddMenu((prev) => ({
      ...prev,
      menuOption: [
        ...prev.menuOption,
        {
          menuOptionId: 0,
          optionName: "",
          optionDetail: [
            {
              optionDetailName: "",
              additionalFee: 0,
            },
          ],
        },
      ],
    }));
  };

  const addNewOptionDetail = (optionIndex: number) => {
    setAddMenu(prev => ({
      ...prev,
      menuOption: prev.menuOption.map((option, index) => index === optionIndex ? {
        ...option,
        optionDetail: [
          ...option.optionDetail,
          { optionDetailName: "", additionalFee: 0}
        ]
      }
    : option)
    }));
  };

  const removeOption = (optionIndex: number) => {
    setAddMenu((prev) => ({
      ...prev,
      menuOption: prev.menuOption.filter((_, index) => index !== optionIndex),
    }));
  };

  const removeOptionDetail = (optionIndex: number, detailIndex: number) => {
    setAddMenu(prev => ({
      ...prev,
      menuOption: prev.menuOption.map((option, index) => index === optionIndex ? {
        ...option,
        optionDetail: option.optionDetail.filter((_, dIndex) => dIndex !== detailIndex)
      } : option)
    }))
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddMenu({ ...addMenu, isAvailable: event.target.checked });
  };

  const changeValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAddMenu({ ...addMenu, categoryId: Number(e.target.value) });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {};

  const menuAdd = async () => {
    try {
      const token = cookies.token;
      console.log(token);
      console.log(addMenu);
      if (addMenu.menuName === "") {
        alert("메뉴명을 입력해주세요");
      } else if (addMenu.menuDescription === "") {
        alert("메뉴 설명을 입력해주세요");
      } else if (addMenu.menuPrice === 0) {
        alert("메뉴 가격을 입력해주세요");
      } else if (addMenu.categoryId === 0) {
        alert("메뉴 카테고리를 선택해주세요");
      } else {
      await axios.post(`http://localhost:4041/api/v1/menus/add`, addMenu, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAddMenu({
        categoryId: 0,
        menuName: "",
        imageUrl: "",
        menuDescription: "",
        menuPrice: 0,
        isAvailable: false,
        menuOption: [
          {
            optionName: "옵션 없음",
            optionDetail: [
              {
                optionDetailName: "옵션 없음",
                additionalFee: 0,
              },
            ],
          },
        ],
      });
      setChecked(false);
      setMenuChecked(false);
      closeModal();
      fetchData();
    }
    } catch (e) {
      console.error("토큰 없음");
      alert("다시 로그인 해주세요");
      closeModal();
      navigate(AUTH_PATH_LOGIN);
    }
  };
  useEffect(() => {}, [addMenu]);

  console.log(updateMenu.menuOption);
  console.log(updateMenu.menuOption.length);
  return (
    <>
      <Modal open={modalStatus} onClose={closeModal}>
        <div css={s.inputMenu}>
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
            <div>이미지</div>
            <input type="file" onChange={handleFileChange} required />
          </div>
          <div>
            <div>메뉴 설명</div>
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
            <div>메뉴 가격</div>
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
            <div>메뉴 카테고리 선택</div>
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
            <div>메뉴 판매 가능 여부</div>
            <input
              type="checkbox"
              checked={addMenu.isAvailable}
              onChange={handleCheckboxChange}
            />
          </div>
          <FormControlLabel
            control={<Switch checked={checked} onChange={handleChange} />}
            label="옵션 추가"
          />
          <Modal open={checked} onClose={closeOptionModal}>
            <div css={s.optionModal}>
              <Box sx={{ display: "flex" }}>
                <Fade in={checked}>
                  {checked ? (
                    <div>
                      {addMenu.menuOption.map((option, optionIndex) => (
                        <div key={optionIndex} css={s.option}>
                          <div>
                            <div>
                              옵션 카테고리
                              <button
                                onClick={() => removeOption(optionIndex)}
                                css={s.cancel}
                              >
                                옵션 삭제
                              </button>
                            </div>

                            <input
                              type="text"
                              css={s.submitMenu}
                              name="optionName"
                              value={option.optionName}
                              onChange={(event) =>
                                changeOptionHandler(event, optionIndex)
                              }
                            />
                          </div>
                          <FormControlLabel
                            control={
                              <Switch
                                checked={menuChecked}
                                onChange={menuHandleChange}
                              />
                            }
                            label="옵션 정보 추가"
                          />
                          <Box sx={{ display: "flex" }}>
                            <Fade in={menuChecked}>
                              {menuChecked ? (
                                <div css={s.optionDetail}>
                                  {option.optionDetail.map((detail, detailIndex) => (
                                    <div key={detailIndex} css={s.optionAdd}>
                                      <div>추가 옵션명</div>
                                    
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
                                    <div css={s.optionAdd}>추가 옵션 가격</div>
                                    <input
                                      type="number"
                                      css={s.submitMenu}
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
                                    <button css={s.cancel} onClick={() => removeOptionDetail(optionIndex, detailIndex)}>추가 옵션 삭제</button>
                                  </div>
                                  ))}
                                  <button onClick={() => addNewOptionDetail(optionIndex)}>추가 옵션 추가</button>
                                  
                                </div>
                              ) : (
                                <div>not1</div>
                              )}
                            </Fade>
                          </Box>
                        </div>
                      ))}
                      <div>
                        <button onClick={addNewOption}>옵션 추가</button>
                      </div>
                      <div css={s.optionConfirm}>
                        <div css={s.optionCheck}>
                          <button onClick={closeOptionModal}>확인</button>
                        </div>
                        <div>
                          <button onClick={closeOptionModal}>취소</button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>not2</div>
                  )}
                </Fade>
              </Box>
            </div>
          </Modal>
          <div css={s.modalButton}>
            <div>
              <button css={s.modalSubmitButton} onClick={menuAdd}>
                저장
              </button>
            </div>
            <div>
              <button css={s.modalCancleButton} onClick={closeModal}>
                취소
              </button>
            </div>
          </div>
        </div>
      </Modal>



      {/* 업데이트 모달창 부분 */}
      <Modal open={updateModalState} onClose={updateModalClose}>
        <div css={s.inputMenu}>
          <div>
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
            <div>이미지</div>
            <input type="file" onChange={handleFileChange} required value={updateMenu.imageUrl}/>
          </div>
          <div>
            <div>메뉴 설명</div>
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
            <div>메뉴 가격</div>
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
            <div>메뉴 카테고리 선택</div>
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
            control={<Switch checked={updateChecked} onChange={handleUpdateChange} />}
            label="옵션 추가"
          />
          <Modal open={updateChecked} onClose={closeUpdateModal}>
            <div css={s.optionModal}>
              <Box sx={{ display: "flex" }}>
                <Fade in={updateChecked}>
                  {updateChecked ? (
                    <div>
                      {updateMenu.menuOption && updateMenu.menuOption.length > 0 && (
                      updateMenu.menuOption.map((option, optionIndex) => (
                        <div key={optionIndex} css={s.option}>
                          <div>
                            <div>
                              옵션 카테고리
                              <button
                                onClick={() => removeOption(optionIndex)}
                                css={s.cancel}
                              >
                                옵션 삭제
                              </button>
                            </div>

                            <input
                              type="text"
                              css={s.submitMenu}
                              name="optionName"
                              value={option.optionName}
                              onChange={(event) =>
                                changeOptionHandler(event, optionIndex)
                              }
                            />
                          </div>
                          <FormControlLabel
                            control={
                              <Switch
                                checked={updateOptionChecked}
                                onChange={updateOptionChange}
                              />
                            }
                            label="옵션 정보 추가"
                          />
                          <Box sx={{ display: "flex" }}>
                            <Fade in={updateOptionChecked}>
                              {updateOptionChecked ? (
                                <div css={s.optionDetail}>
                                  {option.optionDetail && option.optionDetail.length > 0 && (
                                  option.optionDetail.map((detail, detailIndex) => (
                                    <div key={detailIndex} css={s.optionAdd}>
                                      <div>추가 옵션명</div>
                                    
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
                                    <div css={s.optionAdd}>추가 옵션 가격</div>
                                    <input
                                      type="number"
                                      css={s.submitMenu}
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
                                    <button css={s.cancel} onClick={() => removeOptionDetail(optionIndex, detailIndex)}>추가 옵션 삭제</button>
                                  </div>
                                  )))}
                                  <button onClick={() => addNewOptionDetail(optionIndex)}>추가 옵션 추가</button>
                                  
                                </div>
                              ) : (
                                <div>not3</div>
                              )}
                            </Fade>
                          </Box>
                        </div>
                      )))}
                      <div>
                        <button onClick={addNewOption}>옵션 추가</button>
                      </div>
                      <div css={s.optionConfirm}>
                        <div css={s.optionCheck}>
                          <button onClick={closeUpdateModal}>확인</button>
                        </div>
                        <div>
                          <button onClick={closeUpdateModal}>취소</button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>not4</div>
                  )}
                </Fade>
              </Box>
            </div>
          </Modal>
          <div css={s.modalButton}>
            <div>
              <button css={s.modalSubmitButton} onClick={menuAdd}>
                저장
              </button>
            </div>
            <div>
              <button css={s.modalCancleButton} onClick={updateModalClose}>
                취소
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
