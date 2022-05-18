import React from "react";
import { BiImageAdd } from "react-icons/bi";
import { AiFillHome } from "react-icons/ai";

import "./Menu.css";

const Menu = (props) => {
  return (
    <div className="menu__conatiner">
      <div className="menu-home">
        <AiFillHome className="menu-home__menuitem__icon" />
        <p className="menu-home__menuitem">Home</p>
      </div>
      <input
        accept="image/*"
        id="contained-button-file"
        className="menu__input"
        multiple
        type="file"
        onChange={props.imagehandler}
        ref={props.imageRef}
      />
      <div className="menu-image" onClick={props.uploadImageHandler}>
        <BiImageAdd className="menu-image__menuitem__icon" />
        <p className="menu-image__menuitem">Select Image</p>
      </div>
    </div>
  );
};

export default Menu;
