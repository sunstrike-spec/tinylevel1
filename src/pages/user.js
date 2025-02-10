import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userSel } from "../redux/selector/userSelector";
import Layout from "./Layout";
import Blog from "../components/Blog";
import { blogsSel } from "../redux/selector/blogSelector";
import { Link } from "react-router-dom";
import SearchInput from "../components/SearchInput";
import Context from "../hooks/context";
import { getAllBlogsRedux } from "../redux/blogSlice";

export default function User() {
  const dispatch = useDispatch();
  const { search } = useContext(Context);
  const regSearch = new RegExp(search, "ig");
  const user = useSelector(userSel);
  const blogs = useSelector(blogsSel);
  useEffect(() => {
    dispatch(getAllBlogsRedux());
  }, [])
  return (
    <Layout avatar={user.avatar}>
      <div className="flex">

        <div className="flex justify-end mb-5">
          <Link
            to={user.role !== "admin" ? "/user/create" : "/admin/create_blog"}
            className="btn"
          >
            Add Article
          </Link>
        </div>
        <div>
          <SearchInput />
        </div>
      </div>
      {!!blogs &&
        blogs
          .filter((item) =>
            (
              item.content +
              " " +
              item.title +
              " " +
              item.user.name +
              " " +
              item.updated_at
            ).match(regSearch)
          )
          .map((item) => (
            <Blog key={item._id} {...item} userRole={user.role} />
          ))}
    </Layout>
  );
}
