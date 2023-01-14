import  {ADD_USER_DETAILS,REMOVE_USER_DETAILS_LOGOUT} from '../actionTypes/actionTypes';
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
      case REMOVE_USER_DETAILS_LOGOUT:
      // const { name, email} = action.payload
      return {
        ...state,
        name:'',
        email:''
      };
    default:
      return state;
  }
};
export default userSlice;
