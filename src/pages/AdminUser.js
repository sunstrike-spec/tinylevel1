import { useDispatch, useSelector } from "react-redux";
import { usersLenSel, usersSel } from "../redux/selector/userSelector";
import { Link } from "react-router-dom";
import NavigateButton from "../components/NavigateButton";
import UserList from "../components/UserList";
import { useCallback, useEffect, useState } from "react";
import { getPageUsersRedux } from "../redux/userSlice";
import { Pagination, Spin } from "antd";

const contentStyle = {
  padding: 50,
  background: "rgba(0,0,0,0.05)",
  borderRadius: 4,
};

const content = <div style={contentStyle} />;

export default function AdminUsers() {
  const dispatch = useDispatch();
  const allUsers = useSelector(usersSel);
  //------------pagenagtion-------
  const totalUserNum = useSelector(usersLenSel);
  const usersPage = JSON.parse(localStorage.getItem("usersPage"));
  const [page, setPage] = useState({ page: 1, pageSize: 5 });
  const pagenationHandle = useCallback((page, pageSize) => {
    localStorage.setItem(
      "usersPage",
      JSON.stringify({
        page,
        pageSize,
      })
    );
    setPage({ page, pageSize });
  }, []);

  useEffect(() => {
    dispatch(
      getPageUsersRedux({
        page: usersPage.page || 1,
        pageSize: usersPage.pageSize || 2,
      })
    );
  }, [page, totalUserNum]);
  return (
    <div>
      <div className="flex-1 flex justify-between">
        <NavigateButton />
        <Link to="/admin/users/create" className="btn">
          Add User
        </Link>
      </div>
      <div className="flex justify-center">
        {!!allUsers ? (
          <table className="table w-[1000px]">
            <thead>
              <tr>
                <td>No</td>
                <td>Avatar</td>
                <td className=" w-52">Name</td>
                <td className=" w-52">Email</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {allUsers.map((item, index) => {
                return <UserList item={item} index={index} key={item._id} />;
              })}
            </tbody>
          </table>
        ) : (
          <div>
            <Spin tip="Loading" size="large">
              {content}
            </Spin>
          </div>
        )}
      </div>
      <Pagination
        className="mt-5 text-center"
        pageSizeOptions={[5, 10, 15, 20]}
        total={totalUserNum}
        showSizeChanger={true}
        defaultPageSize={5}
        onChange={(page, pageSize) => {
          pagenationHandle(page, pageSize);
        }}
        current={usersPage.page}
      />
    </div>
  );
}
