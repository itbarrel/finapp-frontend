import React, { memo, useState } from "react";
import { useDispatch } from "react-redux";

import withLayout from "../../../layouts/app-layout";
import { Row, Col, Button } from "antd";
import RolesList from "../../../components/resources/roles/table";
import EditRoleModal from "../../../components/resources/roles/modal";
import SEO from "../../../components/seo";
import Widget from "../../../components/Widget";
import { PlusCircleOutlined } from "@ant-design/icons";
import { setRecord } from "../../../store/slices/resources/role";

const User = memo(() => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("Create Role");
  const [visible, setVisible] = useState(false);

  const onShowModal = () => {
    setTitle("Create Role");
    dispatch(setRecord({}));
    setVisible(true);
  };

  return (
    <>
      <SEO title={"Roles"} />
      <EditRoleModal title={title} visible={visible} setVisible={setVisible} />
      <Widget title="Roles">
        <Row justify="end">
          <Col span={4}>
            <Button
              type="primary"
              onClick={onShowModal}
              icon={<PlusCircleOutlined />}
            >
              Create New Role
            </Button>
          </Col>
        </Row>
        <RolesList setVisible={setVisible} setTitle={setTitle} />
      </Widget>
    </>
  );
});

User.displayName = User;
export default withLayout(User);
