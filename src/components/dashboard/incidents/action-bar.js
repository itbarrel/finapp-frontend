import React, { memo, useEffect, useState } from "react";
import { Row, Button, Dropdown, Menu } from "antd";
import Widget from "../../Widget";
import AddIncident from "../../resources/incident/form-model";
import {
  TeamOutlined,
  UsergroupDeleteOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { getFilteredIncidentList } from "../../../store/slices/resources/incidents";

const ActionBar = memo(() => {
  const [visible, setVisible] = useState(false);
  const [filterIncidents, setFilterIncidents] = useState("open");
  const dispatch = useDispatch();

  const handleMenuClick = (e) => {
    setFilterIncidents(e.key);
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="open">Active Incidents</Menu.Item>
      <Menu.Item key="hold">On Hold Incidents</Menu.Item>
      <Menu.Item key="close">Closed Incidents</Menu.Item>
    </Menu>
  );

  const filterValues = {
    open: "Active Incidents",
    hold: "On Hold Incidents",
    close: "Closed Incidents",
  };

  useEffect(() => {
    const onFilter = { status: filterIncidents };
    dispatch(getFilteredIncidentList(onFilter));
  }, [filterIncidents]);

  return (
    <>
      <Widget styleName={"gx-card-widget"} align="middle">
        <Row justify="space-between ">
          <div>
            <AddIncident
              title={"Create Incident"}
              visible={visible}
              setVisible={setVisible}
              type="text"
              styleName="gx-m-0"
            />
            <Button type="text" icon={<TeamOutlined />} className="gx-m-0">
              Alert Team
            </Button>
            <Button
              type="text"
              icon={<UsergroupDeleteOutlined />}
              className="gx-m-0"
            >
              User Status
            </Button>
            <Button
              type="text"
              icon={<UsergroupDeleteOutlined />}
              className="gx-m-0"
            >
              Action Plan Wizard
            </Button>
          </div>
          <Dropdown overlay={menu} className={"gx-my-auto"}>
            <span className="ant-dropdown-link gx-mx-3 gx-my-3 ">
              {(filterValues[filterIncidents] ||= "Filter Incident")}
              <DownOutlined />
            </span>
          </Dropdown>
        </Row>
      </Widget>
    </>
  );
});

ActionBar.displayName = ActionBar;

export default ActionBar;
