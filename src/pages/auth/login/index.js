import { memo } from "react";
import { useDispatch } from "react-redux";
import SEO from "../../../components/seo";
import Link from "next/link";
import { Button, Checkbox, Form, Input } from "antd";
import FacebookOutlined from "@ant-design/icons/lib/icons/FacebookOutlined";
import GoogleOutlined from "@ant-design/icons/lib/icons/GoogleOutlined";
import IntlMessages from "../../../utils/IntlMessages";
import getlanguage from "../../../components/hoc/withLang";
import { onLogin, confirmLogin } from "../../../store/slices/auth";
import { log } from "../../../utils/console-log";

import { CookieService } from "../../../services/storage.service";

const Login = memo(() => {
  const dispatch = useDispatch();
  const token = CookieService.getToken();

  if (token) {
    dispatch(confirmLogin());
  }

  const onFinishFailed = (errorInfo) => {
    log("Failed:", errorInfo);
  };

  const onFinish = (data) => {
    log("Login Page form data submit ", data);
    const { domain, ...credentials } = data;
    const postData = { domain, credentials };
    dispatch(onLogin(postData));
  };

  const validate = {
    email: [
      { type: "email", message: "The input is not valid E-mail!" },
      { required: true, message: "Please input your E-mail!" },
    ],
    password: [{ required: true, message: "Please input your Password!" }],
  };

  return (
    <>
      <SEO title="Sign in" />
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
                name="login"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                className="gx-signin-form gx-form-row0"
              >
                <Form.Item name="domain">
                  <Input type="text" placeholder="Domain" />
                </Form.Item>
                <Form.Item rules={validate.email} name="email">
                  <Input placeholder="demo@Email.com" />
                </Form.Item>
                <Form.Item rules={validate.password} name="password">
                  <Input type="password" placeholder="Password" />
                </Form.Item>
                <Form.Item>
                  <Checkbox>
                    <IntlMessages id="appModule.iAccept" />
                  </Checkbox>
                  <Link href={"/terms-conditions"} passHref={true}>
                    <span className="gx-signup-form-forgot gx-link">
                      <IntlMessages id="appModule.termAndCondition" />
                    </span>
                  </Link>
                </Form.Item>
                <Form.Item>
                  <Button type="primary" className="gx-mb-0" htmlType="submit">
                    <IntlMessages id="app.userAuth.signIn" />
                  </Button>
                  <span>
                    <IntlMessages id="app.userAuth.or" />
                  </span>
                  <Link href={"/auth/forgot-password"}>
                    <a>
                      <IntlMessages id="app.userAuth.forgotPassword" />
                    </a>
                  </Link>
                </Form.Item>
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
                <br />
                <br />
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
