import React, { memo, useState } from "react";
import { useDispatch } from "react-redux";

import withLayout from "../../../../layouts/app-layout";
import { Row, Col, Button } from "antd";
import LayoutTable from "../../../../components/resources/layouts/table";
import AddLayout from "../../../../components/resources/layouts/modal";
import SEO from "../../../../components/seo";
import Widget from "../../../../components/Widget";
import { PlusCircleOutlined } from "@ant-design/icons";
import { setRecord } from "../../../../store/slices/resources/role";

const Layout = memo(() => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("Create layout");
    const [visible, setVisible] = useState(false);

    const onShowModal = () => {
        setTitle("Create Layout");
        dispatch(setRecord({}));
        setVisible(true);
    };

    return (
        <>
            <SEO title={"Layouts"} />
            <Widget title="layouts">
                <Row justify="end">
                    <Col span={4}>
                        <AddLayout title={title} visible={visible} setVisible={setVisible} />
                    </Col>
                </Row>
                <LayoutTable setVisible={setVisible} setTitle={setTitle} />
            </Widget>
        </>
    );
});

Layout.displayName = Layout;
export default withLayout(Layout);
