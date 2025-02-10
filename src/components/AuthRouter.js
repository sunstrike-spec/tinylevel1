import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userSel } from "../redux/selector/userSelector";
import { getCurrentUserRedux } from "../redux/userSlice";
import jwt_decode from "jwt-decode";
import { blogPageInit, replyPageInit, usersPageInit } from "../utils/pageValue";
import { Spin } from "antd";

const contentStyle = {
  padding: 50,
  background: "rgba(0,0,0,0.05)",
  borderRadius: 4,
};

const content = <div style={contentStyle} />;

const AuthRouter = ({ role }) => {
  const userRole = localStorage.getItem("token")
    ? jwt_decode(localStorage.getItem("token")).role
    : "other";
  const location = useLocation();
  const user = useSelector(userSel);
  const usersPage = localStorage.getItem("usersPage");
  const blogPage = localStorage.getItem("blogPage");
  const replyPage = localStorage.getItem("replyPage");

  if (!usersPage)
    localStorage.setItem("usersPage", JSON.stringify(usersPageInit));
  if (!blogPage) localStorage.setItem("blogPage", JSON.stringify(blogPageInit));
  if (!replyPage)
    localStorage.setItem("replyPage", JSON.stringify(replyPageInit));

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUserRedux());
  }, []);
  return role === userRole ? (
    !user ? (
      <div>
        <Spin tip="Loading" size="large">
          {content}
        </Spin>
      </div>
    ) : (
      <>
        <Outlet />
      </>
    )
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};
export default AuthRouter;
