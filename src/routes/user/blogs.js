import { Routes, Route } from "react-router-dom";
import CreateBlog from "../../pages/createBlog";
import UpdateBlog from "../../pages/updateBlog";
import AdminBlogs from "../../pages/AdminBlogs";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPageBlogsRedux } from "../../redux/blogSlice";
import { blogsSel } from "../../redux/selector/blogSelector";
import { Spin } from "antd";
import ReplyView from "../../pages/ReplyView"
const contentStyle = {
  padding: 50,
  background: "rgba(0,0,0,0.05)",
  borderRadius: 4,
};

const content = <div style={contentStyle} />;
export default function Blogs() {
  const blogs = useSelector(blogsSel);
  const dispatch = useDispatch();
  useEffect(() => {
    const blogPage = JSON.parse(localStorage.getItem("blogPage"));
    dispatch(
      getPageBlogsRedux({
        page: blogPage.page || 1,
        pageSize: blogPage.pageSize || 2,
        searchVal: "",
      })
    );
  }, []);
  return !!blogs ? (
    <Routes>
      <Route path="/" element={<AdminBlogs />} />
      <Route path="/create" element={<CreateBlog />} />
      <Route path="/update/:id" element={<UpdateBlog />} />
      <Route path="/replyView/:id" element={<ReplyView />} />
    </Routes>
  ) : (
    <div>
      <Spin tip="Loading" size="large">
        {content}
      </Spin>
    </div>
  );
}
