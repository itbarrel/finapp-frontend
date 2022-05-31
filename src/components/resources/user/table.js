/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/display-name */
import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserList,
  removeUser,
  current_item,
} from "../../../store/slices/resources/user";
import { getRolesList } from "../../../store/slices/resources/role";
import { Table, Button, Popconfirm } from "antd";
import { log } from "../../../utils/console-log";
import UpdateUser from "./form-model";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const Accounts = memo(() => {
  const dispatch = useDispatch();
  const { list } = useSelector(({ resources }) => resources.User);
  const loader = useSelector(({ resources }) => resources.User.loading);
  const totalItems = useSelector(({ resources }) => resources.User.total_items);
  const [loading] = useState(loader);
  const [selectedUser, setSelectedUser] = useState({});
  const [visible, setVisible] = useState(false);
  const [sort, setSort] = useState({});

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
      "Various parameters of Table, change in User page",
      pagination,
      filters,
      sorter
    );
    setSort(sorter);
    setPagination(pagination);
  };

  const handleDelete = (Current_user) => {
    log("handleDelete User", Current_user.key);
    dispatch(current_item(Current_user));
    dispatch(removeUser(Current_user.id));
  };

  const handleUpdate = (Current_user) => {
    log("handleUpdate User", Current_user);
    setVisible(true);
    dispatch(current_item(Current_user));
    setSelectedUser(Current_user);
  };

  const columns = [
    {
      title: "Name*",
      dataIndex: "firstName",
      key: "firstName",
      width: 120,
      sorter: (a, b) => a.firstName.localeCompare(b.nafirstNameme),
      sortOrder: sort.columnKey === "firstName" && sort.order,
      ellipsis: true,
    },
    {
      title: "Email*",
      dataIndex: "email",
      key: "email",
      width: 120,
      sorter: (a, b) => a.email.localeCompare(b.email),
      sortOrder: sort.columnKey === "email" && sort.order,
      ellipsis: true,
    },
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
      width: 120,
      render: (text) => text,
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
      width: 360,
      render: (text, record) => (
        <>
          <Button
            size="large"
            icon={<EditOutlined />}
            onClick={() => handleUpdate(record)}
          />
          <Popconfirm
            title="Are you sure delete this User?"
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

  useEffect(() => {
    const query = {
      limit: pagination.defaultPageSize,
      offset: pagination.current || pagination.defaultCurrent,
    };
    dispatch(getUserList(query));
  }, [pagination]);

  useEffect(() => {
    dispatch(getRolesList());
  }, []);

  return (
    <>
      <UpdateUser
        visible={visible}
        setVisible={setVisible}
        selectedUser={selectedUser}
        title={"Update User"}
        off
      />
      <Table
        className="gx-table-responsive"
        columns={columns}
        dataSource={list}
        onChange={handleChange}
        {...tableSetting}
      />
    </>
  );
});

Accounts.displayName = Accounts;
export default Accounts;
