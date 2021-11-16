import React, { memo } from "react";
import { Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import IntlMessages from "../../../../utils/IntlMessages";
import { useDispatch } from "react-redux";
import { log } from "../../../../utils/console-log";
import {
  removeIncident,
  current_item,
} from "../../../../store/slices/resources/incidents";
import PropTypes from "prop-types";

const DeleteButton = memo(({ incident }) => {
  const dispatch = useDispatch();

  const handleDelete = (Current_user) => {
    log("handleDelete incident dashboard", Current_user.id);
    dispatch(removeIncident(Current_user.id));
    dispatch(current_item(Current_user));
  };
  return (
    <>
      <Popconfirm
        title={<IntlMessages id="sure.for.delete" />}
        okText={<IntlMessages id="Yes" />}
        cancelText={<IntlMessages id="No" />}
        onConfirm={() => handleDelete(incident)}
      >
        <DeleteOutlined />
      </Popconfirm>
    </>
  );
});

DeleteButton.displayName = DeleteButton;

DeleteButton.propTypes = {
  incident: PropTypes.object.isRequired,
};

export default DeleteButton;
