/** @jsxImportSource @emotion/react */
import axios from "axios";
import React, { useEffect, useState } from "react";
import * as s from "./Style";
import Modal from "@mui/material/Modal";
import { Box, Fade, FormControlLabel, Switch } from "@mui/material";
import MenuModal from "./MenuModal";
import { updateModalStore, useModalStore } from "../../Store/menuModal.store";
import { useCookies } from "react-cookie";
import { Menus, Category, AddCategory, UpdateMenu, MenuOptions, MenuData } from "../../types/Menu"

export default function MenuManagement() {
  const [cookies] = useCookies(["token"]);
  const [AddCategory, setAddCategory] = useState<AddCategory>({
    menuCategory: "",
    menuCategorySequence: 0,
  });
  const [menus, setMenus] = useState<Menus[]>([]);
  const [menuImg, setMenuImg] = useState<any>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryModalOepn, setIsCategoryModalOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [updateOptionChecked, setUpdateOptionChecked] = useState<boolean[]>([]);
  const [selectedMenuId, setSelectedMenuId] = useState<number>(0);
  const [updateMenudata, setUpdateMenudata] = useState<UpdateMenu>({
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

  useEffect(() => {
    if(categories.length > 0) {
      setUpdateMenudata(prevState => ({
        ...prevState,
        categoryId: categories[0].id
      }));
    }
  }, [categories])

  const { updateModalState, updateModalOpen, updateModalClose} = updateModalStore();
  const { isModalOpen, openModal, closeModal } = useModalStore();

  const categoryOpenModal = () => setIsCategoryModalOpen(true);
  const categoryCloseModal = () => {
    setIsCategoryModalOpen(false);
  };
  const fetchCategoryData = async () => {
    const token = cookies.token;
    try {
      const data = await axios.get(
        `http://localhost:4041/api/v1/categories/get`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCategories(data.data.data);
      // console.log(data.data.data);
    } catch (e) {
      console.log("object");
    }
  };

  const fetchData = async () => {
    const token = cookies.token;
    try {
      const data = await axios.get(`http://localhost:4041/api/v1/menus/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMenus(data.data.data);
    } catch (e) {
      console.log("object");
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const stateIsAvailable = async (menuId: number) => {
    setMenus((prevMenu) =>
      prevMenu.map((menu) =>
        menu.menuId === menuId
          ? { ...menu, isAvailable: !menu.isAvailable }
          : menu
      )
    );
    const updateIsAvailable = menus.find((menu) => menu.menuId === menuId);

    if (updateIsAvailable) {
      menuId = updateIsAvailable.menuId;
      try {
        const token = cookies.token;
        const categoryId = getCategoryIdFromName(
          updateIsAvailable.menuCategory
        );
        await axios.put(
          `http://localhost:4041/api/v1/menus/update/${menuId}`,
          {
            categoryId: categoryId,
            menuName: updateIsAvailable.menuName,
            imageUrl: updateIsAvailable.imageUrl,
            menuDescription: updateIsAvailable.menuDescription,
            menuPrice: updateIsAvailable.menuPrice,
            isAvailable: !updateIsAvailable.isAvailable,
            menuOptions: updateIsAvailable.menuOptions,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (e) {
        console.error("오류");
      }
    }
  };

  const getCategoryIdFromName = (categoryName: string) => {
    const category = categories.find(
      (cate) => cate.menuCategory === categoryName
    );
    return category ? category.id : null;
  };

  const updateCategorySequence = async (updatedCategories: Category[]) => {
    setCategories(updatedCategories);
    const token = cookies.token;
    for (const category of updatedCategories) {
      await axios.put(
        `http://localhost:4041/api/v1/categories/sequence`,
        {
          id: category.id,
          menuCategorySequence: category.menuCategorySequence,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }
  };

  const CategorySubmit = async () => {
    try {
      const token = cookies.token;
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
      await axios.post(
        `http://localhost:4041/api/v1/categories/post`,
        {
          menuCategory: AddCategory.menuCategory,
          menuCategorySequence: AddCategory.menuCategorySequence,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (e) {
      console.error("오류");
    }
    alert("성공적으로 추가되었습니다.");
    fetchCategoryData();
    setIsCategoryModalOpen(false);
  };

  const deleteCategory = async (categoryId: number) => {
    try {
      await axios.delete(`http://localhost:4041/api/v1/categories/delete/${categoryId}`);

    } catch (e) {
      console.error(e);
      return;
    }
    alert("성공적으로 삭제되었습니다.");
    fetchCategoryData();

  }

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
  const getCategoryId = (categoryName: string) => {
    const category = categories.find(cate => cate.menuCategory === categoryName);
    return category ? category.id : 0;
  }
  const updateButton = async (menuId: number) => {
    const selectedMenu = menus.find(menu => menu.menuId === menuId);
    if (selectedMenu) {
      setUpdateMenudata({
        categoryId: getCategoryId(selectedMenu.menuCategory),
        menuName: selectedMenu.menuName,
        imageUrl: selectedMenu.imageUrl,
        menuDescription: selectedMenu.menuDescription,
        menuPrice: selectedMenu.menuPrice,
        isAvailable: selectedMenu.isAvailable,
        menuOptions: selectedMenu.menuOptions ? 
        selectedMenu.menuOptions.map((option: any) => ({
          ...option,
          optionDetails: option.optionDetails || [],
        })) : [],
      });
      
      setSelectedMenuId(menuId);
    }
    try {
      const data = await axios.get(`http://localhost:4041/api/v1/menus/${menuId}`);
      const result = data.data.data;
      const updatedMenuData = {
        ...result,
        menuOptions: result.menuOptions ? result.menuOptions.map((option: MenuOptions) => ({
          ...option,
          optionDetails: option.optionDetails || [],
        })) : [],
        
      };
      setUpdateMenudata(prev => ({
        ...prev,
        ...updatedMenuData
      }));

      const initialChecked = updatedMenuData.menuOptions.map(() => true);
      setUpdateOptionChecked(initialChecked);

      console.log("updated Menu Data:", updatedMenuData);

    } catch (e) {
      console.error(e);
    }
    updateModalOpen();
  }

  const deleteMenu = async (menuId: number) => {
    const token = cookies.token;

    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        await axios.delete(
          `http://localhost:4041/api/v1/menus/delete/${menuId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (e) {
        console.error("메뉴 삭제가 안됨");
      }
      alert("성공적으로 삭제되었습니다.");
      fetchData();
    } else {
      return;
    }
  };

  useEffect(() => {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      setMenuImg(e.target?.result);
    };
    menus.map((menu) => {
      if (!!menu.imageUrl) {
        // fileReader.readAsDataURL(menu.imageUrl);
      }
    })
  }, [menus])


  // console.log(menus);
  // console.log(menus.length);
  // console.log(categories);
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
                {categories.map((category, key) => (
                  <option key={category.id}>{category.menuCategory}</option>
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
                  <button onClick={() => deleteCategory(category.id)}>X</button>
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
                    {menus && menus.length > 0 ? (
                      menus.filter(
                        (menu: Menus) => menu.menuCategory === category.menuCategory
                      )
                      .map((menu: Menus) => (
                        <li key={menu.menuId}>
                          <div css={s.menu}>
                            <div css={s.menuImage}>

                              <img src={'http://localhost:4041/image' + menu.imageUrl} alt="파일 처리 안됨됨" />
                              
                            </div>
                            <div css={s.menuBody}>
                              <div css={s.menuName}>{menu.menuName}</div>
                              <div css={s.menuDescription}>
                                {menu.menuDescription}
                              </div>
                            </div>
                            <div css={s.menuFoot}>
                              <div css={s.menuButtonContainer}>
                                <button onClick={() => updateButton(menu.menuId)}>수정</button>
                                <button onClick={() => deleteMenu(menu.menuId)}>
                                  삭제
                                </button>
                              </div>
                              <div css={s.menuIsAvailable}>
                                메뉴 판매 가능 여부
                                <Switch
                                  checked={menu.isAvailable}
                                  onClick={() => stateIsAvailable(menu.menuId)}
                                />
                              </div>
                              <div css={s.menuPrice}>
                                가격: {menu.menuPrice}원
                              </div>
                            </div>
                          </div>
                        </li>
                      ))) : (
                        <li>메뉴 없음</li>
                      )}
                  </ul>
                </li>
              ))
            ) : (
              <>
                <div>카테고리 없음</div>
              </>
            )}
          </ul>
          <button onClick={openModal}>메뉴추가</button>
          <MenuModal
            modalStatus={isModalOpen}
            closeModal={closeModal}
            categories={categories}
            fetchData={fetchData}
            updateMenudata={updateMenudata}
            updateOptionChecked={updateOptionChecked}
            setUpdateOptionChecked={setUpdateOptionChecked}
            menus={menus}
            selectedMenuId={selectedMenuId}
          />
        </div>
      </div>
    </>
  );
}
