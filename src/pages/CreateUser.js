import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import sideImg from "../images/cover/side.svg";
import { makeUser } from "../redux/userSlice";
import { signinErrSel } from "../redux/selector/userSelector";
import { avatarBaseURL } from "../utils/serverConstant";

const CreateUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [avatar, setAvatar] = useState(avatarBaseURL + "/img/user/user.png");
  const [avatarFile, setAvatarFile] = useState("none");
  const [err, setErr] = useState("");
  const signErr = useSelector(signinErrSel);
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
    if (password !== confirm) {
      setErr("Please confirm the password correctly!");
      return false;
    }
    setErr("");
    return true;
  };

  const handleSignin = (e) => {
    e.preventDefault();
    const payload = { name, email, password, confirm, avatarFile };

    if (validate()) {
      dispatch(makeUser({ payload, navigate }));
      console.log(signErr);
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
          <p className="text-center">ADD USER</p>
          <form className="flex-grow " onSubmit={(e) => handleSignin(e)}>
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
                placeholder="Enter user name"
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
            <div className="relative">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span>
                <i className="ion-ios-locked"></i>
              </span>
            </div>
            <div className="relative">
              <label htmlFor="comfirm">Confirm</label>
              <input
                type="password"
                id="confirm"
                placeholder="Confirm your password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
              />
              <span>
                <i className="ion-ios-locked"></i>
              </span>
            </div>
            <p className="text-red-500">{signErr?.email}</p>
            <p className="text-red-500">{err}</p>
            <input
              type="submit"
              className="btn mt-10"
              placeholder="name"
              value="ADD USER"
            />
            <button
              className="btn  mt-10"
              onClick={() => navigate("/admin/users")}
            >
              CANCEL
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
