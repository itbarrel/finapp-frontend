import React, { memo } from "react";
import { Progress } from "antd";
import {
  DashboardFilled,
  LinkOutlined,
  FileTextOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import Widget from "../Widget";
import PropTypes from "prop-types";
import DeleteIncident from "../resources/incident/button/deleteButton";
import UpdateButton from "../resources/incident/button/update-button";

const Card = memo(({ title, createdAt, incident }) => {
  return (
    <Widget
      styleName={"gx-card-widget"}
      extra={
        <ul className="gx-list-inline gx-ml-auto gx-mb-0 gx-text-grey">
          <li>
            <UpdateButton incident={incident} />
          </li>
          <li>
            <DeleteIncident incident={incident} />
          </li>
        </ul>
      }
      text={<Progress percent={50} showInfo={true} size={"small"} />}
    >
      <>
        <h2 className="gx-mb-1">{title}</h2>
        <p className="gx-text-grey gx-fs-sm gx-mb-4">{createdAt}</p>
        <ul className="gx-text-center gx-list-inline gx-mb-2 gx-mb-lg-1">
          <li>
            <DashboardFilled style={{ fontSize: "22px", color: "orange" }} />
          </li>
          <li>
            <LinkOutlined style={{ fontSize: "22px", color: "green" }} />
          </li>
          <li>
            <i
              className="icon icon-map-drawing"
              style={{ fontSize: "22px", color: "blue" }}
            ></i>
          </li>
          <li>
            <DashboardOutlined style={{ fontSize: "22px", color: "orange" }} />
          </li>
          <li>
            <FileTextOutlined style={{ fontSize: "22px", color: "dark" }} />
          </li>
        </ul>
      </>
    </Widget>
  );
});

Card.displayName = Card;

Card.propTypes = {
  title: PropTypes.string,
  createdAt: PropTypes.string,
  incident: PropTypes.object,
};

export default Card;
