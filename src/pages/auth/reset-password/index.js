import React, { memo, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import { Button, Form, Input } from "antd";
import SEO from "../../../components/seo";
import IntlMessages from "../../../utils/IntlMessages";
import getlanguage from "../../../components/hoc/withLang";
import { log } from "../../../utils/console-log";
import { validate } from "../../../constants/validations";
import { onResetPassword } from "../../../store/slices/auth";

const ForgotPassword = memo(() => {
  const dispatch = useDispatch();
  const router = useRouter();
  let { token } = router.query;
  const [Token, setToken] = useState(token);
  const [form] = Form.useForm();

  const onFinishFailed = (errorInfo) => {
    log(`Failed ${errorInfo}`);
  };

  const onFinish = (formData) => {
    const data = {
      token: Token,
      password: formData.confirm,
    };
    log(`Reset Page submit`, formData);
    dispatch(onResetPassword(data));
    form.resetFields();
    setTimeout(() => {
      router.back();
    }, 5000);
  };

  useEffect(() => {
    if (token) {
      setToken(token);
      console.log('asdf Token', Token)
    }
  }, [token]);

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
                  <IntlMessages id="app.userAuth.reset.text" />
                </p>
                <p>
                  <IntlMessages id="app.userAuth.getAccount" />
                </p>
              </div>
              <div className="gx-app-logo">
                <img alt="example" src={"/images/logo.png"} />
              </div>
            </div>
            {Token && (
              <>
                <div className="gx-app-login-content">
                  <h2>Reset Password</h2>
                  <p>
                    <IntlMessages id="appModule.enterPasswordReset" />
                  </p>
                  <Form
                    initialValues={{ remember: true }}
                    name="basic"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    className="gx-signin-form gx-form-row0"
                    form={form}
                  >
                    <Form.Item rules={validate.password} name="password">
                      <Input placeholder={"password"} />
                    </Form.Item>
                    <Form.Item
                      rules={validate.confirmPassword}
                      name={"confirm"}
                    >
                      <Input placeholder={"confirm password"} />
                    </Form.Item>

                    <Form.Item>
                      <Button
                        type="primary"
                        className="gx-mb-0"
                        htmlType="submit"
                      >
                        <IntlMessages id="app.userAuth.reset" />
                      </Button>
                    </Form.Item>
                  </Form>
                  {[1, 2, 3, 4].map((item) => (
                    <br key={item} />
                  ))}
                  or contact to
                  <Link href="/contact-us">
                    <a>
                      <IntlMessages id="app.userAuth.support" />
                    </a>
                  </Link>
                </div>
              </>
            )}
            {(!token) && (
              <>
                <div className="gx-app-login-content">
                  <h3 className="gx-text-center">Somethings went wrong</h3>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
});

ForgotPassword.displayName = ForgotPassword;

export default getlanguage(() => <ForgotPassword />);
