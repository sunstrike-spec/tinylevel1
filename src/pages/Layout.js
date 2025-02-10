import React from "react";

import Header from "../components/Header";

const Layout = (props) => {
  return (
    <div className=" mx-auto">
      <div className="flex-grow">
        <Header/>
        <div className="content">{props.children}</div>
      </div>
    </div>
  );
};

export default Layout;
