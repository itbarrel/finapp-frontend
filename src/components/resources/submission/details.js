import { memo } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import Widget from "../../../components/Widget";

import { Card, Table, Button, Row, Col } from "antd";
import { DownloadOutlined } from '@ant-design/icons';

import { CSVLink } from "react-csv";

const Detail = memo(({ selectedFrom }) => {
    const formSubmissions = useSelector(({ resources }) => resources?.FormSubmission?.list);
    const thisFormSubmissions = formSubmissions.filter((fs) => { return fs.formId === selectedFrom.id })
    const title = `${selectedFrom.name} Form Submission`

    const UserTitle = {
        label: 'User Name',
        title: 'User Name',
        dataIndex: 'user_name',
        key: 'user_name',
        width: 50,
        fixed: 'left',
        sorter: (a, b) => a.name - b.name,
    }

    const DomainTitle = {
        label: 'Doamin',
        title: 'Domain',
        dataIndex: 'domain_name',
        key: 'domain_name',
        width: 30,
        fixed: 'left',
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

    if (thisFormSubmissions && thisFormSubmissions.length > 0) {
        thisFormSubmissions.map(detail => {
            tableRows.push({
                user_name: detail.ExternalUser.userName,
                domain_name: detail.ExternalUser.tenantName,
                ...detail.data
            })
        })
    }

    // const columns = [{
    //     title: 'Name',
    //     dataIndex: 'name',
    //     key: 'name',
    //     width: 100,
    //     fixed: 'left',
    //     filters: [{
    //         text: 'Joe',
    //         value: 'Joe',
    //     }, {
    //         text: 'John',
    //         value: 'John',
    //     }],
    //     onFilter: (value, record) => record.name.indexOf(value) === 0,
    // }, {
    //     title: 'Other',

    //     children: [{
    //         title: 'Age',
    //         dataIndex: 'age',
    //         key: 'age',
    //         width: 200,
    //         sorter: (a, b) => a.age - b.age,
    //     }, {
    //         title: 'Address',
    //         children: [{
    //             title: 'Street',
    //             dataIndex: 'street',
    //             key: 'street',
    //             width: 200,
    //         }, {
    //             title: 'Block',
    //             children: [{
    //                 title: 'Building',
    //                 dataIndex: 'building',
    //                 key: 'building',
    //                 width: 100,
    //             }, {
    //                 title: 'Door No.',
    //                 dataIndex: 'number',
    //                 key: 'number',
    //                 width: 100,
    //             }],
    //         }],
    //     }],
    // }, {
    //     title: 'Company',
    //     children: [{
    //         title: 'Company Address',
    //         dataIndex: 'companyAddress',
    //         key: 'companyAddress',
    //     }, {
    //         title: 'Company Name',
    //         dataIndex: 'companyName',
    //         key: 'companyName',
    //     }],
    // }, {
    //     title: 'Gender',
    //     dataIndex: 'gender',
    //     key: 'gender',
    //     width: 60,
    //     fixed: 'right',
    // }];

    // const data = [];
    // for (let i = 0; i < 100; i++) {
    //     data.push({
    //         key: i,
    //         name: 'John Brown',
    //         age: i + 1,
    //         street: 'Lake Park',
    //         building: 'C',
    //         number: 2035,
    //         companyAddress: 'Lake Street 42',
    //         companyName: 'SoftLake Co',
    //         gender: 'M',
    //     });
    // }

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

