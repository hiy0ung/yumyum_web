export const BASE_URL = 'http://localhost:4041/api/v1';

export const AUTH_API = {
  LOGIN: `${BASE_URL}/auth/login`,
  SIGNUP: `${BASE_URL}/auth/signup`,
  FIND_ID: `${BASE_URL}/mail/send/id`,
  FIND_PASSWORD: `${BASE_URL}/mail/send/password`,
  CHANGE_PASSWORD: `${BASE_URL}/auth/password/change`,
  SNS_SIGN_UP: `${BASE_URL}/auth/sns-sign-in/`,
  SNS_SIGN_IN: `${BASE_URL}/auth/sns-sign-in/`,
  SIGN_UP_SEARCH_USER_ID: `${BASE_URL}/auth/signUp/search/userId`,
  SIGN_UP_SEARCH_USER_EMAIL: `${BASE_URL}/auth/signUp/search/userEmail`,
  SIGN_UP_SEARCH_USER_BUSINESS_NUMBER: `${BASE_URL}/auth/signUp/search/userBusinessNumber`,

};

export const STORE_API = {
  GET_STORE: `${BASE_URL}/stores/`,
  CREATE_STORE: `${BASE_URL}/stores`,
  UPDATE_STORE: `${BASE_URL}/stores`,
  DELETE_STORE: `${BASE_URL}/stores`,
};

export const CONTACT_API = {
  SEND_CONTACT: `${BASE_URL}/contact`,
};


export const PERIOD_STATS_API = {
  DAILY: (date: string) => `${BASE_URL}/stats/daily/${date}`,
  MONTHLY: (date: string) => `${BASE_URL}/stats/month/${date}`,
  YEARLY: (date: string) => `${BASE_URL}/stats/year/${date}`,
};

export const TIME_STATS_API = {
  REVENUE: (date: string) => `${BASE_URL}/stats/time/revenue/${date}T00:00:00`,
  QUANTITY: (date: string) => `${BASE_URL}/stats/time/quantity/${date}T00:00:00`,
};

export const MENU_STATS_API = {
  TODAY: `${BASE_URL}/stats/menus/today`,
  DAY: (date: string) => `${BASE_URL}/stats/menus/day/${date}`,
  MONTH: (date: string) => `${BASE_URL}/stats/menus/month/${date}`,
};

export const REVIEW_API = {
  TOTAL_RATING: `${BASE_URL}/reviews/rating`,
  MONTHLY_RATING: (date: string) => `${BASE_URL}/reviews/rating/month?date=${date}`,
  GET_REVIEWS: `${BASE_URL}/reviews`,
  ADD_COMMENT: (reviewId: string | undefined) => `${BASE_URL}/reviews/comment/create/${reviewId}`,
  DELETE_COMMENT: (reviewId: string | undefined) => `${BASE_URL}/reviews/comment/delete/${reviewId}`,
};

export const REVIEW_NOTICE_API = {
  GET: `${BASE_URL}/reviews/notice`,
  CREATE: `${BASE_URL}/reviews/notice/create`,
  DELETE: (noticeId: number) => `${BASE_URL}/reviews/notice/delete/${noticeId}`,
};

export const REVIEW_NOTICE_IMAGE_UPLOAD = {
  UPLOAD: (imgUrl: string) => `${BASE_URL}/image/upload/${imgUrl}`,
};

export const ORDER_API = {
  GET_ORDERS: `${BASE_URL}/orders`,
  GET_ORDER_DETAIL: (orderId: number) => `${BASE_URL}/orders/detail/${orderId}`,
  UPDATE_ORDER_STATE: (orderId: number) => `${BASE_URL}/orders/update/state/${orderId}`,
};

export const MYPAGE_API = {
  GET_USER: `${BASE_URL}/mypage`,
  DELETE_USER: `${BASE_URL}/mypage/delete`,
  UPDATE_USER: `${BASE_URL}/mypage/update`,
};

export const CATEGORY_API = {
  GET_CATEGORIES: `${BASE_URL}/categories/get`,
  CREATE_CATEGORY: `${BASE_URL}/categories/post`,
  UPDATE_SEQUENCE: `${BASE_URL}/categories/sequence`,
  DELETE_CATEGORY: (categoryId: number) => `${BASE_URL}/categories/delete/${categoryId}`,
};

export const MENU_API = {
  GET_MENUS: `${BASE_URL}/menus`,
  GET_MENU: (menuId: number) => `${BASE_URL}/menus/${menuId}`,
  ADD_MENU: `${BASE_URL}/menus/add`,
  UPDATE_MENU: (menuId: number) => `${BASE_URL}/menus/update/${menuId}`,
  UPDATE_MENU_STATE: (menuId: number) => `${BASE_URL}/menus/update/state/${menuId}`,
  DELETE_MENU: (menuId: number) => `${BASE_URL}/menus/delete/${menuId}`,
};

export const MENU_OPTION_API = {
  ADD_OPTION: `${BASE_URL}/menus/options/add`,
  DELETE_OPTION: (deleteOptionId: number) => `${BASE_URL}/menus/options/delete/${deleteOptionId}`,
  
  ADD_OPTION_DETAIL: `${BASE_URL}/menus/options/details/add`,
  DELETE_OPTION_DETAIL: (deleteDetailId: number) => `${BASE_URL}/menus/options/details/delete/${deleteDetailId}`,
};

export const IMAGE_API = {
  GET_IMAGE_PATH: (imageUrl: string) => `http://localhost:4041/image${imageUrl}`,
};