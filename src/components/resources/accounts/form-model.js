import React, { memo, useEffect, useRef, useState } from "react";
import { Button, Form, Input, Select, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addAccount } from "../../../store/slices/resources/account";
import { isClient } from "../../../utils/is-client";
import Draggable from "react-draggable";
import LabelAndTooltip from "../../forms/form-assets/label-and-tooltip";
import { validate } from "../../../constants/validations";
import { getKey } from "../../../utils/keyGenerator";
import { getAccountsType } from "../../../store/slices/resources/account";
import { ADD_ACCOUNT } from "../../../constants/loaderKeys";

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

const Model = memo(() => {
  const draggleRef = useRef(null);
  const dispatch = useDispatch();
  const loading = useSelector(({ loader }) => loader.loading?.[ADD_ACCOUNT]);
  const AccountTypes = useSelector(({ resources }) => resources.Account.types);
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState("Edit Account");
  const [disabled, setDisabled] = useState(true);
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });

  const onShowModal = () => {
    setVisible(true);
    dispatch(getAccountsType());
  };
  const onCloseModal = () => {
    setVisible(false);
  };
  const [form] = Form.useForm();

  const onSubmit = async () => {
    const formData = await form.validateFields();
    let data = {
      name: formData.accountName,
      accountTypeId: formData.formTypeId,
      admin: {
        userName: formData.username1,
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
      },
    };
    dispatch(addAccount(data));
    form.resetFields();
    onCloseModal();
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
          onFocus={() => { }}
          onBlur={() => { }}
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
        <Button key="submit" type="primary" loading={loading} onClick={onSubmit}>
          Add Account
        </Button>
      </>
    );
  };

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
      <Button type="primary" onClick={onShowModal}>
        Create Account
      </Button>
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
        <Form {...formItemLayout} form={form} name="register" scrollToFirstError>
          <Form.Item
            name="accountName"
            label={<LabelAndTooltip title={"Account.Name"} tooltip={"Enter your company name"} />}
            rules={validate.name("Account name ")}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="firstName"
            label={<LabelAndTooltip title={"First.Name"} tooltip={"Enter your First Name"} />}
            rules={validate.firstName}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="lastName"
            label={<LabelAndTooltip title={"Last.Name"} tooltip={"Enter your Last Name"} />}
            rules={validate.lastName}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="username1"
            label={<LabelAndTooltip title={"User.Name"} tooltip={"Enter your Last Name"} />}
            rules={validate.username}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={"Account Type"}
            hasFeedback
            name="formTypeId"
            rules={validate.errorMessage("Please select account type")}
          >
            <Select allowClear showSearch={true}>
              {AccountTypes &&
                AccountTypes?.map((form) => {
                  return (
                    <Option key={getKey()} value={form.id}>
                      {form.name}
                    </Option>
                  );
                })}
            </Select>
          </Form.Item>

          <Form.Item
            name="email"
            label={<LabelAndTooltip title={"Email"} />}
            rules={validate.email}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label={<LabelAndTooltip title={"Password"} />}
            rules={validate.password}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label={<LabelAndTooltip title={"Confirm.Password"} />}
            dependencies={["password"]}
            hasFeedback
            rules={validate.confirmPassword}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="phone"
            label={<LabelAndTooltip title={"Phone"} />}
            rules={validate.phone}
          >
            <Input style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
});

Modal.displayName = Modal;
export default Model;
