import Router from "next/router";
import NProgress from "nprogress";
import { log } from "../utils/console-log";

export function nprofress() {
  Router.events.on("routeChangeStart", (url) => {
    log("App Layout - start loading", url);
    NProgress.start();
  });

  Router.events.on("routeChangeComplete", () => {
    log("App Layout - route change complete");
    NProgress.done();
  });
  Router.events.on("routeChangeError", () => {
    log("App Layout - route change error");
    NProgress.done();
  });
}
