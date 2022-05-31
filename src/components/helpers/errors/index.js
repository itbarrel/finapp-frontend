import React, { memo } from "react";
import { Empty } from "antd";

const Message = memo(({ message }) => {
  return (
    <>
      <div className="gx-mt-5">
        <Empty description={message}></Empty>
      </div>
    </>
  );
});

Message.displayName = Message;
export default Message;
