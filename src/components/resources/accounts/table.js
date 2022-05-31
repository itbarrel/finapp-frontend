import React, { memo, useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAccountsList } from "../../../store/slices/resources/account";
import { log } from "../../../utils/console-log";

const Accounts = memo((props) => {
  const { list } = useSelector(({ resources }) => resources.Account);
  const totalItems = useSelector(
    ({ resources }) => resources.Account.total_items
  );
  const dispatch = useDispatch();
  const [sort, setSort] = useState({});
  const [itemsPerPage, setDataItemsPerPage] = useState();
  const [pageNumber, setPageNumber] = useState(1);

  const handleChange = (pagination, filters, sorter) => {
    log(
      "Various parameters of Table, change in Accounts page",
      pagination,
      filters,
      sorter
    );
    setSort(sorter);
    setPageNumber(pagination.current);
    setDataItemsPerPage(pagination.pageSize);
    setPagination(pagination);
  };

  const columns = [
    {
      title: "Name*",
      dataIndex: "name",
      key: "name",
      width: 120,
      render: (text) => <span className="gx-link">{text}</span>,
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortOrder: sort.columnKey === "name" && sort.order,
      ellipsis: true,
    },
    {
      title: "Domain Name*",
      dataIndex: "tenant_name",
      key: "tenant_name",
      width: 120,
      sorter: (a, b) => a.tenant_name.localeCompare(b.tenant_name),
      sortOrder: sort.columnKey === "tenant_name" && sort.order,
      ellipsis: true,
    },
    {
      title: "Active",
      dataIndex: "active",
      key: "active",
      width: 120,
      render: (text) => <span className="gx-link">{text ? "Yes" : "No"}</span>,
      sorter: (a, b) => a.active > b.active,
      sortOrder: sort.columnKey === "active" && sort.order,
      ellipsis: true,
    },
  ];

  const [pagination, setPagination] = useState({
    hideOnSinglePage: true,
    total: totalItems,
    defaultPageSize: 8,
    showSizeChanger: true,
    pageSizeOptions: [8, 10, 20, 50, 100],
    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
  });

  const [tableSetting, setTableSetting] = useState({
    bordered: true,
    loading: false,
    pagination,
    size: "default",
    expandedRowRender: false,
    title: undefined,
    showHeader: true,
    footer: false,
    rowSelection: false,
    scroll: undefined,
    rowKey: "id",
  });

  useEffect(() => {
    const query = {
      limit: itemsPerPage,
      offset: pageNumber,
    };
    dispatch(getAccountsList(query));
  }, [itemsPerPage, pageNumber, pagination]);

  return (
    <>
      <Table
        className="gx-table-responsive"
        {...tableSetting}
        columns={columns}
        dataSource={list}
        onChange={handleChange}
      />
    </>
  );
});

Accounts.displayName = Accounts;
export default Accounts;
