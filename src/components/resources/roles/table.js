/* eslint-disable react/display-name */
import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getRolesList,
  getPermissionEntities,
  removeRole,
  setId,
  setRecord,
} from "../../../store/slices/resources/role";
import { Table, Button, Popconfirm } from "antd";
import { log } from "../../../utils/console-log";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

const Role = memo(({ setVisible, setTitle }) => {
  const dispatch = useDispatch();
  const { records, loading: loader } = useSelector(
    ({ resources }) => resources.Role
  );
  const loginUser = useSelector(({ auth }) => auth.user);
  const totalItems = useSelector(({ resources }) => resources.Role.total_items);
  const [loading] = useState(loader);
  const [sort, setSort] = useState({});

  const handleDelete = (id) => {
    log("handleDelete Role", id);
    dispatch(setId(id));
    dispatch(removeRole(id));
  };

  const handleEdit = (roleObj) => {
    log("handleUpdate role", roleObj);
    if (!roleObj.id) {
      return;
    }
    setTitle("Update Role");
    dispatch(setId(roleObj.id));
    dispatch(setRecord(roleObj));
    setVisible(true);
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
      title: "Permanent*",
      dataIndex: "default",
      key: "default",
      width: 120,
      render: text => (
        <span className="gx-link">{text === true ? "Yes" : "No"}</span>
      ),
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
      key: "action",
      width: 80,
      render: (record) => (
        <>
          {loginUser && loginUser.RoleId !== record.id && (
            <Button
              size="large"
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
            />
          )}
          {!record.default && (
            <Popconfirm
              title="Are you sure delete this Role?"
              okText="Yes"
              cancelText="No"
              onConfirm={() => handleDelete(record.id)}
            >
              <Button size="default" icon={<DeleteOutlined />} />
            </Popconfirm>
          )}
        </>
      ),
    },
  ];

  const [pagination, setPagination] = useState({
    defaultCurrent: 1,
    hideOnSinglePage: true,
    total: totalItems,
    defaultPageSize: 8,
    showSizeChanger: true,
    pageSizeOptions: [8, 10, 20, 50, 100],
    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
  });

  const [tableSetting] = useState({
    bordered: true,
    loading: loading,
    pagination,
    size: "small",
    expandedRowRender: false,
    title: undefined,
    showHeader: true,
    footer: false,
    scroll: undefined,
    rowKey: "id",
  });

  const handleChange = (pagination, filters, sorter) => {
    log(
      "Various parameters of Table, change in Role page",
      pagination,
      filters,
      sorter
    );
    setSort(sorter);
    setPagination(pagination);
  };

  useEffect(() => {
    const query = {
      limit: pagination.defaultPageSize,
      offset: pagination.current || pagination.defaultCurrent,
    };
    dispatch(getRolesList(query));
  }, []);

  useEffect(() => {
    dispatch(getPermissionEntities());
  }, []);

  return (
    <>
      <Table
        className="gx-table-responsive"
        columns={columns}
        dataSource={records}
        onChange={handleChange}
        {...tableSetting}
      />
    </>
  );
});

Role.displayName = Role;

Role.propTypes = {
  setVisible : PropTypes.any,
  setTitle : PropTypes.any
}

export default Role;
