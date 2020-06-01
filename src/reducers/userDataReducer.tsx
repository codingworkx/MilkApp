import { UPDATE_USER_DATA, DELETE_USER_DATA } from "../utils/constants";

const initialState = {
  uid: "",
  email: "",
  vendor_key: ""
};

const userDataReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case UPDATE_USER_DATA:
      return { ...state, ...action.payload };
    case DELETE_USER_DATA:
      return { ...initialState };
    default:
      return state;
  }
};

export default userDataReducer;