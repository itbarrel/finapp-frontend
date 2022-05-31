import React, { memo, useState } from "react";
import PropTypes from "prop-types";
import { EditOutlined } from "@ant-design/icons";
import UpdateIncident from "../form-model";

const UpdateButton = memo(({ incident }) => {
  const [visible, setVisible] = useState(false);

  const handleUpdate = () => {
    setVisible(true);
  };
  return (
    <>
      <UpdateIncident
        visible={visible}
        setVisible={setVisible}
        selected={incident}
        title={"Update Incident"}
        off
      />
      <div onClick={handleUpdate}>
        <EditOutlined />
      </div>
    </>
  );
});

UpdateButton.displayName = UpdateButton;
UpdateButton.propTypes = {
  incident: PropTypes.object.isRequired,
};

export default UpdateButton;
