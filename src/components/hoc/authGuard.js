import React, { memo, useEffect } from "react";
import Router from "next/router";
import nextCookie from "next-cookies";

import { getDisplayName } from "../../utils";

const serverRedirect = ({ res, location }) => {
  res.writeHead(302, { location: location || "/" });
  res.end();
};

const clientRedirect = ({ location }) => {
  Router.push(location || "/");
};

const auth = (ctx) => {
  const { token } = nextCookie(ctx);
  if (ctx.req && !token) {
    serverRedirect(ctx);
    return;
  }

  if (!token) {
    clientRedirect();
  }

  return token;
};

export const withAuthSync = (Page) => {
  const HOC = memo((props) => {
    const syncLogout = (event) => {
      if (event.key === "logout") {
        Router.push("/");
      }
    };

    useEffect(() => {
      window.addEventListener("storage", syncLogout);
      return () => {
        window.removeEventListener("storage", syncLogout);
        window.localStorage.removeItem("logout");
      };
    }, []);

    return <Page {...props} />;
  });

  HOC.displayName = `withLayout(${getDisplayName(Page)})`;

  HOC.getInitialProps = async (ctx) => {
    const token = auth(ctx);
    const componentProps =
      Page.getInitialProps && (await Page.getInitialProps(ctx));

    return { ...componentProps, token };
  };

  return HOC;
};
