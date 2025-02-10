import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { blogsSel, repliesSel } from "../redux/selector/blogSelector";
import { userSel } from "../redux/selector/userSelector";
import Blog from "../components/Blog";
import { getRepliesRedux } from "../redux/blogSlice";
import { Pagination, Spin } from "antd";

const contentStyle = {
  padding: 50,
  background: "rgba(0,0,0,0.05)",
  borderRadius: 4,
};

const content = <div style={contentStyle} />;

export default function ReplyView() {
  const [page, setPage] = useState();
  const replyPage = JSON.parse(localStorage.getItem("replyPage"));
  const pagenationHandle = useCallback((page, pageSize) => {
    localStorage.setItem(
      "replyPage",
      JSON.stringify({
        page,
        pageSize,
      })
    );
    setPage({ page, pageSize });
  }, []);

  const location = useLocation();
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const blogs = useSelector(blogsSel);
  const blog = blogs.filter((item) => item._id === id)[0];
  const userRole = useSelector(userSel).role;
  const replies = useSelector(repliesSel);
  useEffect(() => {
    dispatch(
      getRepliesRedux({
        id,
        page: replyPage.page || 1,
        pageSize: replyPage.pageSize || 2,
      })
    );
  }, [location, page]);
  const goToBack = () => {
    localStorage.setItem(
      "replyPage",
      JSON.stringify({
        ...JSON.parse(localStorage.getItem("replyPage")),
        page: 1,
      })
    );
    if (!!blog.parentBlog)
      navigate(`/${userRole}/blogs/replyView/${blog.parentBlog}`);
    else navigate(`/${userRole}/blogs`);
  };
  return (
    <div>
      {!!replies[0] && !!blog ? (
        <>
          <div className="flex justify-end mb-2">
            <button className="btn-sm btn-primary" onClick={goToBack}>
              <span className="fa fa-arrow-left"></span>
            </button>
          </div>
          <div className="p-4 rounded-md border-2 mb-5">
            <Blog {...blog} userRole={userRole} />
          </div>
          {replies.map((item) => (
            <div
              key={item._id}
              className="bg-green-100 rounded-xl w-3/4 mx-auto"
            >
              <Blog {...item} userRole={userRole} />
            </div>
          ))}
          <Pagination
            className="mt-5 text-center"
            pageSizeOptions={[5, 10, 15, 20]}
            total={blog.replies.length}
            showSizeChanger={true}
            defaultPageSize={2}
            onChange={(page, pageSize) => {
              pagenationHandle(page, pageSize);
            }}
            current={replyPage.page}
          />
        </>
      ) : (
        <div>
          <Spin tip="Loading" size="large">
            {content}
          </Spin>
        </div>
      )}
    </div>
  );
}
