import React from "react";
import { connect } from "react-redux";
import { Avatar, Popover } from "antd";
// import { userSignOut } from "../../../redux/actions/Auth";

const UserInfo = () => {
  const userMenuOptions = (
    <ul className="gx-user-popover">
      <li>My Account</li>
      <li>Connections</li>
      {/* <li onClick={() => this.props.userSignOut()}>Logout</li> */}
      <li>Logout</li>
    </ul>
  );

  return (
    <Popover
      overlayClassName="gx-popover-horizantal"
      placement="bottomRight"
      content={userMenuOptions}
      trigger="click"
    >
      <Avatar
        src={"/images/images/avatar/domnic-harris.png"}
        className="gx-avatar gx-pointer"
        alt=""
      />
    </Popover>
  );
};

export default UserInfo;
