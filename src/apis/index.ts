export const BASE_URL = 'http://localhost:4041';
export const API_BASE_URL = `${BASE_URL}/api/v1`;

export const AUTH_API = {
  LOGIN: `${API_BASE_URL}/auth/log-in`,
  SIGNUP: `${API_BASE_URL}/auth/sign-up`, 
  FIND_ID: `${API_BASE_URL}/mail/send/id`,
  FIND_PASSWORD: `${API_BASE_URL}/mail/send/password`,
  RESET_PASSWORD: `${API_BASE_URL}/auth/password/reset`,
  SNS_SIGN_UP: `${API_BASE_URL}/auth/sns-sign-in/`, 
  SNS_SIGN_IN: `${API_BASE_URL}/auth/sns-sign-in/`, 
  SIGN_UP_SEARCH_USER_ID: `${API_BASE_URL}/auth/sign-up/search/user-id`, 
  SIGN_UP_SEARCH_USER_EMAIL: `${API_BASE_URL}/auth/sign-up/search/user-email`, 
  SIGN_UP_SEARCH_USER_BUSINESS_NUMBER: `${API_BASE_URL}/auth/sign-up/search/user-business-number`,
};

export const MYPAGE_API = {
  GET_USER: `${API_BASE_URL}/mypage`,
  DELETE_USER: `${API_BASE_URL}/mypage`, 
  UPDATE_USER: `${API_BASE_URL}/mypage`, 
};

export const STORE_API = {
  GET_STORE: `${API_BASE_URL}/stores/info`,
  CREATE_STORE: `${API_BASE_URL}/stores`, 
  UPDATE_STORE: `${API_BASE_URL}/stores`, 
  DELETE_STORE: `${API_BASE_URL}/stores`, 
};

export const CONTACT_API = {
  SEND_CONTACT: `${API_BASE_URL}/contact`,
};


export const PERIOD_STATS_API = {
  DAILY: (date: string) => `${API_BASE_URL}/stats/daily/${date}`,
  MONTHLY: (date: string) => `${API_BASE_URL}/stats/month/${date}`,
  YEARLY: (date: string) => `${API_BASE_URL}/stats/year/${date}`, 
};

export const TIME_STATS_API = {
  REVENUE: (date: string) => `${API_BASE_URL}/stats/revenue/${date}T00:00:00`,
  QUANTITY: (date: string) => `${API_BASE_URL}/stats/time/quantity/${date}T00:00:00`,
};

export const MENU_STATS_API = {
  TODAY: `${API_BASE_URL}/stats/menus/today`,
  DAY: (date: string) => `${API_BASE_URL}/stats/menus/day/${date}`,
  MONTH: (date: string) => `${API_BASE_URL}/stats/menus/month/${date}`,
};

export const REVIEW_API = {
  TOTAL_RATING: `${API_BASE_URL}/reviews/rating`,
  MONTHLY_RATING: (date: string) => `${API_BASE_URL}/reviews/rating/month?date=${date}`,
  GET_REVIEWS: `${API_BASE_URL}/reviews`,
  ADD_COMMENT: (reviewId: string | undefined) => `${API_BASE_URL}/reviews/comment/${reviewId}`,
  DELETE_COMMENT: (reviewId: string | undefined) => `${API_BASE_URL}/reviews/comment/${reviewId}`,
};

export const REVIEW_NOTICE_API = {
  GET: `${API_BASE_URL}/reviews/notice`,
  CREATE: `${API_BASE_URL}/reviews/notice`,
  DELETE: (noticeId: number) => `${API_BASE_URL}/reviews/notice/${noticeId}`,
};

export const REVIEW_NOTICE_IMAGE_UPLOAD = {
  UPLOAD: (imgUrl: string) => `${API_BASE_URL}/image/upload/${imgUrl}`,
};

export const ORDER_API = {
  GET_ORDERS: `${API_BASE_URL}/orders`,
  GET_ORDER_DETAIL: (orderId: number) => `${API_BASE_URL}/orders/detail/${orderId}`,
  UPDATE_ORDER_STATE: (orderId: number) => `${API_BASE_URL}/orders/state/${orderId}`,
};

export const CATEGORY_API = {
  GET_CATEGORIES: `${API_BASE_URL}/categories`,
  CREATE_CATEGORY: `${API_BASE_URL}/categories`,
  UPDATE_SEQUENCE: `${API_BASE_URL}/categories/sequence`,
  DELETE_CATEGORY: (categoryId: number) => `${API_BASE_URL}/categories/${categoryId}`,
};

export const MENU_API = {
  GET_MENUS: `${API_BASE_URL}/menus`,
  GET_MENU: (menuId: number) => `${API_BASE_URL}/menus/${menuId}`,
  ADD_MENU: `${API_BASE_URL}/menus`,
  UPDATE_MENU: (menuId: number) => `${API_BASE_URL}/menus/${menuId}`,
  UPDATE_MENU_STATE: (menuId: number) => `${API_BASE_URL}/menus/state/${menuId}`,
  DELETE_MENU: (menuId: number) => `${API_BASE_URL}/menus/${menuId}`,
};

export const MENU_OPTION_API = {
  ADD_OPTION: `${API_BASE_URL}/menus/options`,
  DELETE_OPTION: (deleteOptionId: number) => `${API_BASE_URL}/menus/options/${deleteOptionId}`,
  
  ADD_OPTION_DETAIL: `${API_BASE_URL}/menus/options/details`,
  DELETE_OPTION_DETAIL: (deleteDetailId: number) => `${API_BASE_URL}/menus/options/details/${deleteDetailId}`,
};

export const IMAGE_API = {
  GET_IMAGE_PATH: (imageUrl: string) => `${BASE_URL}/image${imageUrl}`,
};