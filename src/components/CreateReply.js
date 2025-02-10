import { Modal } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createReplyRedux } from "../redux/blogSlice";

export default function CreateReply({ isModalOpen, setModal, id }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const handleCancel = () => {
    // e.preventDefault();
    // setTitle("");
    // setContent("");
    setModal(false);
  };

  const handleCreateBlog = (e) => {
    e.preventDefault();
    const payload = { title, content, id };
    dispatch(createReplyRedux({ payload, navigateFunc: handleCancel }));
  };
  return (
    <Modal title="Reply" open={isModalOpen} width={800} footer={null}>
      <div className=" flex-grow">
        <form className="flex-grow" onSubmit={(e) => handleCreateBlog(e)}>
          <div className="relative">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              name="title"
              placeholder="Enter your title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-2xl w-full"
            />
          </div>
          <div className="relative">
            <label htmlFor="content">Content</label>
            <textarea
              rows={5}
              className="p-3 resize-y block w-full border rounded-xl text-xl"
              id="content"
              name="content"
              placeholder="Enter your reply"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <input
            type="submit"
            id="name"
            className="btn mt-10"
            placeholder="name"
            value="Reply"
          />
        </form>
        <button className="btn w-full mt-2" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </Modal>
  );
}
