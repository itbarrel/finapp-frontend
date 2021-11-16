import React, { memo, useState } from "react";
import { Form, Input, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import Widget from "../../Widget";
import LabelAndTooltip from "../../forms/form-assets/label-and-tooltip";
import IntlMessages from "../../../utils/IntlMessages";
import { updatePassword } from "../../../store/slices/auth";
import { CHANGE_PASSWORD } from "../../../constants/loaderKeys";
import Loader from "../../CircularProgress";
import { validate } from "../../../constants/validations";

const ChangePassword = memo(() => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const loading = useSelector(
    ({ loader }) => loader.loading?.[CHANGE_PASSWORD]
  );
  const [buttonState] = useState(false);

  const onSubmit = (get) => {
    let data = {
      oldPassword: get.oldPassword,
      newPassword: get.confirm,
    };
    dispatch(updatePassword(data));
    form.resetFields();
  };

  return (
    <>
      <Widget title="Password">
        <Loader loading={!!loading}>
          <Form
            form={form}
            name="register"
            onFinish={onSubmit}
            scrollToFirstError
            layout={"vertical"}
          >
            <Form.Item
              name="oldPassword"
              label={<LabelAndTooltip title={"Old.Password"} />}
              rules={validate?.oldPassword}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="password"
              label={<LabelAndTooltip title={"Password"} />}
              rules={validate?.password}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="confirm"
              label={<LabelAndTooltip title={"Confirm.Password"} />}
              rules={validate?.confirmPassword}
            >
              <Input />
            </Form.Item>

            <Button
              type="primary"
              className="gx-mb-0"
              htmlType="submit"
              loading={loading}
              disabled={buttonState}
            >
              <IntlMessages id="Change.Password" />
            </Button>
          </Form>
        </Loader>
      </Widget>
    </>
  );
});

ChangePassword.displayName = ChangePassword;

export default ChangePassword;
