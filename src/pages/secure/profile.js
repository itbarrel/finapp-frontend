import React, { memo } from "react";
import { Col, Row } from "antd";
import withLayout from "../../layouts/app-layout";
import SEO from "../../components/seo/";
import ProfileHeader from "../../components/resources/profile/profileHeader";
import EditProfile from "../../components/resources/profile/edit-profile.js";
import Contact from "../../components/resources/profile/contact.js";
import ChangePassword from "../../components/resources/profile/change-password";

const User = memo(() => {
  return (
    <>
      <ProfileHeader />
      <SEO title={"Profile"} />
      <div className="gx-profile-content">
        <Row>
          <Col xl={16} lg={14} md={14} sm={24} xs={24}>
            <EditProfile />
          </Col>

          <Col xl={8} lg={10} md={10} sm={24} xs={24}>
            <Contact />
            <ChangePassword />
          </Col>
        </Row>
      </div>
    </>
  );
});

User.displayName = User;
export default withLayout(User);
