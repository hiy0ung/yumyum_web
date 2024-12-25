/** @jsxImportSource @emotion/react */
import axios from "axios";
import React, { useEffect, useState } from "react";
import * as s from "./Style";
import Modal from "@mui/material/Modal";
import { Box, Fade, FormControlLabel, Switch } from "@mui/material";

interface Menus {
  menuId: number;
  menuCategory: string;
  menuName: string;
  imageUrl: string;
  menuDescription: string;
  menuPrice: number;
  isAvailable: boolean;
  menuOptions: {
    menuOptionId: number;
    optionName: string;
    optionDetails: {
      detailId: number;
      optionDetailName: string;
      additiionalFee: number;
    };
  };
}

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

interface AddCategory {
  menuCategory: string;
  menuCategorySequence: number;
}

export default function MenuManagement() {
  const [menu, setMenu] = useState<Menu>({
    menuName: "",
    imageUrl: "",
    menuDescription: "",
    menuPrice: 0,
    isAvailable: false,
  });
  const [AddCategory, setAddCategory] = useState<AddCategory>({
    menuCategory: "",
    menuCategorySequence: 0,
  });
  const [menus, setMenus] = useState<Menus[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryModalOepn, setIsCategoryModalOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [menuChecked, setMenuChecked] = useState(false);

  const categoryOpenModal = () => setIsCategoryModalOpen(true);
  const categoryCloseModal = () => {
    setIsCategoryModalOpen(false);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setMenu({
      menuName: "",
      imageUrl: "",
      menuDescription: "",
      menuPrice: 0,
      isAvailable: false,
    });
    setChecked(true);
    setMenuChecked(true);
    setIsModalOpen(false);
  };

  const fetchCategoryData = async () => {
    try {
      const data = await axios.get(
        `http://localhost:4041/api/v1/categories/get`
      );
      setCategories(data.data.data);
    } catch (e) {
      console.log("object");
    }
  };

  const fetchData = async () => {
    try {
      const data = await axios.get(`http://localhost:4041/api/v1/menus/`);
      setMenus(data.data.data);
    } catch (e) {
      console.log("object");
    }
  };

  const menuAdd = async () => {
    try {
      await axios.post(`http://localhost:4041/api/v1/add`, menu);
      // closeModal()
    } catch (e) {
      console.error("object");
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const menuHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMenuChecked(event.target.checked);
  };

  const updateCategorySequence = async (updatedCategories: Category[]) => {
    setCategories(updatedCategories);

    for (const category of updatedCategories) {
      await axios.put(`http://localhost:4041/api/v1/categories/sequence`, {
        id: category.id,
        menuCategorySequence: category.menuCategorySequence,
      });
    }
  };

  const CategorySubmit = async () => {
    try {
      for (const category of categories) {
        if (category.menuCategory === AddCategory.menuCategory) {
          alert("이미 추가된 카테고리 명 입니다.");
          return;
        }
        if (
          category.menuCategorySequence === AddCategory.menuCategorySequence
        ) {
          alert("이미 추가되있는 카테고리 순번입니다.");
          return;
        }
        if(AddCategory.menuCategory === "") {
          alert("빈 값은 추가할 수 없습니다.");
          return;
        }
      }
      console.log(AddCategory);
      await axios.post(`http://localhost:4041/api/v1/categories/post`, {
        menuCategory: AddCategory.menuCategory,
        menuCategorySequence: AddCategory.menuCategorySequence,
      });
    } catch (e) {
      console.error("오류");
    }
    alert("성공적으로 추가되었습니다.")
    fetchCategoryData();
    setIsCategoryModalOpen(false);
  };
  useEffect(() => {
    fetchData();
    fetchCategoryData();
  }, []);

  useEffect(() => {
    setAddCategory({
      menuCategory: "",
      menuCategorySequence: categories.length + 1
    })
  }, [categories]);



  const upChange = (index: number) => {
    if (index === 0) return;
    const updatedCategories = [...categories];
    const temp = updatedCategories[index];
    updatedCategories[index] = updatedCategories[index - 1];
    updatedCategories[index - 1] = temp;

    updatedCategories[index].menuCategorySequence += 1;
    updatedCategories[index - 1].menuCategorySequence -= 1;

    updateCategorySequence(updatedCategories);
  };

  const downChange = (index: number) => {
    if (index === categories.length - 1) return;
    const updatedCategories = [...categories];
    const temp = updatedCategories[index];
    updatedCategories[index] = updatedCategories[index + 1];
    updatedCategories[index + 1] = temp;

    updatedCategories[index].menuCategorySequence -= 1;
    updatedCategories[index + 1].menuCategorySequence += 1;

    updateCategorySequence(updatedCategories);
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setMenu((prev) => ({
      ...prev,
      [name]: name !== "menuPrice" ? value : Number(value),
    }));
  };

  const categoryChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddCategory((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMenu({ ...menu, isAvailable: event.target.checked });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {};

  console.log(menus);
  console.log(categories);
  return (
    <>
      <div css={s.menuAll}>
        <div css={s.topMenu}>
          <div css={s.selectMenu}>
            <div css={s.selectMenuName}>
              <input type="text" placeholder="메뉴명을 입력하세요" />
            </div>
            <div css={s.selectMenuCategory}>
              <select name="categorySelect" id="categories">
                <option>전체</option>
                {categories.map((category) => (
                  <option>{category.menuCategory}</option>
                ))}
              </select>
            </div>
          </div>
          <div css={s.addMenu}></div>
          <button onClick={categoryOpenModal}>카테고리 추가</button>
          <Modal open={categoryModalOepn} onClose={categoryCloseModal}>
            <div css={s.inputMenu}>
              {categories.map((category, index) => (
                <li key={category.id} css={s.addCategory}>
                  {index + 1}. {category.menuCategory}
                </li>
              ))}
              <FormControlLabel
                control={
                  <Switch
                    checked={checked}
                    onChange={handleChange}
                    css={s.modalCategory}
                  />
                }
                label="카테고리 추가"
              />
              <Box sx={{ display: "flex" }}>
                <Fade in={checked}>
                  <div>
                    <div>
                      <div>카테고리명</div>
                      <input
                        type="text"
                        name="menuCategory"
                        value={AddCategory.menuCategory}
                        onChange={categoryChangeHandler}
                      />
                      <div>카테고리 순번</div>
                      <input
                        type="number"
                        name="menuCategorySequence"
                        value={AddCategory.menuCategorySequence}
                        onChange={categoryChangeHandler}
                      />
                    </div>
                    <button css={s.categorySubmit} onClick={CategorySubmit}>
                      저장
                    </button>
                  </div>
                </Fade>
              </Box>
            </div>
          </Modal>
        </div>
        <div>
          <ul>
            {categories.map((category, index) => (
              <li key={category.id}>
                <h2 className="h2">{category.menuCategory}</h2>
                <button onClick={() => upChange(index)}>올리기</button>
                <button onClick={() => downChange(index)}>내리기</button>
                <ul>
                  {menus
                    .filter(
                      (menu) => menu.menuCategory === category.menuCategory
                    )
                    .map((menu) => (
                      <li>
                        <div css={s.menu}>
                          <div>{menu.imageUrl}</div>
                          <div>{menu.menuName}</div>
                          <div>{menu.menuDescription}</div>
                          <div>{menu.menuPrice}</div>
                          <div>{menu.isAvailable ? "가능" : "불가능"}</div>
                        </div>
                      </li>
                    ))}
                  <Modal open={isModalOpen} onClose={closeModal}
                    style={{
                      backgroundColor:"white",
                    }}
                  >
                    <div css={s.inputMenu}>
                      <div>
                        <div>메뉴명</div>
                        <input
                          css={s.submitMenu}
                          type="text"
                          name="menuName"
                          value={menu.menuName}
                          onChange={changeHandler}
                          required
                        />
                      </div>
                      <div>
                        <div>이미지</div>
                        <input
                          type="file"
                          onChange={handleFileChange}
                          required
                        />
                      </div>
                      <div>
                        <div>메뉴 설명</div>
                        <input
                          css={s.submitMenu}
                          type="text"
                          name="menuDescription"
                          value={menu.menuDescription}
                          onChange={changeHandler}
                          required
                        />
                      </div>
                      <div>
                        <div>메뉴 가격</div>
                        <input
                          css={s.submitMenu}
                          type="text"
                          name="menuPrice"
                          value={menu.menuPrice}
                          onChange={changeHandler}
                          required
                        />
                      </div>
                      <div>
                        <div>메뉴 카테고리 선택</div>
                        <select css={s.submitMenu} name="menuCategory" id="">
                          {categories.map((category) => (
                            <option>{category.menuCategory}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <div>메뉴 판매 가능 여부</div>
                        <input
                          type="checkbox"
                          checked={menu.isAvailable}
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
                                <input type="text" />
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
                                      <input type="text" />
                                      <div>추가 메뉴 가격</div>
                                      <input type="number" />
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
                          <button
                            css={s.modalCancleButton}
                            onClick={closeModal}
                          >
                            취소
                          </button>
                        </div>
                      </div>
                    </div>
                  </Modal>
                </ul>
              </li>
            ))}
          </ul>
          <button onClick={openModal}>메뉴추가</button>
        </div>
      </div>
    </>
  );
}
