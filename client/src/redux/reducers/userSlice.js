import  ADD_USER_DETAILS from "../actionTypes/actionTypes";

const initialState = {
  email: '',
  name: '',
  token: ''
};

const userSlice = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER_DETAILS:
       const { name, email} = action.payload
      return {
        ...state,
        name,
        email
      };
    default:
      return state;
  }
};

export default userSlice;
