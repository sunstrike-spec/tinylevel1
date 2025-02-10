import React from "react";

const SideBar = () => {
  const onMenu = (e) => {
    const children = document.querySelector(".bar-content ul").children;

    for (let i = 0; i < children.length; i++) {
      children[i].className = ""
    }
    e.target.className = "active"
  }

  return (
    <div className="side-bar">
      <div className="logo">
        <h1>E-Shop</h1>
      </div>
      <div className="bar-content">
        <ul onClick={e => onMenu(e)}>
          <li className="active"><i className="ion-social-apple"></i> Dashboard</li>
          <li><i className="ion-android-cloud"></i> Shop</li>
          <li><i className="ion-calendar"></i> Calendar</li>
          <li><i className="ion-ios-settings"></i> Settings</li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
