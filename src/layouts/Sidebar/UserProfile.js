import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Popover } from "antd";
import { onLogOut } from "../../store/slices/auth";
import Link from "../../components/helpers/link/";

const UserProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector(({ auth }) => auth.user);

  const userMenuOptions = (
    <ul className="gx-user-popover">
      <Link url="/secure/profile" passHref={true}>
        <li>My Account</li>
      </Link>
      <li onClick={() => dispatch(onLogOut())}>Logout</li>
    </ul>
  );

  return (
    <div className="gx-flex-row gx-align-items-center gx-mb-4 gx-avatar-row">
      <Popover
        placement="bottomRight"
        content={userMenuOptions}
        trigger="click"
      >
        <Avatar
          src={"/images/avatar/domnic-harris.png"}
          className="gx-size-40 gx-pointer gx-mr-3"
          alt=""
        />
        <span className="gx-avatar-name">
          {user?.firstName} {user?.lastName}
          <i className="icon icon-chevron-down gx-fs-xxs gx-ml-2" />
        </span>
      </Popover>
    </div>
  );
};

export default UserProfile;
