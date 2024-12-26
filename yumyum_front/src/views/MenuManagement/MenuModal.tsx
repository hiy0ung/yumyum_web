/** @jsxImportSource @emotion/react */
import { Box, Fade, FormControlLabel, Modal, Switch } from "@mui/material";
import React, { useState } from "react";
import * as s from "./Style";
import axios from "axios";
import { useCookies } from "react-cookie";

interface Menu {
  menuName: string;
  imageUrl: string;
  menuDescription: string;
  menuPrice: number;
  isAvailable: boolean;
}

interface Category {
  id: number;
  menuCategory: String;
  menuCategorySequence: number;
}



interface MenuModalProps {
  modalStatus: boolean;
  closeModal:() => void;
  categories: Category[];
}



interface AddMenu {
  categoryId: number;
  menuName: string;
  imageUrl: string;
  menuDescription: string;
  menuPrice: number;
  isAvailable: boolean;
  menuOption: [{
    optionName: string;
    optionDetail: [{
      optionDetailName: string;
      additionalFee: number; 
    }]
  }]
}

export default function MenuModal({ modalStatus, closeModal, categories }: MenuModalProps) {
  const [cookies] = useCookies(['token'])

  const [addMenu, setAddMenu] = useState<AddMenu>({
    categoryId: 0,
    menuName: "",
    imageUrl: "",
    menuDescription: "",
    menuPrice: 0,
    isAvailable: false,
    menuOption: [{
      optionName: "옵션 없음",
      optionDetail: [{
        optionDetailName: "옵션 없음",
        additionalFee: 0
      }]
    }]
  })

  const [checked, setChecked] = useState(false);
  const [menuChecked, setMenuChecked] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const menuHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMenuChecked(event.target.checked);
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setAddMenu((prev) => ({
      ...prev,
      [name]: name !== "menuPrice" || "additionalFee" ? value : Number(value),
    }));
  };


  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddMenu({ ...addMenu, isAvailable: event.target.checked });
  };

  const changeValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    setAddMenu({ ...addMenu, categoryId: Number(e.target.value)})
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {};


  const menuAdd = async () => {
    try {
      const token = cookies.token;
      console.log(addMenu);
      await axios.post(`http://localhost:4041/api/v1/menus/add`, addMenu, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      closeModal()
    } catch(e) {
      console.error("토큰 없음");
    }
    
  };


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
            <select css={s.submitMenu} name="menuCategory" onChange={changeValue} >
              {categories.map((category, index) => (
                <option value={index + 1}>{category.menuCategory}</option>
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
                        control={
                          <Switch checked={checked} onChange={handleChange} />
                        }
                        label="옵션 추가"
                      />
                      <Box sx={{ display: "flex" }}>
                        <Fade in={checked}>
                          {checked ? (
                            <div>
                              <div>
                                <div>옵션명</div>
                                <input type="text" css={s.submitMenu} name="optionName" value={addMenu.menuOption[0].optionName} onChange={changeHandler}/>
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
                                    <div>
                                      <div>추가 메뉴명</div>
                                      <input type="text" css={s.submitMenu} name="optionDetailName" value={addMenu.menuOption[0].optionDetail[0].optionDetailName} onChange={changeHandler}/>
                                      <div>추가 메뉴 가격</div>
                                      <input type="number" css={s.submitMenu} name="additionalFee" value={addMenu.menuOption[0].optionDetail[0].additionalFee} onChange={changeHandler}/>
                                    </div>
                                  ) : (
                                    <div>not</div>
                                  )}
                                </Fade>
                              </Box>
                            </div>
                          ) : (
                            <div>not</div>
                          )}
                        </Fade>
                      </Box>

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
    </>
  );
}
