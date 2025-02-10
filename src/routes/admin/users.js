import { Routes, Route } from "react-router-dom";
import CreateUser from "../../pages/CreateUser";
import UpdateUser from "../../pages/UpdateUser";
import AdminUsers from "../../pages/AdminUser";
import { useDispatch, useSelector } from "react-redux";
import { usersSel } from "../../redux/selector/userSelector";
import { Spin } from "antd";
import { useEffect } from "react";
import { getPageUsersRedux } from "../../redux/userSlice";
const contentStyle = {
  padding: 50,
  background: "rgba(0,0,0,0.05)",
  borderRadius: 4,
};

const content = <div style={contentStyle} />;
export default function Users() {
  const dispatch = useDispatch();
  const allUsers = useSelector(usersSel);
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);
  const usersPage = JSON.parse(localStorage.getItem("usersPage"));
  useEffect(() => {
    dispatch(
      getPageUsersRedux({
        page: usersPage.page || 1,
        pageSize: usersPage.pageSize || 2,
      })
    );
  }, []);
  return !!allUsers ? (
    <Routes>
      <Route index element={<AdminUsers />} />
      <Route path="/create" element={<CreateUser />} />
      <Route path="/update/:id" element={<UpdateUser />} />
    </Routes>
  ) : (
    <div>
      <Spin tip="Loading" size="large">
        {content}
      </Spin>
    </div>
  );
}
