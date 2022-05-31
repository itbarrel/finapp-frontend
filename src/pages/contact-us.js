import React, { memo } from "react";
import Link from "../components/helpers/link/index";
import { Button } from "antd";

const ContactUs = memo(() => {
  return (
    <>
      <center>
        <br />
        <h1>Contact us Page or support page</h1>
        <br />
        <br />
        <Link url={"/auth/login"} passHref={true}>
          <Button type="primary"> Back </Button>
        </Link>
      </center>
    </>
  );
});

ContactUs.displayName = ContactUs;

export default ContactUs;
