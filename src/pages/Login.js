import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "./Layout";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/userSlice";
import { loginErrSel } from "../redux/selector/userSelector";
import { SocketContext } from "../providers/SocketProvider";
import { useContext } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const errMess = useSelector(loginErrSel);
  const navigate = useNavigate();
  const { socket } = useContext(SocketContext);


  const handleLogin = (e) => {
    e.preventDefault();
    const payload = { email, password };
    dispatch(login({ payload, navigate, socket }));
  };

  useEffect(() => {
    socket.on('multi-user', () => {
      navigate('/')
      alert('already exist');
    })
  }, [socket])

  return (
    <Layout avatar="user.png">
      <div className="auth">

        <div className="form flex-grow pt-20">
          <p className="text-center">Login</p>
          <form className="flex-grow" onSubmit={(e) => handleLogin(e)}>
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
            <div className="text-red-500">{errMess?.email}</div>
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
            <div className="text-red-500">{errMess?.password}</div>
            <input
              type="submit"
              id="name"
              className="btn mt-10"
              placeholder="name"
              value="LOG IN"
            />
          </form>
          <p className="font-12 text-center">
            If you don't create account?{" "}
            <span>
              <Link className="underline" to="/signin">
                Signin
              </Link>
            </span>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
