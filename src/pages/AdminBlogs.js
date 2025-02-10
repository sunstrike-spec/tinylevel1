import React, { useCallback, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userSel } from "../redux/selector/userSelector";
import Blog from "../components/Blog";
import { blogsLenSel, blogsSel } from "../redux/selector/blogSelector";
import { Link } from "react-router-dom";
import NavigateButton from "../components/NavigateButton";
import SearchInput from "../components/SearchInput";
import Context from "../hooks/context";
import { getPageBlogsRedux } from "../redux/blogSlice";
import { Pagination, Spin } from "antd";
import { useNavigate } from "react-router-dom";

const contentStyle = {
  padding: 50,
  background: "rgba(0,0,0,0.05)",
  borderRadius: 4,
};

const content = <div style={contentStyle} />;

export default function AdminBlogs() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(userSel);
  const blogs = useSelector(blogsSel);
  //-------search---------
  const { search } = useContext(Context);
  //------------pagenagtion-------
  const [page, setPage] = useState();
  const totalPageNum = useSelector(blogsLenSel);
  const blogPage = JSON.parse(localStorage.getItem("blogPage"));

  const pagenationHandle = useCallback((page, pageSize) => {
    localStorage.setItem(
      "blogPage",
      JSON.stringify({
        page,
        pageSize,
      })
    );

    setPage({ page, pageSize });
  }, []);

  const chattingPageOpen = () => {
    navigate('/user/chatting')
  }

  useEffect(() => {
    dispatch(
      getPageBlogsRedux({
        page: blogPage.page || 1,
        pageSize: blogPage.pageSize || 5,
        searchVal: search,
      })
    );
  }, [totalPageNum, page]);
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-between">
          {user.role === "admin" && <NavigateButton />}
          <Link to={`/${user.role}/blogs/create`} className="btn">
            Add Article
          </Link>
        </div>
        <div className="flex items-center">
          <SearchInput />
        </div>
        <div className="flex items-center">
          <Pagination
            className="text-center"
            pageSizeOptions={[5, 10, 15, 20]}
            total={totalPageNum}
            showSizeChanger={true}
            defaultPageSize={5}
            onChange={(page, pageSize) => {
              pagenationHandle(page, pageSize);
            }}
            current={blogPage.page}
          />
        </div>

      </div>

      <div className="flex ml-4 items-center">
        <div className="font-bold mt-5">
          <span>Total Result: </span>
          {totalPageNum}
        </div>

      </div>
      <div className="
                      fixed 
                      cursor-pointer 
                      right-0 top-30 
                      w-[100px] h-[100px] rounded-full 
                      bg-blue-500 hover:opacity-50 
                      flex 
                      items-center
                    "
        onClick={chattingPageOpen}
      >
        <div className="text-center w-full text-xl">Chatting</div>
      </div>
      {!!blogs ? (
        blogs.map((item) => (
          <div key={item._id} className="border-2 mx-4 px-6 my-2">
            <Blog {...item} userRole={user.role} />
          </div>
        ))
      ) : (
        <div>
          <Spin tip="Loading" size="large">
            {content}
          </Spin>
        </div>
      )}


    </div>
  );
}
