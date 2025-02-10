import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { updateUserRedux } from "../redux/userSlice";
import { usersSel } from "../redux/selector/userSelector";
import sideImg from "../images/cover/side.svg";
import { avatarBaseURL } from "../utils/serverConstant";

export default function UpdateUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const user = useSelector(usersSel).filter((item) => item._id === id)[0];

  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [avatar, setAvatar] = useState(avatarBaseURL+user?.avatar);
  const [avatarFile, setAvatarFile] = useState("none");
  const [err, setErr] = useState("");
  const validate = () => {
    if (name === "") {
      setErr("Please type the name!");
      return false;
    }
    if (email === "") {
      setErr("Please type the email!");
      return false;
    }
    if (email === "") {
      setErr("Please type the email!");
      return false;
    }
    if (email === "") {
      setErr("Please type the email!");
      return false;
    }
    setErr("");
    return true;
  };
  const handleUpdateUser = (e) => {
    e.preventDefault();
    const payload = { name, email, avatarFile };

    if (validate()) {
      dispatch(updateUserRedux({ id, payload, navigate }));
    }
  };
  return (
    <div>
      <div className="auth">
        <div className="img">
          <p>Welcome to visite our site</p>
          <img src={sideImg} alt="sideImg" />
        </div>
        <div className="form flex-grow">
          <p className="text-center">Update User</p>
          <form className="flex-grow " onSubmit={(e) => handleUpdateUser(e)}>
            <div className="mx-auto h-28 w-28 relative">
              <img
                className="rounded-full absolute h-28 w-28"
                src={`${avatar}`}
                alt=""
              />
              <input
                type="file"
                className="absolute h-28 w-28 rounded-full opacity-0"
                id="avatar"
                onChange={(e) => {
                  setAvatar(URL.createObjectURL(e.target.files[0]));
                  setAvatarFile(e.target.files[0]);
                }}
              />
            </div>
            <div className="relative">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <span>
                <i className="ion-ios-person"></i>
              </span>
            </div>
            <div className="relative">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span>
                <i className="ion-ios-email"></i>
              </span>
            </div>
            <p className="text-red-500">{err}</p>
            <input
              type="submit"
              className="btn mt-10"
              placeholder="name"
              value="UPDATE"
            />
            <button className="btn" onClick={() => navigate("/admin/users")}>
              BACK
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
