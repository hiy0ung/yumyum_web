/** @jsxImportSource @emotion/react */
import { Box, Fade, FormControlLabel, Modal, Switch } from "@mui/material";
import React, { useEffect, useState } from "react";
import * as s from "./Style";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { AUTH_PATH_LOGIN } from "../../constants";
import { updateModalStore } from "../../Stroes/menuModal.store";
import { MenuModalProps, AddMenu, UpdateMenu, Menus, MenuOptions, MenuOptionDetails } from "../../types/Menu";
import { serialize } from "v8";
import { Details } from "@mui/icons-material";

export default function MenuModal({
  modalStatus,
  closeModal,
  categories,
  fetchData,
  updateMenudata,
  updateOptionChecked,
  setUpdateOptionChecked,
  menus,
  selectedMenuId
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
  const [updateMenu, setUpdateMenu] = useState<UpdateMenu>(updateMenudata);
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

  const closeUpdateModal = () => {
    setUpdateChecked(false);
    setUpdateOptionChecked((updateMenu.menuOptions || []).map(() => false));
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
    // console.log(updateMenu);
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
    detailIndex = 0
  ) => {
    const { name, value } = event.target;
    setUpdateMenu((prev) => ({
      ...prev,
      menuOptions: prev.menuOptions.map((option, index) =>
        index === optionIndex
          ? {
              ...option,
              optionDetails: option.optionDetails.map((detail, dIndex) =>
                dIndex === detailIndex ? { ...detail, [name]: name !== "additionalFee" ? value : Number(value) } : detail
              ),
            }
          : option
      ),
    }))
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
          menuOptionId: 35,
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
                { optionDetailName: "", additionalFee: 0 },
              ],
            }
          : option
      ),
    }));
    
}

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
      menuOptions: prev.menuOptions.filter((_, index) => index !== optionIndex),
    }));
  };
  const removeUpdateOption = (optionIndex: number) => {
    setUpdateMenu((prev) => ({
      ...prev,
      menuOptions: prev.menuOptions.filter((_, index) => index !== optionIndex),
    }));
  };


  const removeOptionDetail = (optionIndex: number, detailIndex: number) => {
    setAddMenu((prev) => ({
      ...prev,
      menuOptions: prev.menuOptions.map((option, index) =>
        index === optionIndex
          ? {
              ...option,
              optionDetails: option.optionDetails.filter(
                (_, dIndex) => dIndex !== detailIndex
              ),
            }
          : option
      ),
    }));
  };
  const removeUpdateOptionDetail = (
    optionIndex: number,
    detailIndex: number
  ) => {
    setUpdateMenu((prev) => ({
      ...prev,
      menuOptions: prev.menuOptions.map((option, index) =>
        index === optionIndex
          ? {
              ...option,
              optionDetails: option.optionDetails.filter(
                (_, dIndex) => dIndex !== detailIndex
              ),
            }
          : option
      ),
    }));
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddMenu({ ...addMenu, isAvailable: event.target.checked });
  };

  const changeValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAddMenu({ ...addMenu, categoryId: Number(e.target.value) });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      console.log("File selected:", e.target.files[0]);
    }
  };

  const menuAdd = async () => {
    try {
      const token = cookies.token;
      console.log("Auth Token", token);
      try {
        const formData = new FormData();
        formData.append('categoryId', addMenu.categoryId.toString());
        formData.append('menuName', addMenu.menuName);
        formData.append('menuDescription', addMenu.menuDescription);
        formData.append('menuPrice', addMenu.menuPrice.toString());
        formData.append('isAvailable', addMenu.isAvailable.toString());

        addMenu.menuOptions.forEach((option, index) => {
          formData.append(`menuOptions[${index}].optionName`, option.optionName);

          option.optionDetails.forEach((detail, detailIndex) => {
            formData.append(`menuOptions[${index}].optionDetails[${detailIndex}].optionDetailName`, detail.optionDetailName);
            formData.append(`menuOptions[${index}].optionDetails[${detailIndex}].additionalFee`, detail.additionalFee.toString());
          });
        });
        
        if (file) {
          formData.append('imageUrl', file);
        } else {
          console.warn("no file");
        }
        formData.forEach((value, key) => {
          console.log(`${key}: ${value}`);
        } )
        
    
        if (addMenu.menuName === "") {
          alert("메뉴명을 입력해주세요");
        } else if (addMenu.menuDescription === "") {
          alert("메뉴 설명을 입력해주세요");
        } else if (addMenu.menuPrice === 0) {
          alert("메뉴 가격을 입력해주세요");
        } else if (addMenu.categoryId === 0) {
          alert("메뉴 카테고리를 선택해주세요");
        } else {
          const response = await axios.post(`http://localhost:4041/api/v1/menus/add`, formData, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data'
            },
          });
          console.log("Server Response:", response.data);
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
        if(axios.isAxiosError(e)) {
          console.error("사진 추가 안됨", e);
          console.error("에러 응답:", e.response);
          console.error("에러 코드:", e.code);
          console.error("요청:", e.request);
          console.error("메시지:", e.message);

        } else {
          console.error("사진 추가 안됨", e);
          console.log("안되는 이유가 뭐냐고");
          console.log(e);
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
        // console.log(menuId);
        const response = await axios.get(`http://localhost:4041/api/v1/menus/${menuId}`, 
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        const result = response.data.data;
        
        if(updateMenu.menuOptions.length > result.menuOptions.length) {
          console.log("옵션 추가 로직 실행");
          for(let i = result.menuOptions.length; i < updateMenu.menuOptions.length; i++){
            const result2 = await axios.post(`http://localhost:4041/api/v1/menus/options/add`, {
            menuId: menuId,
            optionName: "",
            optionDetails: []
          }, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          console.log(result2.data.data.menuOptionId);
          await axios.post(`http://localhost:4041/api/v1/menus/options/details/add`, {
            menuOptionId: result2.data.data.menuOptionId,
            optionDetailName: "",
            additionalFee: 0
          }, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
        }
        }
        const response1 = await axios.get(`http://localhost:4041/api/v1/menus/${menuId}`, 
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        const result1 = response1.data.data;
        console.log(updateMenu.menuOptions.length);
        console.log(updateMenu.menuOptions.map((menu) => menu.optionDetails.length));
        console.log(result.menuOptions.map((menu: MenuOptions) => menu.optionDetails.length));
        console.log("여긴가"+result1.menuOptions[1].menuOptionId);
        console.log(updateMenu.menuOptions.length);
        for(let i = 0; i < updateMenu.menuOptions.length; i++) {
          console.log("반복은 도나?" + i);
          if(updateMenu.menuOptions.map((menu) => menu.optionDetails.length)[i] > result.menuOptions.map((menu :MenuOptions) => menu.optionDetails.length)[i]) {
            console.log("옵션 디테일 추가 로직 실행");
            for(let j = 0; j < updateMenu.menuOptions.map((menu) => menu.optionDetails.length)[i] - result.menuOptions.map((menu: MenuOptions) => menu.optionDetails.length)[i]; i++) {
              console.log("416번째 줄"+i);
              await axios.post(`http://localhost:4041/api/v1/menus/options/details/add`, {
                menuOptionId: result.menuOptions[i].menuOptionId,
                optionDetailName: "",
                additionalFee: 0
            }, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            })
          }
        }
      }
        await axios.put(
          `http://localhost:4041/api/v1/menus/update/${menuId}`, updateMenu,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(updateMenu);
        console.log("Server Response:",response.data);
      } catch (e) {
        console.error(e);
      }
  
  };
  // console.log("updateMenu 출력");
  // console.log(updateMenu);
  // console.log(updateMenudata);
  // console.log(updatedMenuData);

  useEffect(() => {}, [addMenu]);
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
            <input type="file" id="imageUrl" onChange={handleFileChange} required />
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
                      {addMenu.menuOptions.map((option, optionIndex) => (
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
                                checked={menuChecked[optionIndex]}
                                onChange={(event) =>
                                  menuHandleChange(event, optionIndex)
                                }
                              />
                            }
                            label="옵션 정보 추가"
                          />
                          <Box sx={{ display: "flex" }}>
                            <Fade in={menuChecked[optionIndex]}>
                              {menuChecked ? (
                                <div css={s.optionDetail}>
                                  {option.optionDetails.map(
                                    (detail, detailIndex) => (
                                      <div key={detailIndex} css={s.optionAdd}>
                                        <div>추가 옵션명</div>

                                        <input
                                          type="text"
                                          css={s.submitMenu}
                                          name="optionDetailName"
                                          value={detail.optionDetailName}
                                          onChange={(event) =>
                                            changeDetailHandler(
                                              event,
                                              optionIndex,
                                              detailIndex
                                            )
                                          }
                                        />
                                        <div css={s.optionAdd}>
                                          추가 옵션 가격
                                        </div>
                                        <input
                                          type="number"
                                          css={s.submitMenu}
                                          name="additionalFee"
                                          value={detail.additionalFee}
                                          onChange={(event) =>
                                            changeDetailHandler(
                                              event,
                                              optionIndex,
                                              detailIndex
                                            )
                                          }
                                        />
                                        <button
                                          css={s.cancel}
                                          onClick={() =>
                                            removeOptionDetail(
                                              optionIndex,
                                              detailIndex
                                            )
                                          }
                                        >
                                          추가 옵션 삭제
                                        </button>
                                      </div>
                                    )
                                  )}
                                  <button
                                    onClick={() =>
                                      addNewOptionDetail(optionIndex)
                                    }
                                  >
                                    추가 옵션 추가
                                  </button>
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
            <input
              type="file"
              onChange={handleFileChange}
              required
              value={updateMenu.imageUrl}
            />
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
            control={
              <Switch checked={updateChecked} onChange={handleUpdateChange} />
            }
            label="옵션 추가"
          />
          <Modal open={updateChecked} onClose={closeUpdateModal}>
            <div css={s.optionModal}>
              <Box sx={{ display: "flex" }}>
                <Fade in={updateChecked}>
                  {updateChecked ? (
                    <div>
                      {updateMenu.menuOptions &&
                        updateMenu.menuOptions.length > 0 &&
                        updateMenu.menuOptions.map((option, optionIndex) => (
                          <div key={optionIndex} css={s.option}>
                            <div>
                              <div>
                                옵션 카테고리
                                <button
                                  onClick={() =>
                                    removeUpdateOption(optionIndex)
                                  }
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
                                  changeOptionUpdateHandler(event, optionIndex)
                                }
                              />
                            </div>
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={updateOptionChecked[optionIndex]}
                                  onChange={(event) =>
                                    updateOptionChange(event, optionIndex)
                                  }
                                />
                              }
                              label="옵션 정보 추가"
                            />
                            <Box sx={{ display: "flex" }}>
                              <Fade in={updateOptionChecked[optionIndex]}>
                                {updateOptionChecked[optionIndex] ? (
                                  <div css={s.optionDetail}>
                                    {option.optionDetails &&
                                      option.optionDetails.length > 0 &&
                                      option.optionDetails.map(
                                        (detail, detailIndex) => (
                                          <div
                                            key={detailIndex}
                                            css={s.optionAdd}
                                          >
                                            <div>추가 옵션명</div>

                                            <input
                                              type="text"
                                              css={s.submitMenu}
                                              name="optionDetailName"
                                              value={detail.optionDetailName}
                                              onChange={(event) =>
                                                changeUpdateDetailHandler(
                                                  event,
                                                  optionIndex,
                                                  detailIndex
                                                )
                                              }
                                            />
                                            <div css={s.optionAdd}>
                                              추가 옵션 가격
                                            </div>
                                            <input
                                              type="number"
                                              css={s.submitMenu}
                                              name="additionalFee"
                                              value={detail.additionalFee}
                                              onChange={(event) =>
                                                changeUpdateDetailHandler(
                                                  event,
                                                  optionIndex,
                                                  detailIndex
                                                )
                                              }
                                            />
                                            <button
                                              css={s.cancel}
                                              onClick={() =>
                                                removeUpdateOptionDetail(
                                                  optionIndex,
                                                  detailIndex
                                                )
                                              }
                                            >
                                              추가 옵션 삭제
                                            </button>
                                          </div>
                                        )
                                      )}
                                    <button
                                      onClick={() => addDetailOption(optionIndex)
                                      }
                                    >
                                      추가 옵션 추가
                                    </button>
                                  </div>
                                ) : (
                                  <div>not3</div>
                                )}
                              </Fade>
                            </Box>
                          </div>
                        ))}
                      <div>
                        <button onClick={() => addNewUpdateOption(selectedMenuId)}>옵션 추가</button>
                        {/* 수정부분분 */}
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
