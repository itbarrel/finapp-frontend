import React from "react";
import { Spin } from "antd";
import LoadingOutlined from "@ant-design/icons/lib/icons/LoadingOutlined";

const CircularProgress = ({ loading, children }) => {
  const antIcon = <LoadingOutlined style={{ fontSize: 34 }} />;

  return (
    <>
      <Spin spinning={loading} indicator={antIcon}>
        {children}
      </Spin>
    </>
  );
};

export default CircularProgress;
