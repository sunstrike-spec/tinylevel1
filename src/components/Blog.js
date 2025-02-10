import { userSel } from "../redux/selector/userSelector";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlogRedux, likeBlogRedux } from "../redux/blogSlice";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import Context from "../hooks/context";
import { useContext, useEffect } from "react";
import DateToString from "../utils/DateToString";
import { Modal } from "antd";
import { blogsLenSel } from "../redux/selector/blogSelector";
import CreateReply from "./CreateReply";
import { avatarBaseURL } from "../utils/serverConstant";

const config = {
  title: "DELETE BLOG!",
  content: "Really?",
};

export default function Blog({
  title,
  content,
  updated_at,
  user,
  _id,
  userRole,
  like,
  unlike,
  replies,
}) {
  const totalPageNum = useSelector(blogsLenSel);
  const navigate = useNavigate();
  const curUser = useSelector(userSel);
  const dispatch = useDispatch();
  const goToUpdate = () => {
    navigate(`/${userRole}/blogs/update/${_id}`);
  };
  const [realContent, setRealContent] = useState(
    content.length > 200 ? content.slice(0, 200) + "..." : content
  );
  const btnName = useRef("More");
  const onMoreHandle = () => {
    if (btnName.current === "More") {
      setRealContent(content);
      btnName.current = "Less";
    } else {
      setRealContent(
        content.length > 200 ? content.slice(0, 200) + "..." : content
      );
      btnName.current = "More";
    }
  };
  const likeHandle = () => {
    if (like.every((item) => item !== curUser._id))
      dispatch(likeBlogRedux({ id: _id, payload: { like: true } }));
    else return;
  };
  const unlikeHandle = () => {
    if (unlike.every((item) => item !== curUser._id))
      dispatch(likeBlogRedux({ id: _id, payload: { like: false } }));
    else return;
  };
  const [modal, contextHolder] = Modal.useModal();

  //-------------Search Operation------------
  const { search } = useContext(Context);
  const regSearch = new RegExp(search, "ig");
  const titleRef = useRef(0);
  const contentRef = useRef(0);
  const nameRef = useRef(0);
  const updated_atRef = useRef(0);
  useEffect(() => {
    titleRef.current.innerHTML = title.replace(
      regSearch,
      (value) => `<span class=" bg-orange-400">${value}</span>`
    );
    contentRef.current.innerHTML = realContent.replace(
      regSearch,
      (value) => `<span class=" bg-orange-400">${value}</span>`
    );
    nameRef.current.innerHTML = user.name.replace(
      regSearch,
      (value) => `<span class=" bg-orange-400">${value}</span>`
    );
    updated_atRef.current.innerHTML = DateToString(updated_at).replace(
      regSearch,
      (value) => `<span class=" bg-orange-400">${value}</span>`
    );
  }, [search, realContent, title, regSearch, user.name, updated_at]);
  //---------page operation---
  const blogPage = JSON.parse(localStorage.getItem("blogPage"));
  //--------------reply---------------
  const replyViewHandle = () => {
    localStorage.setItem(
      "replyPage",
      JSON.stringify({
        ...JSON.parse(localStorage.getItem("replyPage")),
        page: 1,
      })
    );
    navigate(`/${userRole}/blogs/replyView/${_id}`);
  };
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  const openReplyModal = () => {
    setIsReplyModalOpen(true);
  };
  return (
    <div className="my-1  flex w-100 py-2 px-2">
      <div className="flex items-center">
        <div>
          <img
            className="avatar h-[100px] "
            src={avatarBaseURL + user.avatar}
            alt="avatar"
          />
          <div>
            <p className="text-center" ref={nameRef}>
              user name
            </p>
          </div>
        </div>
      </div>
      <div className="ml-20 flex-1 transition-all duration-500">
        <h2
          className="text-center w-full font-bold text-xl break-all"
          ref={titleRef}
        >
          title
        </h2>
        <p className="text-left text-lg  break-all" ref={contentRef}>
          Content
        </p>
        <p className=" text-gray-400 text-left" ref={updated_atRef}>
          Created At:
        </p>
        <div className="flex justify-between mt-3">
          <div>
            <button
              className="rounded-md btn-sm mr-3 relative"
              onClick={likeHandle}
            >
              <span className="fa fa-thumbs-o-up "></span>
              <div className="badge  border-white border-spacing-3 text-white absolute top-[-10px] right-[-10px]">
                {like.length}
              </div>
            </button>
            <button
              className="rounded-md btn-sm  mr-3 relative"
              onClick={unlikeHandle}
            >
              <span className="fa fa-thumbs-o-down relative"></span>
              <div className="badge  border-white border-spacing-3 text-white absolute top-[-10px] right-[-10px]">
                {unlike.length}
              </div>
            </button>
            <button
              className="rounded-md btn-sm mr-3 relative"
              onClick={() => replyViewHandle(_id)}
              disabled={replies.length === 0}
            >
              View Replies
              <div className="badge  border-white border-spacing-3 text-white absolute top-[-10px] right-[-10px]">
                {replies.length}
              </div>
            </button>
            <button
              className="rounded-md btn-sm mr-3"
              onClick={() => openReplyModal()}
            >
              Reply
            </button>
          </div>
          <div>
            {userRole !== "admin" ? (
              user._id === curUser._id && (
                <>
                  <button
                    onClick={async () => {
                      console.log(totalPageNum);
                      const confirmed = await modal.confirm(config);
                      confirmed && dispatch(deleteBlogRedux(_id));
                      if (confirmed)
                        if (
                          totalPageNum - 1 <=
                          (blogPage.page - 1) * blogPage.pageSize
                        ) {
                          localStorage.setItem(
                            "blogPage",
                            JSON.stringify({
                              page: blogPage.page - 1,
                              pageSize: blogPage.pageSize,
                            })
                          );
                        }
                    }}
                    className="rounded-md btn-sm "
                  >
                    <span className="fa fa-trash"></span>
                  </button>
                  <button
                    onClick={goToUpdate}
                    className="rounded-md btn-sm  "
                  >
                    <span className="fa fa-pencil"></span>
                  </button>
                </>
              )
            ) : (
              <>
                <button
                  onClick={async () => {
                    console.log(totalPageNum);
                    const confirmed = await modal.confirm(config);
                    confirmed && dispatch(deleteBlogRedux(_id));
                    if (confirmed)
                      if (
                        totalPageNum - 1 <=
                        (blogPage.page - 1) * blogPage.pageSize
                      ) {
                        localStorage.setItem(
                          "blogPage",
                          JSON.stringify({
                            page: blogPage.page - 1,
                            pageSize: blogPage.pageSize,
                          })
                        );
                      }
                  }}
                  className="rounded-md btn-sm "
                >
                  <span className="fa fa-trash"></span>
                </button>
                <button
                  onClick={goToUpdate}
                  className="rounded-md btn-sm "
                >
                  <span className="fa fa-pencil"></span>
                </button>
              </>
            )}
            <button onClick={onMoreHandle} className="btn btn-sm ">
              {btnName.current === "More" ? (
                <span className="fa fa-arrow-down"></span>
              ) : (
                <span className="fa fa-arrow-up"></span>
              )}
            </button>
          </div>
        </div>
      </div>
      {contextHolder}
      <CreateReply
        id={_id}
        isModalOpen={isReplyModalOpen}
        setModal={setIsReplyModalOpen}
      />
    </div>
  );
}
