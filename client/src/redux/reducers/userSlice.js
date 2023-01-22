import { ADD_USER_DETAILS, REMOVE_USER_DETAILS_LOGOUT } from '../actionTypes/actionTypes';
const initialState = {
  email: '',
  name: '',
  token: '',
  role: '',
  _id: '',//react ma id matra hunxa but najhukkiyo vanera sabai tira _id garna sakiyo
};

const userSlice = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER_DETAILS:
      const { name, email, role, _id } = action.payload//server le _id pathauxa yesma chahi _id nai rakhnuparxa
      return {
        ...state,
        name,
        email,
        role,
        _id,
      };
    case REMOVE_USER_DETAILS_LOGOUT:
      // const { name, email} = action.payload
      return {
        ...state,
        name: '',
        email: ''
      };
    default:
      return state;
  }
};
export default userSlice;
