import React, { memo } from "react";
import Link from "next/link";
import IntlMessages from "../utils/IntlMessages";
import getlanguage from "../components/hoc/withLang";

const Error404 = memo(() => (
  <div className="gx-page-error-container">
    <div className="gx-page-error-content">
      <div className="gx-error-code gx-mb-4">404</div>
      <h2 className="gx-text-center">
        <IntlMessages id="extraPages.404Msg" />
      </h2>
      <p className="gx-text-center">
        <Link className="gx-btn gx-btn-primary" href="/">
          <a>
            <IntlMessages id="extraPages.goHome" />
          </a>
        </Link>
      </p>
    </div>
  </div>
));

Error404.displayName = Error404;

export default getlanguage(() => <Error404 />);
