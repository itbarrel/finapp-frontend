import React, { memo, useEffect, useRef, useState } from "react";
import { Button, Form, Input, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addRole, updateRole } from "../../../store/slices/resources/role";
import { isClient } from "../../../utils/is-client";
import Draggable from "react-draggable";
import LabelAndTooltip from "../../forms/form-assets/label-and-tooltip";
import PermissionTable from "./permissions";
import PropTypes from "prop-types";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const ModalWindow = memo(({ title, visible, setVisible }) => {
  const draggleRef = useRef(null);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const {
    loading: loader,
    entities,
    operations,
    record,
  } = useSelector(({ resources }) => resources.Role);

  const [loading, setLoading] = useState(loader);
  const [disabled, setDisabled] = useState(true);

  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });

  const [permissions, setPermissions] = useState({});

  const processPermissions = (permissionsSet = {}) => {
    let permissionObj = {};

    entities.forEach((entity) => {
      permissionObj[entity] ||= {};
      operations.forEach((operation) => {
        permissionObj[entity] ||= false;
        if (
          permissionsSet[entity] &&
          permissionsSet[entity].includes(operation)
        ) {
          permissionObj[entity][operation] = true;
        } else {
          permissionObj[entity][operation] = false;
        }
      });
    });

    return permissionObj;
  };

  const onCloseModal = () => {
    setVisible(false);
    form.resetFields();
  };

  const onSubmit = async () => {
    setLoading(true);
    const formData = await form.validateFields();

    let permissionObj = {};

    Object.keys(permissions).forEach((entity) => {
      permissionObj[entity] ||= [];
      Object.keys(permissions[entity]).forEach((operation) => {
        if (permissions[entity][operation]) {
          permissionObj[entity].push(operation);
        }
      });
    });

    let data = {
      name: formData.name,
      permissions: permissionObj,
    };

    if (record.id) {
      dispatch(updateRole(record.id, data));
    } else {
      dispatch(addRole(data));
    }
    form.resetFields();
  };

  const ModalHeader = () => {
    return (
      <>
        <div
          style={{
            width: "100%",
            cursor: "move",
          }}
          onMouseOver={() => {
            if (disabled) {
              setDisabled(false);
            }
          }}
          onMouseOut={() => {
            setDisabled(true);
          }}
        >
          {title}
        </div>
      </>
    );
  };

  const ModalFooter = () => {
    return (
      <>
        <Button key="back" onClick={onCloseModal}>
          Return
        </Button>
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={onSubmit}
        >
          Submit
        </Button>
      </>
    );
  };

  useEffect(() => {
    if (loading) {
      setVisible(false);
      setLoading(false);
    }
  }, [loading]);

  useEffect(() => {
    const permissionSet = processPermissions(record.permissions || {});
    setPermissions(permissionSet);
    form.setFieldsValue(record);
  }, [record]);

  const drag = () => (model) => {
    if (isClient) {
      const { clientWidth, clientHeight } = window?.document?.documentElement;
      const targetRect = draggleRef?.current?.getBoundingClientRect();

      const onStart = (event, uiData) => {
        setBounds({
          left: -targetRect?.left + uiData?.x,
          right: clientWidth - (targetRect?.right - uiData?.x),
          top: -targetRect?.top + uiData?.y,
          bottom: clientHeight - (targetRect?.bottom - uiData?.y),
        });
      };
      return (
        <>
          <Draggable
            disabled={disabled}
            bounds={bounds}
            onStart={(event, uiData) => onStart(event, uiData)}
          >
            <div ref={draggleRef}>{model}</div>
          </Draggable>
        </>
      );
    }
  };

  return (
    <>
      <Modal
        title={<ModalHeader />}
        visible={visible}
        onOk={onSubmit}
        onCancel={onCloseModal}
        footer={<ModalFooter />}
        width={1000}
        modalRender={drag()}
        forceRender
      >
        <Form
          {...formItemLayout}
          form={form}
          name="manageRole"
          scrollToFirstError
        >
          <Form.Item
            name="name"
            label={
              <LabelAndTooltip title={"Name"} tooltip={"Enter Role Name"} />
            }
            rules={[
              {
                required: true,
                message: "Please input Role Name!",
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <PermissionTable
            permissions={permissions}
            setPermissions={setPermissions}
          />
        </Form>
      </Modal>
    </>
  );
});

ModalWindow.displayName = ModalWindow;

ModalWindow.propTypes = {
  title: PropTypes.string.isRequired,
  visible: PropTypes.bool,
  setVisible: PropTypes.func,
};

export default ModalWindow;
