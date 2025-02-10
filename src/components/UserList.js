import React from "react";
import { deleteUserRedux, resetPasswordRedux } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Modal } from "antd";
import { usersLenSel } from "../redux/selector/userSelector";
import { avatarBaseURL } from "../utils/serverConstant";

const deleteModal = {
  title: "DELETE USER!",
  content: "Really?",
};
const passwordModal = {
  title: "Reset the Password with 123456!",
  content: "Really?",
};

export default function UserList({ item, index }) {
  const totalUserNum = useSelector(usersLenSel);
  const usersPage = JSON.parse(localStorage.getItem("usersPage"));
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const [modal, contextHolder] = Modal.useModal();
  return (
    <>
      <tr>
        <td>{index + 1}</td>
        <td>
          <img
            src={`${avatarBaseURL}${item.avatar}`}
            className="avatar large"
            alt="avatar"
          />
        </td>
        <td>{item.name}</td>
        <td>{item.email}</td>
        <td>
          <button
            // onClick={() => dispatch(deleteUserRedux(item._id))}
            onClick={async () => {
              const confirmed = await modal.confirm(deleteModal);
              confirmed && dispatch(deleteUserRedux(item._id));
              if (confirmed)
                if (
                  totalUserNum - 1 <=
                  (usersPage.page - 1) * usersPage.pageSize
                ) {
                  localStorage.setItem(
                    "usersPage",
                    JSON.stringify({
                      page: usersPage.page - 1,
                      pageSize: usersPage.pageSize,
                    })
                  );
                }
            }}
            className="rounded-md btn-sm "
          >
            <span className="fa fa-trash"></span>
          </button>
          <button
            className="rounded-md btn-sm "
            onClick={() => navigator(`/admin/users/update/${item._id}`)}
          >
            <span className="fa fa-pencil"></span>
          </button>
          <button
            className="btn btn-sm"
            onClick={async () => {
              const confirmed = await modal.confirm(passwordModal);
              confirmed && dispatch(resetPasswordRedux(item._id));
              console.log("confirm", confirmed);
            }}
          >
            <span className="fa fa-key"></span>
            <span className="fa fa-undo"></span>
          </button>
        </td>
      </tr>
      {contextHolder}
    </>
  );
}
