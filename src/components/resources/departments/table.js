import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDepartmentsList,
  removeDepartment,
  current_item,
} from "../../../store/slices/resources/departments";
import { Table, Button, Popconfirm } from "antd";
import { log } from "../../../utils/console-log";
import UpdateDepartment from "./form-model";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { setLoading } from "../../../store/slices/loader";

const Accounts = memo((props) => {
  const dispatch = useDispatch();
  const departmentList = useSelector(
    ({ resources }) => resources.Departments.list
  );
  const loader = useSelector(({ loader }) => loader.loading?.departments);
  const totalItems = useSelector(
    ({ resources }) => resources.Departments.total_items
  );
  const [selectedDepartment, setSelectedDepartment] = useState({});
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
    loading: loader,
    pagination,
    size: "small",
    expandedRowRender: false,
    title: undefined,
    showHeader: true,
    footer: false,
    scroll: undefined,
    rowKey: "id",
  });

  const handleDelete = (Current_user) => {
    log("handleDelete department", Current_user.id);
    dispatch(removeDepartment(Current_user.id));
    dispatch(current_item(Current_user));
  };

  const handleUpdate = (Current_user) => {
    log("handleUpdate Department", Current_user);
    setVisible(true);
    setSelectedDepartment(Current_user);
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

  const handleChange = (pagination, filters, sorter) => {
    log(
      "Various parameters of Table, change in Department page",
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
    dispatch(getDepartmentsList(query));
  }, [pagination]);

  return (
    <>
      <UpdateDepartment
        visible={visible}
        setVisible={setVisible}
        selected={selectedDepartment}
        title={"Update Department"}
        off
      />
      <Table
        className="gx-table-responsive"
        {...tableSetting}
        columns={columns}
        dataSource={departmentList}
        onChange={handleChange}
      />
    </>
  );
});

Accounts.displayName = Accounts;
export default Accounts;
