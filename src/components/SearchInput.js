import React, { useContext, memo } from "react";
import Context from "../hooks/context";
import { useDispatch } from "react-redux";
import { getPageBlogsRedux } from "../redux/blogSlice";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { SearchOutlined } from '@ant-design/icons'

const SearchInput = () => {
  const navigator = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [param] = useSearchParams();
  const { search, setSearch } = useContext(Context);
  const searchBtnHandle = () => {
    console.log({
      page: param.get("page") || 1,
      pageSize: param.get("") || 5,
      searchVal: search,
    });
    dispatch(
      getPageBlogsRedux({
        page: 1,
        pageSize: param.get("pageSize") || 5,
        searchVal: search,
      })
    );
    navigator(
      location.pathname + `?page=1&pageSize=${param.get("pageSize") || 2}`
    );
  };
  return (
    <div className="flex border-gray-500 border-2 rounded-md text-xl p-2 m-5 search">
      <button onClick={searchBtnHandle}>
      </button>
      <input
        className=""
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        placeholder="Search..."
      />
    </div>
  );
};

export default memo(SearchInput);
