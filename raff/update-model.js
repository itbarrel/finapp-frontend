import React, { memo, useEffect, useRef, useState } from "react";
import { Button, Form, Input, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addUser, updateUser } from "../src/store/slices/resources/user";
import { isClient } from "../src/utils/is-client";
import Draggable from "react-draggable";
import LabelAndTooltip from "../src/components/forms/form-assets/label-and-tooltip";

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

const Model = memo(({ onShow, selectedUser }) => {
  const draggleRef = useRef(null);
  const dispatch = useDispatch();
  const { update_item } = useSelector(({ resources }) => resources.User);
  const loader = useSelector(({ resources }) => resources.Account.loading);
  const [visible, setVisible] = useState(onShow);
  const [loading, setLoading] = useState(loader);
  const [title, setTitle] = useState("Add User");
  const [disabled, setDisabled] = useState(true);
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });

  const onShowModal = () => {
    setVisible(true);
  };

  useEffect(() => {
    if (onShow) {
      onShowModal();
    }
    form.setFieldsValue(selectedUser);
  }, [onShow, selectedUser]);

  const onCloseModal = () => {
    setVisible(false);
    form.resetFields();
  };
  const [form] = Form.useForm();

  const onSubmit = async () => {
    setLoading(true);
    const formData = await form.validateFields();
    let data = {
      userName: formData.userName,
      email: formData.email,
      password: formData.password,
      firstName: formData.firstName,
      lastName: formData.lastName,
      RoleId: "5bb697e0-de02-49bc-bbd4-5d33bfa2746e",
    };
    if (onShow) {
      dispatch(updateUser(id, data));
    } else {
      dispatch(addUser(data));
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
      <Modal
        title={<ModalHeader />}
        visible={visible}
        onOk={onSubmit}
        onCancel={onCloseModal}
        footer={<ModalFooter />}
        width={800}
        modalRender={Drag()}
      >
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          // onFinish={onSubmit}
          scrollToFirstError
          onFieldsChange={(_, allFields) => {
            onChange(allFields);
          }}
        >
          <Form.Item
            name="firstName"
            label={
              <LabelAndTooltip
                title={"First Name"}
                tooltip={"Enter your First Name"}
              />
            }
            rules={[
              {
                required: true,
                message: "Please input your First Name!",
                whitespace: true,
              },
            ]}
            initialValue={selectedUser.firstName}
            // shouldUpdate={(prevValues, curValues) => prevValues.additional !== curValues.additional}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="lastName"
            label={
              <LabelAndTooltip
                title={"Last Name"}
                tooltip={"Enter your Last Name"}
              />
            }
            rules={[
              {
                required: true,
                message: "Please input your Last Name!",
                whitespace: true,
              },
            ]}
            // initialValue={selectedUser.lastName}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="userName"
            label={
              <LabelAndTooltip
                title={"User Name"}
                tooltip={"Enter your Last Name"}
              />
            }
            rules={[
              {
                required: true,
                message: "Please input your Last Name!",
                whitespace: true,
              },
            ]}
            // initialValue={selectedUser.userName}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="email"
            label={<LabelAndTooltip title={"E-mail"} />}
            initialValue={selectedUser.email}
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          {/* <Form.Item
                        name="password"
                        label={<LabelAndTooltip title={"Password"} />}
                        value={formData.email}
                        rules={[
                            {
                                required: true,
                                message: "Please input your password!",
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        label={<LabelAndTooltip title={"Confirm Password"} />}
                        dependencies={["password"]}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: "Please confirm your password!",
                            },
                            ({ getFieldValue }) => ({
                                validator(rule, value) {
                                    if (!value || getFieldValue("password") === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject("The two passwords that you entered do not match!");
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item> */}
        </Form>
      </Modal>
    </>
  );
});

Modal.displayName = Modal;

export default Model;
