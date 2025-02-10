import { Routes, Route } from "react-router-dom";

import Layout from "../../pages/Layout";
import Blogs from "./blogs";
import Users from "./users";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Admin() {

  // const isAuthenticated = useSelector(state => state.user.isAuthenticated);
  // console.log('isAuthenticated');

  return (
    <Layout>
      <Routes>
        <Route index element={<Users />} />
        <Route path="/users/*" element={<Users />} />
        <Route path="/blogs/*" element={<Blogs />} />
      </Routes>
    </Layout>
  );
}
