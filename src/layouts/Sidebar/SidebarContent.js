/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prefer-destructuring */
import React, { useEffect } from "react";
import { Menu } from "antd";
import Link from "next/link";

import { useRouter } from "next/router";
import CustomScrollbars from "../../utils/CustomScrollbars";
import SidebarLogo from "./SidebarLogo";
import UserProfile from "./UserProfile";
import {
  NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
  THEME_TYPE_LITE,
} from "../../constants/ThemeSetting";
import IntlMessages from "../../utils/IntlMessages";
import { useDispatch, useSelector } from "react-redux";
import permissionCheck from "../../utils/PermissionGuard";
import { setLoading } from "../../store/slices/loader";

const MenuItemGroup = Menu.ItemGroup;

const SidebarContent = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  let { navStyle, themeType, pathname } = useSelector(({ ui }) => ui.settings);

  const getNoHeaderClass = (navStyle) => {
    if (
      navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR ||
      navStyle === NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR
    ) {
      return "gx-no-header-notifications";
    }
    return "";
  };

  useEffect(() => {
    return () => {
      dispatch({ type: setLoading.type, payload: {} });
    };
  }, [router.pathname]);

  const selectedKeys = pathname.substr(1);
  const defaultOpenKeys = selectedKeys.split("/")[1];

  return (
    <>
      <SidebarLogo />
      <div className="gx-sidebar-content">
        <div
          className={`gx-sidebar-notifications ${getNoHeaderClass(navStyle)}`}
        >
          <UserProfile />
        </div>
        <CustomScrollbars className="gx-layout-sider-scrollbar">
          {/* side bar */}
          <Menu
            defaultOpenKeys={[defaultOpenKeys]}
            selectedKeys={[selectedKeys]}
            theme={themeType === THEME_TYPE_LITE ? "lite" : "dark"}
            mode="inline"
          >
            {/* DashBoard */}
            <MenuItemGroup
              key="dashboard"
              className="gx-menu-group"
              title={<IntlMessages id="dashBoard" />}
            >
              {/* main */}
              <Menu.Item key={"/secure/dashboard/main"}>
                <Link href="/secure/dashboard/main">
                  <a>
                    <i className="icon icon-widgets" />
                    <span>
                      <IntlMessages id="sidebar.main" />
                    </span>
                  </a>
                </Link>
              </Menu.Item>

              {/* incident */}
              <Menu.Item key={"/secure/dashboard/incidents"}>
                <Link href="/secure/dashboard/incidents">
                  <a>
                    <i className="icon icon-etherium" />
                    <span>
                      <IntlMessages id="incidents" />
                    </span>
                  </a>
                </Link>
              </Menu.Item>
            </MenuItemGroup>
            {/* settings */}
            <MenuItemGroup
              key="setting"
              className="gx-menu-group"
              title={<IntlMessages id="settings" />}
            >
              {/* Accounts */}
              {permissionCheck({ Accounts: ["view"] }) && (
                <Menu.Item key="accounts">
                  <Link href="/secure/accounts">
                    <a>
                      <i className="icon icon-crm" />
                      <span>
                        <IntlMessages id="accounts" />
                      </span>
                    </a>
                  </Link>
                </Menu.Item>
              )}
              {/* Users */}
              {permissionCheck({ Users: ["view"] }) && (
                <Menu.Item key="users">
                  <Link href="/secure/users">
                    <a>
                      <i className="icon icon-widgets" />
                      <span>
                        <IntlMessages id="Users" />
                      </span>
                    </a>
                  </Link>
                </Menu.Item>
              )}
              {/* roles */}
              {permissionCheck({ Roles: ["view"] }) && (
                <Menu.Item key="roles">
                  <Link href="/secure/roles">
                    <a>
                      <i className="icon icon-culture-calendar" />
                      <span>
                        <IntlMessages id="Roles" />
                      </span>
                    </a>
                  </Link>
                </Menu.Item>
              )}
            </MenuItemGroup>
          </Menu>
        </CustomScrollbars>
      </div>
    </>
  );
};

SidebarContent.propTypes = {};
export default SidebarContent;
