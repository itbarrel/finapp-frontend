import React, { memo } from "react";
import { useSelector } from "react-redux";
import Widget from "../../../components/Widget";
import IntlMessages from "../../../utils/IntlMessages";

export const Item = ({ id, title, description, icon }) => {
  return (
    <>
      <div
        key={id}
        className="gx-media gx-align-items-center gx-flex-nowrap gx-pro-contact-list"
      >
        <div className="gx-mr-3">
          <i className={`icon icon-${icon} gx-fs-xxl gx-text-grey`} />
        </div>
        <div className="gx-media-body">
          <span className="gx-mb-0 gx-text-grey gx-fs-sm">
            <IntlMessages id={title} />
          </span>
          <p className="gx-mb-0">
            <span className="gx-link" key={1}>
              {description}
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

const Contact = memo(() => {
  const user = useSelector(({ auth }) => auth.user);

  return (
    <>
      <Widget title="Profile" text={"info"} styleName="gx-card-profile-sm">
        {user?.email && (
          <Item
            id={"email"}
            title={"Email"}
            description={user?.email}
            icon={"email"}
          />
        )}
        {user?.mobilePhone && (
          <Item
            id={"Phone"}
            title={"Phone"}
            description={user?.mobilePhone}
            icon={"phone"}
          />
        )}
        <Item
          id={"status"}
          title={"Status"}
          description={user?.active ? "active" : "non-active"}
          icon={"check-cricle"}
        />
        <Item
          id={"Webpage"}
          title={"Account.Name"}
          description={"www.CrisisHub.co"}
          icon={"link"}
        />
      </Widget>
    </>
  );
});

Contact.displayName = Contact;

export default Contact;
