import React from "react";
import { useNavigate } from "react-router-dom";

export default function NavigateButton() {
  const navigate = useNavigate();
  return (
    <div>
      <button className="btn" onClick={() => navigate("/admin/users")}>
        Users
      </button>
      <button className="btn" onClick={() => navigate("/admin/blogs")}>
        Blogs
      </button>
    </div>
  );
}
