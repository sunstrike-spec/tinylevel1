import React from "react";

import Avatar from "./Avatar";
import logoutImg from '../images/logo/out.png'
import logo from "../images/logo/brand.jpg";
import loginImg from '../images/logo/user.jpg'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../redux/userSlice";
import { userSel } from "../redux/selector/userSelector";
import { avatarBaseURL } from "../utils/serverConstant";
import { useContext } from "react";
import { SocketContext } from "../providers/SocketProvider";
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(userSel);
  const { socket } = useContext(SocketContext);
  const token = localStorage.getItem('token')

  const goLogout = () => {
    socket.emit('user-out', token)
    dispatch(logOut());
    navigate("/");
  };
  return (
    <div className="header bg-white z-50">
      <div className="logo">
        <Avatar
          size="large"
          onClick={() => navigate("/")}
          src={<img className="rounded-full" src={logo} alt="logo" />}
        />
      </div>
      <div className="menu">
        <div className="main-menu flex-grow">
          <ul>
            <li>
              <img
                className="avatar large"
                src={user ? avatarBaseURL + user.avatar :
                  // avatarBaseURL + "/img/user/user.png"
                  logoutImg
                }
                alt="avatar"
              />
            </li>
          </ul>
        </div>
        <div className="user-menu">
          <div className="user-menu">
            <Avatar
              size="large"
              onClick={goLogout}
              src={<i className="ion-log-in" />}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
