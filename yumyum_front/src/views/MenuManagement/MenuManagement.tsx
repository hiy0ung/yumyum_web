/** @jsxImportSource @emotion/react */
import axios from "axios";
import React, { useEffect, useState } from "react";
import * as s from "./Style";
import Modal from "@mui/material/Modal";
import { Box, Fade, FormControlLabel, Switch } from "@mui/material";
import MenuModal from "./MenuModal";
import { useModalStore } from "../../Stroes/menuModal.store";
import { useCookies } from "react-cookie";
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
  const [cookies] = useCookies(['token']);
  const [AddCategory, setAddCategory] = useState<AddCategory>({
    menuCategory: "",
    menuCategorySequence: 0,
  });
  const [menus, setMenus] = useState<Menus[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryModalOepn, setIsCategoryModalOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const { isModalOpen, openModal, closeModal } = useModalStore();

  const categoryOpenModal = () => setIsCategoryModalOpen(true);
  const categoryCloseModal = () => {
    setIsCategoryModalOpen(false);
  };
  const fetchCategoryData = async () => {
    const token = cookies.token;
    try {
      const data = await axios.get(
        `http://localhost:4041/api/v1/categories/get`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
      setCategories(data.data.data);
    } catch (e) {
      console.log("object");
    }
  };

  const fetchData = async () => {
    const token = cookies.token;
    try {
      const data = await axios.get(`http://localhost:4041/api/v1/menus/`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setMenus(data.data.data);
    } catch (e) {
      console.log("object");
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const stateIsAvailable = (index: number) => {
    setMenus(prevMenu => {
      const updateMenus = prevMenu.map((menu) => menu.menuId === index ? { ...menu, isAvailable: !menu.isAvailable} : menu);
      return updateMenus;
    })
  }

  const updateCategorySequence = async (updatedCategories: Category[]) => {
    setCategories(updatedCategories);
    const token = cookies.token;
    for (const category of updatedCategories) {
      await axios.put(`http://localhost:4041/api/v1/categories/sequence`, {
        id: category.id,
        menuCategorySequence: category.menuCategorySequence,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    }
  };

  const CategorySubmit = async () => {
    try {
      const token = cookies.token;
      console.log("Token:", token);
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
        if (AddCategory.menuCategory === "") {
          alert("빈 값은 추가할 수 없습니다.");
          return;
        }
      }
      console.log("Category to add:", AddCategory);
      await axios.post(`http://localhost:4041/api/v1/categories/post`, {
        menuCategory: AddCategory.menuCategory,
        menuCategorySequence: AddCategory.menuCategorySequence,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    } catch (e) {
      console.error("오류");
    }
    alert("성공적으로 추가되었습니다.");
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
      menuCategorySequence: categories.length + 1,
    });
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

  const categoryChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddCategory((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const deleteMenu = async (menuId: number) => {
    const token = cookies.token;
    
      if(window.confirm("정말 삭제하시겠습니까?")) {
        try {
        await axios.delete(`http://localhost:4041/api/v1/menus/delete/${menuId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      } catch (e) {
        console.error("메뉴 삭제가 안됨");
      }
      alert("성공적으로 삭제되었습니다.");
      fetchData();
    } else {
      return;
    }
  }

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
                <div css={s.categoryCancle}>
                  <button onClick={categoryCloseModal}>취소</button>
                </div>
              </Box>
            </div>
          </Modal>
        </div>
        <div>
          <ul>
            {categories && categories.length > 0 ? (
              categories.map((category, index) => (
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
                        <li key={menu.menuId}>
                          <div css={s.menu}>
                            <div css={s.menuImage}>{menu.imageUrl}
                            </div>
                            <div css={s.menuBody}>
                              <div css={s.menuName}>{menu.menuName}</div>
                              <div css={s.menuDescription}>
                                {menu.menuDescription}
                              </div>
                            </div>
                            <div css={s.menuFoot}>
                              <div css={s.menuButtonContainer}>
                                <button>수정</button>
                                <button onClick={() => deleteMenu(menu.menuId)}>삭제</button>
                              </div>
                              <div css={s.menuIsAvailable}>
                                메뉴 판매 가능 여부
                                <Switch checked={menu.isAvailable} onClick={() => stateIsAvailable(menu.menuId)}/>
                              </div>
                              <div css={s.menuPrice}>가격: {menu.menuPrice}원</div>
                            </div>
                          </div>
                        </li>
                      ))}
                  </ul>
                </li>
              ))
            ) : (
              <>
                <div>카테고리없음</div>
              </>
            )}
          </ul>
          <button onClick={openModal}>메뉴추가</button>
          <MenuModal
            modalStatus={isModalOpen}
            closeModal={closeModal}
            categories={categories}
            fetchData={fetchData}
          />
        </div>
      </div>
    </>
  );
}
