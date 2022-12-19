import axios from "axios";

export const getPostDataAPI = async () => {
  // return axios.get("https://jsonplaceholder.typicode.com/users");
  return await axios.get("https://fakestoreapi.com/products");
};

export const deletePostDataAPI = async (id) => {
  console.log("ID xóa", id);
  return await axios.delete(`https://fakestoreapi.com/products/${id}`);
};
