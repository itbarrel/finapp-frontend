/* eslint-disable react/display-name */
import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getIncidentList,
  removeIncident,
  current_item,
} from "../../../store/slices/resources/incidents";
import { Table, Button, Popconfirm } from "antd";
import { log } from "../../../utils/console-log";
import UpdateIncident from "./form-model";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { PAGINATION, TABLE_SETTING } from "../../../constants/configurations";

const IncidentTable = memo(() => {
  const dispatch = useDispatch();
  const incidentList = useSelector(({ resources }) => resources.Incidents.list);
  const totalItems = useSelector(
    ({ resources }) => resources.Incidents.total_items
  );
  const [selectedIncident, setSelectedIncident] = useState({});
  const [visible, setVisible] = useState(false);
  const [sort, setSort] = useState({});
  const [pagination, setPagination] = useState({
    total: totalItems,
    ...PAGINATION,
  });
  const [tableSetting] = useState({ pagination, ...TABLE_SETTING });

  const handleDelete = (Current_user) => {
    log("handleDelete incident", Current_user.id);
    dispatch(removeIncident(Current_user.id));
    dispatch(current_item(Current_user));
  };

  const handleUpdate = (Current_user) => {
    log("handleUpdate incident", Current_user);
    setVisible(true);
    setSelectedIncident(Current_user);
  };

  const columns = [
    {
      title: "Name*",
      dataIndex: "name",
      key: "name",
      width: 120,
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortOrder: sort.columnKey === "name" && sort.order,
      ellipsis: true,
    },
    {
      title: "Status",
      dataIndex: "active",
      key: "active",
      width: 120,
      render: (text) => <span className="gx-link">{text ? "Yes" : "No"}</span>,
    },
    {
      title: "Action",
      dataIndex: "Action",
      key: "Action",
      width: 360,
      render: (text, record) => (
        <>
          <Button
            size="large"
            icon={<EditOutlined />}
            onClick={() => handleUpdate(record)}
          />
          <Popconfirm
            title="Are you sure delete this incident?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => handleDelete(record)}
          >
            <Button size="default" icon={<DeleteOutlined />} />
          </Popconfirm>
        </>
      ),
    },
  ];

  const handleChange = (pagination, filters, sorter) => {
    log(
      "Various parameters of Table, change in Incident page",
      pagination,
      filters,
      sorter
    );
    const {} = pagination;
    setSort(sorter);
    setPagination(pagination);
  };

  useEffect(() => {
    const query = {
      limit: pagination.defaultPageSize,
      offset: pagination.current || pagination.defaultCurrent,
    };
    dispatch(getIncidentList(query));
  }, [pagination]);

  return (
    <>
      <UpdateIncident
        visible={visible}
        setVisible={setVisible}
        selected={selectedIncident}
        title={"Update Incident"}
        off
      />
      <Table
        className="gx-table-responsive"
        columns={columns}
        dataSource={incidentList}
        onChange={handleChange}
        {...tableSetting}
      />
    </>
  );
});

IncidentTable.displayName = IncidentTable;
export default IncidentTable;
