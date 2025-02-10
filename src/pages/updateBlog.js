import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getBlogRedux, updateBlogRedux } from "../redux/blogSlice";
import { blogsSel } from "../redux/selector/blogSelector";
import { Spin } from "antd";

const contentStyle = {
  padding: 50,
  background: "rgba(0,0,0,0.05)",
  borderRadius: 4,
};

const contentSpin = <div style={contentStyle} />;

export default function UpdateBlog() {
  const { id } = useParams();
  const navigate = useNavigate();

  const goToUser = () => {
    navigate(-1);
  };
  const curBlog = useSelector(blogsSel).filter((item) => item._id === id)[0];
  const dispatch = useDispatch();
  const [title, setTitle] = useState(curBlog?.title);
  const [content, setContent] = useState(curBlog?.content);
  const handleUpdateBlog = (e) => {
    e.preventDefault();
    const payload = { title, content };
    dispatch(
      updateBlogRedux({ payload, navigateFunc: goToUser, id: curBlog._id })
    );
  };
  useEffect(() => {
    console.log("called");
    dispatch(getBlogRedux(id));
  }, []);
  useEffect(() => {
    setTitle(curBlog?.title);
    setContent(curBlog?.content);
  }, [curBlog]);
  return (
    <div>
      {!!curBlog ? (
        <div className="form flex-grow ">
          <p className="text-center">Update Blog</p>
          <form className="flex-grow" onSubmit={(e) => handleUpdateBlog(e)}>
            <div className="relative">
              <label htmlFor="title">Title</label>
              <input
                id="title"
                type="text"
                name="title"
                placeholder="Enter your title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="relative">
              <label htmlFor="content">Content</label>
              <textarea
                rows={5}
                className=" p-5 resize-y block w-full border rounded-xl border-purple-600"
                id="content"
                name="content"
                placeholder="Enter your blog"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <input
              type="submit"
              id="name"
              className="btn mt-10"
              placeholder="name"
              value="Update"
            />
          </form>
          <button className="btn block mx-auto mt-2 w-[500px]" onClick={goToUser}>
            BACK
          </button>
        </div>
      ) : (
        <div>
          <Spin tip="Loading" size="large">
            {contentSpin}
          </Spin>
        </div>
      )}
    </div>
  );
}
