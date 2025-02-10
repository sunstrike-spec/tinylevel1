import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userSel } from "../redux/selector/userSelector";
import { useNavigate } from "react-router-dom";
import { createBlogRedux } from "../redux/blogSlice";

export default function CreateBlog() {
  const navigate = useNavigate();
  const user = useSelector(userSel);
  const goToUser = () => {
    navigate(`/${user.role}/blogs`);
  };
  const backHnalde = () => {
    navigate(`/${user.role}/blogs`);
  };
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleCreateBlog = (e) => {
    e.preventDefault();
    const payload = { title, content };
    dispatch(createBlogRedux({ payload, navigateFunc: goToUser }));
  };
  return (
    <div>
      <div className="form flex-grow">
        <p className="text-center">Create Article</p>
        <form className="flex w-full" onSubmit={(e) => handleCreateBlog(e)}>
          <div className="relative">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              name="title"
              placeholder="Enter your title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-xl w-full outline-none"
            />
          </div>
          <div className="relative">
            <label htmlFor="content">Content</label>
            <textarea
              rows={5}
              className="p-3 resize-y block w-full border rounded-xl outline-none text-xl"
              id="content"
              name="content"
              placeholder="Enter your content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <input
            type="submit"
            id="name"
            className="btn mt-10"
            placeholder="name"
            value="Create"
          />
          <button className="btn" onClick={backHnalde}>
            BACK
          </button>
        </form>
      </div>
    </div>
  );
}
