import {
  GET_LIST_POST,
  GET_LIST_POST_SUCCESS,
  DELETE_LIST_POST,
  DELETE_LIST_POST_SUCCESS,
} from "./constant";

const INITIAL_STATE = {
  posts: [],
  load: false,
  idDelete: null,
};

const postsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_LIST_POST:
      return {
        ...state,
        load: true,
      };
    case GET_LIST_POST_SUCCESS:
      const { data } = action.payload;
      console.log(data);
      return {
        ...state,
        posts: data,
        load: false,
      };
    case DELETE_LIST_POST:
      return {
        ...state,
        idDelete: action.payload,
        load: true,
      };
    case DELETE_LIST_POST_SUCCESS:
      const product = action.payload.data.id;
      return {
        ...state,
        posts: state.posts.filter((todo) => todo.id !== product),
        load: false,
      };
    default:
      return state;
  }
};

export default postsReducer;
