import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios/init";
import FormData from "form-data";
import jwt_decode from "jwt-decode";

import {
  createUser,
  deleteUser,
  getAllUsers,
  getCurrentUser,
  getPageUsers,
  resetPassword,
  setToken,
  updateUser,
} from "../axios";

export const signin = createAsyncThunk(
  "user/signin",
  async ({ payload, navigate }) => {
    try {
      const form = new FormData();
      const { name, email, password, confirm, avatarFile } = payload;
      form.append("name", name);
      form.append("email", email);
      form.append("password", password);
      form.append("confirm", confirm);
      form.append("avatarFile", avatarFile);
      const res = await createUser(form);
      navigate("/login");
      return res.data;
    } catch (err) {
      return { err: err.response.data || {} };
    }
  }
);
export const makeUser = createAsyncThunk(
  "admin/create-user",
  async ({ payload, navigate }) => {
    try {
      const form = new FormData();
      const { name, email, password, confirm, avatarFile } = payload;
      form.append("name", name);
      form.append("email", email);
      form.append("password", password);
      form.append("confirm", confirm);
      form.append("avatarFile", avatarFile);
      const res = await createUser(form);
      navigate("/admin");
      return res.data;
    } catch (err) {
      return { err: err.response.data || {} };
    }
  }
);

export const login = createAsyncThunk(
  "user/login",
  async ({ payload, navigate,socket }) => {
    try {
      const res = await axios.post("/login", payload);
      localStorage.setItem("token", res.data.token);
      socket.on("connection", () => {});
      socket.emit("auth", res.data.token);
      setToken();
      const user = jwt_decode(res.data.token);
      const userRole = user.role;
      userRole === "admin" ? navigate("/admin") : navigate("/user");
      return user;
    } catch (err) {
      console.log("err", err.response.data);
      return { err: err.response.data || {} };
    }
  }
);

export const getCurrentUserRedux = createAsyncThunk(
  "user/getCurrentUser",
  async () => {
    try {
      setToken();
      const res = await getCurrentUser();
      return res.data;
    } catch (err) {
      return { err: err.response.data || {} };
    }
  }
);
export const getAllUsersRedux = createAsyncThunk(
  "user/getAllUsersRedux",
  async () => {
    try {
      setToken();
      const res = await getAllUsers();
      return res.data;
    } catch (err) {
      return { err: err.response.data || {} };
    }
  }
);
export const getPageUsersRedux = createAsyncThunk(
  "user/getPageUsersRedux",
  async ({ page, pageSize }) => {
    try {
      setToken();
      const res = await getPageUsers(page, pageSize);
      return res.data;
    } catch (err) {
      return { err: err.response.data || {} };
    }
  }
);
export const deleteUserRedux = createAsyncThunk("user/delete", async (id) => {
  try {
    setToken();
    const res = await deleteUser(id);
    return res.data;
  } catch (err) {
    return { err: err.response.data || {} };
  }
});
export const updateUserRedux = createAsyncThunk(
  "user/update",
  async ({ id, payload, navigate }) => {
    try {
      setToken();
      const form = new FormData();
      const { name, email, avatarFile } = payload;
      form.append("name", name);
      form.append("email", email);
      form.append("avatarFile", avatarFile);
      const res = await updateUser(id, form);
      navigate("/admin/users");
      console.log("updaeUser:", res.data);
      return res.data;
    } catch (err) {
      return { err: err.response.data || {} };
    }
  }
);
export const resetPasswordRedux = createAsyncThunk(
  "user/reset-password",
  async (id) => {
    try {
      setToken();
      const res = await resetPassword(id);
      console.log("reset password:", res.data);
      return res.data;
    } catch (err) {
      return { err: err.response.data || {} };
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    errMes: { password: "", email: "" },
    isLoding: false,
    isAuthenticated:false,
    isLodingCurUser: false,
    user: null,
    message: "",
    users: null,
    usersNum: 0,
  },

  reducers: {
    getToken: (state) => {
      state.token = localStorage.getItem("token");
    },
    logOut: (state) => {
      state.token = null;
      localStorage.removeItem("token");
      state.user = null;
      state.isAuthenticated = false;
      state.users = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(signin.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.isLoding = false;
        state.errMes = action.payload.err;
        state.message = "success";
      })
      .addCase(signin.rejected, (state, action) => {
        state.isLoding = false;
      })
      .addCase(login.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoding = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.errMes = action.payload.err;
      })
      .addCase(login.rejected, (state) => {
        state.isLoding = false;
        state.message = "falied";
      })
      .addCase(getCurrentUserRedux.pending, (state) => {
        state.isLodingCurUser = true;
      })
      .addCase(getCurrentUserRedux.fulfilled, (state, action) => {
        state.isLodingCurUser = false;
        state.user = action.payload;
        state.errMes = action.payload.err;
      })
      .addCase(getAllUsersRedux.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(getAllUsersRedux.fulfilled, (state, action) => {
        state.isLoding = false;
        state.users = action.payload;
        state.errMes = action.payload.err;
      })
      .addCase(deleteUserRedux.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(deleteUserRedux.fulfilled, (state, action) => {
        state.isLoding = false;
        state.users = state.users.filter(
          (item) => item._id !== action.payload._id
        );
        state.usersNum --;
        state.errMes = action.payload.err;
      })
      .addCase(makeUser.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(makeUser.fulfilled, (state, action) => {
        state.isLoding = false;
        state.users = [...state.users, action.payload];
        state.errMes = action.payload.err;
      })
      .addCase(updateUserRedux.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(updateUserRedux.fulfilled, (state, action) => {
        state.isLoding = false;
        state.users = state.users.map((item) =>
          item._id !== action.payload._id ? item : action.payload
        );
        state.errMes = action.payload.err;
      })
      .addCase(getPageUsersRedux.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(getPageUsersRedux.fulfilled, (state, action) => {
        state.isLoding = false;
        state.users = action.payload.users;
        state.usersNum = action.payload.total;
        state.errMes = action.payload.err;
      });
  },
});

export const { getToken, logOut } = userSlice.actions;
export default userSlice.reducer;
