import {
  GET_LIST_POST,
  GET_LIST_POST_SUCCESS,
  DELETE_LIST_POST,
  DELETE_LIST_POST_SUCCESS,
  UPDATE_LIST_POST,
  UPDATE_LIST_POST_SUCCESS,
  CREATE_LIST_POST,
  CREATE_LIST_POST_SUCCESS,
} from "./constant";

export const getListPost = (payload) => {
  return {
    type: GET_LIST_POST,
    payload,
  };
};

export const getListPostSuccess = (payload) => {
  return {
    type: GET_LIST_POST_SUCCESS,
    payload,
  };
};

export const deletePostData = (payload) => {
  console.log(payload)
  return {
    type: DELETE_LIST_POST,
    payload,
  };
};

export const deletePostDataSuccess = (payload) => {
  console.log(payload.data.id)
  return {
    type: DELETE_LIST_POST_SUCCESS,
    payload,
  };
};

// export const updatePostData = (payload) => {
//   return {
//     type: UPDATE_LIST_POST,
//     payload,
//   };
// };

// export const updatePostDataSuccess = (payload) => {
//   return {
//     type: UPDATE_LIST_POST_SUCCESS,
//     payload,
//   };
// };

// export const createPostData = (payload) => {
//   return {
//     type: CREATE_LIST_POST,
//     payload,
//   };
// };

// export const createPostDataSuccess = (payload) => {
//   return {
//     type: CREATE_LIST_POST_SUCCESS,
//     payload,
//   };
// };
