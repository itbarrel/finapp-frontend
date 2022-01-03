/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/display-name */
import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getLayoutList,
    removeLayout,
    current_item,
} from "../../../store/slices/resources/layouts";
import { Table, Button, Popconfirm } from "antd";
import { log } from "../../../utils/console-log";
import UpdateLayout from "./modal";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useRouter } from 'next/router'

const LayoutTable = memo(() => {
    const dispatch = useDispatch();
    const { list } = useSelector(({ resources }) => resources.Layout);
    const loader = useSelector(({ resources }) => resources.Layout.loading);
    const totalItems = useSelector(({ resources }) => resources.Layout.total_items);
    const [loading] = useState(loader);
    const [selectedLayout, setSelectedLayout] = useState({});
    const [visible, setVisible] = useState(false);
    const [sort, setSort] = useState({});
    const router = useRouter()
    const { id } = router.query

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
        // loading: loading,
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
            "Various parameters of Table, change in Layout page",
            pagination,
            filters,
            sorter
        );
        setSort(sorter);
        setPagination(pagination);
    };

    const handleDelete = (current_layout) => {
        log("handleDelete Layout", current_layout.key);
        dispatch(current_item(current_layout));
        dispatch(removeLayout(current_layout.id));
    };

    const handleUpdate = (current_layout) => {
        log("handleUpdate Layout", current_layout);
        setVisible(true);
        dispatch(current_item(current_layout));
        setSelectedLayout(current_layout);
    };

    const columns = [
        {
            title: "Name*",
            dataIndex: "name",
            key: "name",
            width: 120,
            sorter: (a, b) => a.firstName.localeCompare(b.nafirstNameme),
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
                        title="Are you sure delete this Layout?"
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
            formId: id
        };
        dispatch(getLayoutList(query));
    }, [pagination]);


    return (
        <>
            <UpdateLayout
                visible={visible}
                setVisible={setVisible}
                selectedLayout={selectedLayout}
                title={"Update Layout"}
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

LayoutTable.displayName = LayoutTable;
export default LayoutTable;
