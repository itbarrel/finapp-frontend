import React, { memo, useEffect, useRef, useState } from "react";
import { Button, Form, Input, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  addDepartment,
  updateDepartment,
} from "../../../store/slices/resources/departments";
import { isClient } from "../../../utils/is-client";
import Draggable from "react-draggable";
import LabelAndTooltip from "../../forms/form-assets/label-and-tooltip";
import { PlusCircleOutlined } from "@ant-design/icons";

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

const DepartmentModel = memo(
  ({ visible, setVisible, selected, title, off }) => {
    const draggleRef = useRef(null);
    const dispatch = useDispatch();
    const loader = useSelector(
      ({ resources }) => resources.Departments.loading
    );
    const [loading, setLoading] = useState(loader);
    const [modelTitle, setModelTitle] = useState(title);
    const [disabled, setDisabled] = useState(true);
    const [bounds, setBounds] = useState({
      left: 0,
      top: 0,
      bottom: 0,
      right: 0,
    });
    const [form] = Form.useForm();

    const onShowModal = () => {
      setVisible(true);
    };
    const onCloseModal = () => {
      setVisible(false);
      form.resetFields();
    };
    const onSubmit = async () => {
      const formData = await form.validateFields();
      setLoading(true);
      let data = {
        name: formData.name,
      };
      if (visible && selected) {
        dispatch(updateDepartment(selected.id, data));
      } else {
        dispatch(addDepartment(data));
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
            // fix eslintjsx-a11y/mouse-events-have-key-events
            // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/mouse-events-have-key-events.md
            onFocus={() => {}}
            onBlur={() => {}}
            // end
          >
            {modelTitle}
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
      if (visible) {
        onShowModal();
      }
      form.setFieldsValue(selected);
    }, [visible, selected]);

    useEffect(() => {
      if (loading) {
        setVisible(false);
        setLoading(false);
      }
    }, [loading]);

    const Drag = () => (model) => {
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
        {off ? (
          ""
        ) : (
          <Button
            type="primary"
            onClick={onShowModal}
            icon={<PlusCircleOutlined />}
          >
            {title}
          </Button>
        )}
        <Modal
          title={<ModalHeader />}
          visible={visible}
          onOk={onSubmit}
          onCancel={onCloseModal}
          footer={<ModalFooter />}
          width={800}
          modalRender={Drag()}
          forceRender
        >
          <Form
            {...formItemLayout}
            form={form}
            name="register"
            scrollToFirstError
          >
            <Form.Item
              name="name"
              label={
                <LabelAndTooltip
                  title={"Department.Name"}
                  tooltip={"Enter your department name you want to create "}
                />
              }
              rules={[
                {
                  required: true,
                  message: "Please input your First Name!",
                  whitespace: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  }
);

DepartmentModel.displayName = DepartmentModel;

export default DepartmentModel;
