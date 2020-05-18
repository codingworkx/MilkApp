import { UPDATE_USER_DATA } from "../utils/constants";

const initialState = {
  uid: "",
  email: ""
};

const userDataReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case UPDATE_USER_DATA:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default userDataReducer;