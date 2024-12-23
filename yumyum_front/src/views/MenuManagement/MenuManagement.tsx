/** @jsxImportSource @emotion/react */
import axios from "axios";
import React, { useEffect, useState } from "react";
import * as s from "./Style";
import Modal from "@mui/material/Modal";

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

export default function MenuManagement() {
  const [menu, setMenu] = useState<Menu>({
    menuName: "",
    imageUrl: "",
    menuDescription: "",
    menuPrice: 0,
    isAvailable: false,
  });
  const [menus, setMenus] = useState<Menus[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setMenu({
      menuName: "",
      imageUrl: "",
      menuDescription: "",
      menuPrice: 0,
      isAvailable: false,
    });
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

  const updateCategorySequence = async (updatedCategories: Category[]) => {
    setCategories(updatedCategories);

    for (const category of updatedCategories) {
      await axios.put(`http://localhost:4041/api/v1/categories/sequence`, {
        id: category.id,
        menuCategorySequence: category.menuCategorySequence,
      });
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchCategoryData();
  }, []);
  

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
          <div css={s.addMenu}>
            <button onClick={openModal}>메뉴추가</button>
            <Modal open={isModalOpen} onClose={closeModal}>
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
                  <input type="file" onChange={handleFileChange} required />
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
          </div>
        </div>
        <div>
          <ul>
            {categories.map((category, index) => (
              <li key={category.id}>
                {category.menuCategory}
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
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
