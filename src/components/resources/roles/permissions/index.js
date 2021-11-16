/* eslint-disable react/display-name */
import React, { memo, useEffect, useState } from "react";
import {  useSelector } from "react-redux";
import { Table, Checkbox } from "antd";

const PermissionTable = memo(({ permissions, setPermissions }) => {
  const { entities, operations } = useSelector(
    ({ resources }) => resources.Role
  );

  const [columns, setColumns] = useState([]);
  const [records, setRecords] = useState([]);

  const initializePermissions = () => {
    let permissionObj = {};
    operations.forEach((operation) => {
      entities.forEach((entity) => {
        permissionObj[entity] ||= {};
        permissionObj[entity][operation] ||= false;
      });
    });
    setPermissions(permissionObj);
  };

  const generateColumns = () => {
    const enteries = [];

    enteries.push({
      title: "Permissions",
      dataIndex: "permissions",
      key: "permissions",
      width: 100,
      fixed: "left",
      render: (text) => <span className="gx-link">{text}</span>,
    });

    entities.forEach((element) => {
      enteries.push({
        title: element,
        dataIndex: element,
        key: element,
        width: 500 / entities.length,
        render: (text, record, _index) => (permissions[element] ? (
          <Checkbox
            onChange={() => onChange(event, element, record.key)}
            checked={permissions[element][record.key]}
            disabled={false}
          ></Checkbox>
        ) : (
          text
        )),
      });
    });

    setColumns(enteries);
  };

  const generateRecords = () => {
    const enteries = [];
    let entry = {};

    operations.forEach((operation) => {
      entry = {};
      entry.key = operation;
      entry.permissions = operation === "*" ? "All" : operation;
      entry.model = operation === "*" ? "All" : operation;
      enteries.push(entry);
    });

    setRecords(enteries);
  };

  const onChange = (e, entity, operation) => {
    if (permissions && permissions[entity]) {
      permissions[entity][operation] = e.target.checked;
      setPermissions({
        ...permissions,
        [entity]: { ...permissions[entity], [operation]: e.target.checked },
      });
    }
  };

  const [tableSetting] = useState({
    bordered: true,
    size: "small",
    expandedRowRender: false,
    title: undefined,
    showHeader: true,
    footer: false,
    scroll: undefined,
    rowKey: "id",
    pagination: false
  });

  useEffect(() => {
    initializePermissions();
  }, [entities]);

  useEffect(() => {
    generateRecords();
    generateColumns();
  }, [permissions]);

  return (
    <>
      <Table
        className="gx-table-responsive"
        scroll={{ x: 1500, y: 300 }}
        {...tableSetting}
        columns={[...columns]}
        dataSource={[...records]}
      />
    </>
  );
});

PermissionTable.displayName = PermissionTable;
export default PermissionTable;
