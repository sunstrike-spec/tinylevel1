import { configureStore } from "@reduxjs/toolkit";

import user from "../redux/userSlice";
import blog from "../redux/blogSlice";
import chat from "../redux/chatSlice"

const combineReducer = {
  user,
  blog,
  chat,
};

export default configureStore({
  reducer: combineReducer,
});
