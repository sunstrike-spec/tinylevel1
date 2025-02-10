import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Layout from "./Layout";
// import Message from "../components/Message";

import { signin } from "../redux/userSlice";
import { signinErrSel } from "../redux/selector/userSelector";
import sideImg from "../images/cover/side.svg";
import { avatarBaseURL } from "../utils/serverConstant";

const Signin = () => {
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
      dispatch(signin({ payload, navigate }));
    }
  };
  return (
    <Layout>
      <div className="auth">
        <div className="form flex-grow">
          <p className="text-center">Sign in to Shop</p>
          <form className="flex-grow " onSubmit={(e) => handleSignin(e)}>
            <div className="mx-auto h-28 w-28 relative">
              <img
                className="rounded-full absolute h-28 w-28 bg-blue-500 "
                src={`${avatar}`}
                alt="avatar"
              />
              <input
                type="file"
                className="absolute h-28 w-28 rounded-full opacity-0"
                id="avatar"
                name="avatar"
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
                name="name"
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
                name="email"
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
                name="password"
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
                name="confirm"
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
              value="SIGN IN"
            />
          </form>
          <p className="font-12 text-center">
            If you already have an account?{" "}
            <span>
              <Link className="underline" to="/login">
                Login
              </Link>
            </span>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Signin;
