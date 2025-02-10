import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


import Layout from "../../pages/Layout";
import Blogs from "./blogs";
import Chatting from "../../pages/Chatting";



export default function User() {
  return (
    <Layout>
      <Routes>
        <Route index element={<Blogs />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/*" element={<Blogs />} />
        <Route path="/chatting" element={<Chatting/>}/>
      </Routes>
    </Layout>
  );
}
