import axios from "./init";

export const setToken = () => {
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("token")}`;
};
export const getCurrentUser = () => {
  return axios.get("/user");
};
export const getAllUsers = () => {
  return axios.get("/user/all");
};
export const getPageUsers = (page, pageSize) => {
  return axios.get(`/user/page?page=${page}&pageSize=${pageSize}`);
};
export const createUser = (data) => {
  return axios.post("/user", data);
};
export const deleteUser = (id) => {
  return axios.delete(`/user/${id}`);
};
export const updateUser = (id, data) => {
  return axios.put(`/user/${id}`, data);
};
export const resetPassword = (id) => {
  return axios.patch(`/user/${id}`);
};

//----------Blogs------------
export const getAllBlogs = () => {
  return axios.get("/blog");
};
export const getBlog = (id) => {
  return axios.get(`/blog/one?id=${id}`);
};
export const createBlog = (data) => {
  return axios.post("/blog", data);
};
export const deleteBlog = (id) => {
  return axios.delete(`/blog/${id}`);
};
export const updateBlog = (id, data) => {
  return axios.put(`/blog/${id}`, data);
};
export const likeBlog = (id, payload) => {
  return axios.patch(`/blog/${id}`, payload);
};
export const getPageBlogs = (page, pageSize, searchVal) => {
  return axios.get(
    `/blog/page?page=${page}&pageSize=${pageSize}&searchVal=${searchVal}`
  );
};
//------------reply---------
export const createReply = (data) => {
  return axios.post("/blog/reply", data);
};
export const getReplies = ({ id, page, pageSize }) => {
  return axios.get(`/blog/reply?id=${id}&page=${page}&pageSize=${pageSize}`);
};
