/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/display-name */
import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTaskList,
  removeTask,
  current_item,
} from "../../../store/slices/resources/tasks";
import { Table, Button, Popconfirm } from "antd";
import { log } from "../../../utils/console-log";
import UpdateTask from "./form-model";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const Accounts = memo(() => {
  const dispatch = useDispatch();
  const taskList = useSelector(({ resources }) => resources.Task.list);
  const loader = useSelector(({ resources }) => resources.Task.loading);
  const totalItems = useSelector(({ resources }) => resources.Task.total_items);
  const [loading] = useState(loader);
  const [selectedTask, setSelectedTask] = useState({});
  const [visible, setVisible] = useState(false);
  const [sort, setSort] = useState({});

  const handleDelete = (Current_user) => {
    log("handleDelete department", Current_user.id);
    dispatch(removeTask(Current_user.id));
    dispatch(current_item(Current_user));
  };

  const handleUpdate = (Current_user) => {
    log("handleUpdate Department", Current_user);
    setVisible(true);
    setSelectedTask(Current_user);
  };

  const columns = [
    {
      title: "Name*",
      dataIndex: "title",
      key: "title",
      width: 80,
      sorter: (a, b) => a.title.localeCompare(b.title),
      sortOrder: sort.columnKey === "title" && sort.order,
    },
    {
      title: "Status",
      dataIndex: "active",
      key: "active",
      width: 5,
      render: (text, record) => (
        <span className="">{record.active ? "Active" : "Un-Active"}</span>
      ),
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
      width: 5,
      render: (text, record) => (
        <span className="gx-link">{record.author}</span>
      ),
      sorter: (a, b) => a.author.localeCompare(b.author),
      sortOrder: sort.columnKey === "author" && sort.order,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      width: 10,
      render: (text, record) => <span className="">{record.type}</span>,
    },
    {
      title: "Links",
      dataIndex: "links",
      key: "links",
      width: 80,
      render: (text, record) => <span className="gx-link">{record.links}</span>,
      sorter: (a, b) => a.links.localeCompare(b.links),
      sortOrder: sort.columnKey === "links" && sort.order,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: 200,
      render: (text, record) => record.description,
      sorter: (a, b) => a.description.localeCompare(b.description),
      sortOrder: sort.columnKey === "description" && sort.order,
    },
    {
      title: "Action",
      dataIndex: "Action",
      key: "Action",
      width: 5,
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
      "Various parameters of Table, change in Tasks page",
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
    dispatch(getTaskList(query));
  }, [pagination]);

  return (
    <>
      <UpdateTask
        visible={visible}
        setVisible={setVisible}
        selected={selectedTask}
        title={"Update Task"}
        off
      />
      <Table
        className="gx-table-responsive"
        {...tableSetting}
        columns={columns}
        dataSource={taskList}
        onChange={handleChange}
      />
    </>
  );
});

Accounts.displayName = Accounts;
export default Accounts;
