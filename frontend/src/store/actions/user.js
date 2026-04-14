// FRONTEND AUTO: reviewed on 2026-04-14\r\nimport { userActions } from "../reducers/userReducers";

export const logout = () => (dispatch) => {
  dispatch(userActions.resetUserInfo());
  localStorage.removeItem("account");
};

