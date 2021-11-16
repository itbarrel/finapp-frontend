import React, { memo } from "react";
import { Tooltip } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import IntlMessages from "../../../utils/IntlMessages";

const labelAndTooltip = memo(({ title, tooltip }) => {
  return (
    <>
      <span>
        {title && <IntlMessages id={title} />}&nbsp;
        {tooltip && (
          <>
            <Tooltip title={tooltip}>
              <QuestionCircleOutlined />
            </Tooltip>
          </>
        )}
      </span>
    </>
  );
});

labelAndTooltip.displayName = labelAndTooltip;

export default labelAndTooltip;
