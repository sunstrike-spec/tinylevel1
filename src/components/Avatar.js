import React from "react";

const Avatar = (props) => {
  return (
    <div onClick={props.onClick} className={"avatar " + props.size}>
      {props.src}
    </div>
  );
};

export default Avatar;
