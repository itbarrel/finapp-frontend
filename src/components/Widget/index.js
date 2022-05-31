import React from "react";
import { Card } from "antd";
import PropTypes from "prop-types";
import IntlMessages from "../../utils/IntlMessages";

const Widget = ({
  title,
  text,
  children,
  styleName,
  cover,
  extra,
  actions,
}) => {
  const Title = () => {
    return (
      <>
        <IntlMessages id={title} /> {text}
      </>
    );
  };
  return (
    <Card
      title={(title && <Title />) || text}
      actions={actions}
      cover={cover}
      className={` ${styleName}`}
      extra={extra}
    >
      {children}
    </Card>
  );
};

export default Widget;

Widget.defaultProps = {
  styleName: "",
};

Widget.propTypes = {
  title: PropTypes.node,
  extra: PropTypes.node,
  cover: PropTypes.node,
  actions: PropTypes.node,
  children: PropTypes.any,
};
