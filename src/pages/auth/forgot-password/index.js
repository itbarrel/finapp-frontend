import React, { memo } from "react";
import { useDispatch } from "react-redux";
import Link from "next/link";
import SEO from "../../../components/seo";
import { Button, Form, Input } from "antd";
import IntlMessages from "../../../utils/IntlMessages";
import getlanguage from "../../../components/hoc/withLang";
import { onForgetPassword } from "../../../store/slices/auth";
import { log } from "../../../utils/console-log";
import { validateForgetPassword } from "../../../constants/validations";

const ForgotPassword = memo(() => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const onFinish = (formData) => {
    log(" >>>>>>>", formData);
    const { domain, email } = formData;
    const data = {
      domain,
      email,
    };
    // dispatch(setLoader({ key: 'forget', value: true}))
    dispatch(onForgetPassword(data));
    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    log("Failed:", errorInfo);
  };

  return (
    <>
      <SEO title="Forgot Page" />
      <div className="gx-app-login-wrap">
        <div className="gx-app-login-container">
          <div className="gx-app-login-main-content">
            <div className="gx-app-logo-content">
              <div className="gx-app-logo-content-bg">
                <img src={"/images/appModule/neature.jpg"} alt="Neature" />
              </div>
              <div className="gx-app-logo-wid">
                <h1>
                  <IntlMessages id="app.userAuth.forgotPassword" />
                </h1>
                <p>
                  <IntlMessages id="app.userAuth.forgot" />
                </p>
                <p>
                  <IntlMessages id="app.userAuth.getAccount" />
                </p>
              </div>
              <div className="gx-app-logo">
                <img alt="example" src={"/images/logo.png"} />
              </div>
            </div>
            <div className="gx-app-login-content">
              <Form
                form={form}
                initialValues={{ remember: true }}
                name="forgetPasswordForm"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                className="gx-signin-form gx-form-row0"
              >
                <Form.Item rules={validateForgetPassword.domain} name="domain">
                  <Input placeholder="Domain" />
                </Form.Item>

                <Form.Item rules={validateForgetPassword.email} name="email">
                  <Input placeholder="Email" />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" className="gx-mb-0" htmlType="submit">
                    <IntlMessages id="app.userAuth.send" />
                  </Button>
                  <span>
                    <IntlMessages id="app.userAuth.or" />
                  </span>{" "}
                  <Link href="/auth/login">
                    <a>
                      <IntlMessages id="app.userAuth.signIn" />
                    </a>
                  </Link>
                </Form.Item>
              </Form>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                <br key={item} />
              ))}
              or contact to
              <Link href="/contact-us">
                <a>
                  {" "}
                  <IntlMessages id="app.userAuth.support" />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

ForgotPassword.displayName = ForgotPassword;

export default getlanguage(() => <ForgotPassword />);
