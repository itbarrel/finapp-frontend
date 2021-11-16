/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useEffect, useRef, useState } from "react";
import { Button, Form, Input, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addTask, updateTask } from "../../../store/slices/resources/tasks";
import { isClient } from "../../../utils/is-client";
import Draggable from "react-draggable";
import LabelAndTooltip from "../../forms/form-assets/label-and-tooltip";
import { PlusCircleOutlined } from "@ant-design/icons";
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

const DepartmentModel = memo(
  ({ visible, setVisible, selected, title, off }) => {
    const draggleRef = useRef(null);
    const dispatch = useDispatch();
    const loader = useSelector(({ resources }) => resources.Task.loading);
    const [loading, setLoading] = useState(loader);
    const [modelTitle] = useState(title);
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
      const { title, author, type, links, description } =
        await form.validateFields();
      setLoading(true);
      let data = {
        title,
        author,
        type,
        links,
        description,
      };
      if (visible && selected) {
        dispatch(updateTask(selected.id, data));
      } else {
        dispatch(addTask(data));
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
            onFocus={(e) => e}
            onBlur={(e) => e}
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
          modalRender={drag()}
          forceRender
        >
          <Form
            {...formItemLayout}
            form={form}
            name="register"
            // onFinish={onSubmit}
            scrollToFirstError
          >
            <Form.Item
              name="title"
              label={
                <LabelAndTooltip
                  title={"Task.Name"}
                  tooltip={"Enter your Author name you want to create "}
                />
              }
              rules={[
                {
                  required: true,
                  message: "Please input incident name",
                  whitespace: true,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="author"
              label={
                <LabelAndTooltip
                  title={"Author.Name"}
                  tooltip={"Enter your Author name you want to create "}
                />
              }
              rules={[
                {
                  required: true,
                  message: "Please author name",
                  whitespace: true,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="type"
              label={<LabelAndTooltip title={"Type"} />}
              rules={[
                {
                  required: true,
                  message: "Please input incident type",
                  whitespace: true,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="links"
              label={<LabelAndTooltip title={"Links"} />}
              rules={[
                {
                  required: true,
                  message: "Please enter Link",
                  whitespace: true,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="description"
              label={<LabelAndTooltip title={"Task.Description"} />}
              rules={[
                {
                  required: true,
                  message: "Please enter task description",
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

DepartmentModel.propTypes = {
  title: PropTypes.string,
  visible: PropTypes.any,
  setVisible: PropTypes.any,
  selectedUser: PropTypes.any,
  off: PropTypes.bool,
  selected: PropTypes.any,
};

export default DepartmentModel;
