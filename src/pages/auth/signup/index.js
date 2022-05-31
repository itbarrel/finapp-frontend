import { memo } from "react";
import { useDispatch } from "react-redux";
import SEO from "../../../components/seo";
import { Button, Form, Input } from "antd";
import Link from "next/link";

import FacebookOutlined from "@ant-design/icons/lib/icons/FacebookOutlined";
import GoogleOutlined from "@ant-design/icons/lib/icons/GoogleOutlined";

import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";
import LockOutlined from "@ant-design/icons/lib/icons/LockOutlined";

import IntlMessages from "../../../utils/IntlMessages";
import getlanguage from "../../../components/hoc/withLang";
import { onSignUp } from "../../../store/slices/auth";
import { log } from "../../../utils/console-log";

const FormItem = Form.Item;

const Login = memo(() => {
  const dispatch = useDispatch();

  const onFinishFailed = (errorInfo) => {
    log("Failed:", errorInfo);
  };

  const onFinish = (data) => {
    log("Login Page form data submit ", data);
    dispatch(onSignUp(data));
  };

  return (
    <>
      <SEO title="Sign Up" />

      <div className="gx-app-login-wrap">
        <div className="gx-app-login-container">
          <div className="gx-app-login-main-content">
            <div className="gx-app-logo-content">
              <div className="gx-app-logo-content-bg">
                <img src={"/images/appModule/neature.jpg"} alt="Neature" />
              </div>
              <div className="gx-app-logo-wid">
                <h1>
                  <IntlMessages id="app.userAuth.signIn" />
                </h1>
                <p>
                  <IntlMessages id="app.userAuth.bySigning" />
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
                initialValues={{ remember: true }}
                name="basic"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                className="gx-signin-form gx-form-row0"
              >
                <FormItem rules={[{ required: true, message: 'Please input your username!\'}' }]} name="userName">
                  <Input prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Username" />
                </FormItem>
                <FormItem rules={[{ required: true, message: 'Please input your E-mail!' }]} name="email">

                  <Input prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Email" />
                </FormItem>

                <FormItem rules={[{ required: true, message: 'Please input your Name!' }]} name="firstName">

                  <Input prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Name" />
                </FormItem>

                <FormItem rules={[{ required: true, message: 'Please input your Phone!' }]} name="phone">

                  <Input prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Phone Number" type="number" />
                </FormItem>
                <FormItem rules={[{ required: true, message: 'Please input your Password!' }]} name="password">

                  <Input prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="Password" />
                </FormItem>

                <FormItem className="gx-text-center">
                  <Button type="primary" htmlType="submit">
                    Sign Up
                  </Button>
                </FormItem>
                <span>
                  <IntlMessages id="app.userAuth.or" />
                </span>
                <Link href={"/auth/login"}>
                  <a>
                    <IntlMessages id="app.userAuth.signIn" />
                  </a>
                </Link>
                <div className="gx-flex-row gx-justify-content-between">
                  <span> or connect with</span>
                  <ul className="gx-social-link">
                    <li>
                      <GoogleOutlined />
                    </li>
                    <li>
                      <FacebookOutlined />
                    </li>
                  </ul>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

Login.displayName = Login;
export default getlanguage(() => <Login />);
