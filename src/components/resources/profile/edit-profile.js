import React, { memo, useEffect } from "react";
import { Form, Input, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import Widget from "../../Widget";
import LabelAndTooltip from "../../forms/form-assets/label-and-tooltip";
import IntlMessages from "../../../utils/IntlMessages";
import { updateProfile } from "../../../store/slices/auth";
import { validate } from "../../../constants/validations";
import { UPDATE_PROFILE } from "../../../constants/loaderKeys";
import Loader from "../../CircularProgress";

const EditProfile = memo(() => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { user } = useSelector(({ auth }) => auth);
  const loading = useSelector(({ loader }) => loader.loading?.[UPDATE_PROFILE]);

  const onSubmit = (userObj) => {
    let data = {
      userName: userObj.userName,
      email: userObj.email,
      firstName: userObj.firstName,
      lastName: userObj.lastName,
      mobilePhone: userObj.mobilePhone,
      country: userObj.country,
    };
    dispatch(updateProfile(user.id, data));
  };

  useEffect(() => {
    form.setFieldsValue(user);
  }, [user]);

  return (
    <>
      <Widget title="Profile">
        <Loader loading={!!loading}>
          <Form
            form={form}
            name="profileForm"
            onFinish={onSubmit}
            scrollToFirstError
            layout={"vertical"}
          >
            <Form.Item
              name="firstName"
              label={<LabelAndTooltip title={"First.Name"} />}
              rules={validate?.firstName}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="lastName"
              label={<LabelAndTooltip title={"Last.Name"} />}
              rules={validate?.lastName}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="userName"
              label={<LabelAndTooltip title={"User.Name"} />}
              rules={validate?.username}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="email"
              label={<LabelAndTooltip title={"Email"} />}
              rules={validate.email}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="country"
              label={<LabelAndTooltip title={"Country"} />}
              rules={validate?.country}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="mobilePhone"
              label={<LabelAndTooltip title={"Mobile.Phone"} />}
              rules={validate?.phone}
            >
              <Input />
            </Form.Item>

            <Button
              type="primary"
              className="gx-mb-0"
              htmlType="submit"
              loading={loading}
            >
              <IntlMessages id="Update" />
            </Button>
          </Form>
        </Loader>
      </Widget>
    </>
  );
});

EditProfile.displayName = EditProfile;

export default EditProfile;
