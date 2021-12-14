import { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import { Card, Table, Button, Row, Dropdown, Menu } from "antd";
import { DownloadOutlined } from '@ant-design/icons';
import { getFormLayouts, printLayout } from '../../../store/slices/resources/dynamicForm'

import { CSVLink } from "react-csv";

const Detail = memo(({ selectedFrom }) => {
    const dispatch = useDispatch();
    const formSubmissions = useSelector(({ resources }) => resources?.FormSubmission?.list);
    const { layouts } = useSelector(({ resources }) => resources?.DynamicForm);
    const thisFormSubmissions = formSubmissions.filter((fs) => { return fs.formId === selectedFrom.id })
    const title = `${selectedFrom.name} Form Submission`

    useEffect(() => {
        dispatch(getFormLayouts(selectedFrom.id))
    }, [])

    const menus = (data) => (
        <Menu onClick={(e) => {
            const { parentId, formId, id } = data
            const dataToSubmit = {
                layoutId: e.key,
                userId, formId, id
            }
            dispatch(printLayout(dataToSubmit))
        }
        }>
            {layouts.map(layout =>
                <Menu.Item key={layout.id}>
                    {layout.name}
                </Menu.Item>,
            )}
        </Menu>
    );

    const UserTitle = {
        label: 'User Name',
        title: 'User Name',
        dataIndex: 'user_name',
        key: 'user_name',
        width: 50,
        fixed: 'left',
        sorter: (a, b) => a.name - b.name,
    }

    const Actions = {
        label: 'Actions',
        title: 'Print',
        dataIndex: 'actions',
        key: 'actions',
        width: 25,
        fixed: 'right',
    }

    const DomainTitle = {
        label: 'Doamin',
        title: 'Domain',
        dataIndex: 'domain_name',
        key: 'domain_name',
        width: 30,
        sorter: (a, b) => a.domain - b.domain,
    }

    const tableColumns = [UserTitle, DomainTitle]
    const tableRows = []

    if (selectedFrom && selectedFrom.fields && selectedFrom.fields.length > 0) {
        selectedFrom.fields.map(field => {
            tableColumns.push({
                label: field.label,
                title: field.label,
                dataIndex: field.model,
                key: field.model,
                width: 100,
            })
        })
    }
    tableColumns.push(Actions)

    if (thisFormSubmissions && thisFormSubmissions.length > 0) {
        thisFormSubmissions.map(detail => {
            tableRows.push({
                user_name: (detail?.ExternalUser && detail?.ExternalUser.userName) || '',
                domain_name: (detail?.ExternalUser && detail?.ExternalUser.tenantName) || '',
                actions: <Dropdown overlay={menus(detail)} placement="bottomRight" trigger={['click']}>
                    <i className="gx-icon-btn icon icon-ellipse-v" />
                </Dropdown>,
                ...detail.data
            })
        })
    }

    return (
        <>
            <Card title={title} extra={
                <CSVLink data={tableRows} headers={tableColumns} filename={`${title}.csv`}>
                    <Button type="primary" shape="circle" icon={<DownloadOutlined />} size={'large'} />
                </CSVLink>
            }>
                <Table
                    columns={tableColumns}
                    dataSource={tableRows}
                    bordered
                    size="middle"
                    scroll={{ x: '130%', y: 240 }}
                />
            </Card>
        </>
    );
});

Detail.displayName = Detail;

Detail.propTypes = {
    selectedFrom: PropTypes.object,
};

export default Detail;

