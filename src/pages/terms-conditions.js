import React, { memo } from "react";
import Link from "../components/helpers/link/index";
import { Button } from "antd";

const TermsConditions = memo(() => {
  return (
    <>
      <center>
        <br />
        <h1>Terms & Conditions Page </h1>
        <br />
        <br />
        <Link url={"/auth/login"} passHref={true}>
          <Button type="primary"> Back </Button>
        </Link>
      </center>
    </>
  );
});

TermsConditions.displayName = TermsConditions;

export default TermsConditions;
