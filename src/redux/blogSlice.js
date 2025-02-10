import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createBlog,
  createReply,
  deleteBlog,
  getAllBlogs,
  getBlog,
  getPageBlogs,
  getReplies,
  likeBlog,
  updateBlog,
} from "../axios";

export const getAllBlogsRedux = createAsyncThunk("blog/get", async () => {
  try {
    const res = await getAllBlogs();
    return res.data;
  } catch (err) {
    return { err: err.response.data || "" };
  }
});
export const getBlogRedux = createAsyncThunk("blog/getOne", async (id) => {
  try {
    const res = await getBlog(id);
    return res.data;
  } catch (err) {
    return { err: err.response.data || "" };
  }
});
export const getPageBlogsRedux = createAsyncThunk(
  "blog/getPage",
  async ({ page, pageSize, searchVal }) => {
    try {
      const res = await getPageBlogs(page, pageSize, searchVal);
      return res.data;
    } catch (err) {
      return { err: err.response.data || "" };
    }
  }
);
export const createBlogRedux = createAsyncThunk(
  "blog/create",
  async ({ payload, navigateFunc }) => {
    try {
      const res = await createBlog(payload);
      navigateFunc();
      localStorage.setItem(
        "blogPage",
        JSON.stringify({
          ...JSON.parse(localStorage.getItem("blogPage")),
          page: 1,
        })
      );
      return res.data;
    } catch (err) {
      return { err: err.response.data || "" };
    }
  }
);
export const deleteBlogRedux = createAsyncThunk("blog/delete", async (id) => {
  try {
    const res = await deleteBlog(id);
    return res.data;
  } catch (err) {
    return { err: err.response.data || "" };
  }
});
export const updateBlogRedux = createAsyncThunk(
  "blog/update",
  async ({ id, payload, navigateFunc }) => {
    try {
      const res = await updateBlog(id, payload);
      navigateFunc();
      return res.data;
    } catch (err) {
      return { err: err.response.data || "" };
    }
  }
);
export const likeBlogRedux = createAsyncThunk(
  "blog/like",
  async ({ id, payload }) => {
    try {
      const res = await likeBlog(id, payload);
      return res.data;
    } catch (err) {
      return { err: err.response.data || "" };
    }
  }
);
//-----reply----------
export const createReplyRedux = createAsyncThunk(
  "reply/create",
  async ({ payload, navigateFunc }) => {
    try {
      const res = await createReply(payload);
      navigateFunc();
      return res.data;
    } catch (err) {
      return { err: err.response.data || "" };
    }
  }
);
export const getRepliesRedux = createAsyncThunk(
  "replies/get",
  async (payload) => {
    try {
      const res = await getReplies(payload);
      return res.data;
    } catch (err) {
      return { err: err.response.data || "" };
    }
  }
);

const blogSlice = createSlice({
  name: "blog",
  initialState: {
    blogs: null,
    errMes: null,
    isLoding: false,
    blogsNum: 0,
    replies: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllBlogsRedux.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(getAllBlogsRedux.fulfilled, (state, action) => {
        state.isLoding = false;
        state.blogs = action.payload;
        state.errMes = action.payload.err;
      })
      .addCase(getBlogRedux.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(getBlogRedux.fulfilled, (state, action) => {
        state.isLoding = false;
        state.blogs = [action.payload];
        state.errMes = action.payload.err;
      })
      .addCase(createBlogRedux.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(createBlogRedux.fulfilled, (state, action) => {
        state.isLoding = false;
        state.blogs = [action.payload, ...state.blogs];
        state.errMes = action.payload.err;
      })
      .addCase(deleteBlogRedux.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(deleteBlogRedux.fulfilled, (state, action) => {
        state.isLoding = false;
        state.blogs = state.blogs.filter(
          (item) => item._id !== action.payload._id
        );
        state.replies = state.replies.filter(
          (item) => item._id !== action.payload._id
        );
        state.blogsNum--;
        state.errMes = action.payload.err;
      })
      .addCase(updateBlogRedux.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(updateBlogRedux.fulfilled, (state, action) => {
        state.isLoding = false;
        state.blogs = state.blogs.map((item) =>
          item._id !== action.payload._id ? item : action.payload
        );
        state.replies = state.replies.map((item) =>
          item._id !== action.payload._id ? item : action.payload
        );
        state.errMes = action.payload.err;
      })
      .addCase(likeBlogRedux.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(likeBlogRedux.fulfilled, (state, action) => {
        state.isLoding = false;
        state.blogs = state.blogs.map((item) =>
          item._id !== action.payload._id ? item : action.payload
        );
        state.replies = state.replies.map((item) =>
          item._id !== action.payload._id ? item : action.payload
        );
        state.errMes = action.payload.err;
      })
      .addCase(getPageBlogsRedux.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(getPageBlogsRedux.fulfilled, (state, action) => {
        state.isLoding = false;
        state.blogs = action.payload.blogs;
        state.blogsNum = action.payload.total;
        state.errMes = action.payload.err;
      })
      //------reply--------
      .addCase(createReplyRedux.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(createReplyRedux.fulfilled, (state, action) => {
        state.isLoding = false;
        const { parent, reply } = action.payload;
        if (!state.blogs.every((item) => item._id !== reply.parentBlog)) {
          state.replies = [...state.replies, reply];
          state.blogs = state.blogs.map((item) =>
            item._id !== parent._id ? item : parent
          );
        } else {
          state.replies = state.replies.map((item) =>
            item._id !== parent._id ? item : parent
          );
        }
        state.errMes = action.payload.err;
      })
      .addCase(getRepliesRedux.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(getRepliesRedux.fulfilled, (state, action) => {
        state.isLoding = false;
        state.replies = [...action.payload.resReplies];
        state.blogs = [action.payload.mainBlog];
        state.errMes = action.payload.err;
      });
  },
});
export default blogSlice.reducer;
