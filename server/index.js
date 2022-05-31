const express = require("express");
const next = require("next");
// const basicAuth = require('express-basic-auth')
const path = require("path");
// const nextI18NextMiddleware = require("next-i18next/middleware").default;
// const nextI18next = require("../modules/I18n");
// const cookieParser = require("cookie-parser");
// const sessionCookie = require("./middlewares/sessionCookie");

const dev = process.env.NODE_ENV !== "production";
// const prod = process.env.NODE_ENV === 'production'
const app = next({ dev, dir: path.join(__dirname, "..") });
const handler = app.getRequestHandler();
const port = parseInt(process.env.PORT, 10) || 4000;

app.prepare().then(() => {
  const server = express();

  // if (!dev && !prod) {
  //   server.use(basicAuth({
  //     users: { argo: process.env.BASIC_AUTH_PWD },
  //     challenge: true
  //   }))
  // }

  server
    // .use(cookieParser())
    // .use(sessionCookie)
    // .use(nextI18NextMiddleware(nextI18next))
    .use(handler);

  server.listen(port, (err) => {
    if (err) {
      throw err;
    }
    console.log(`> Ready on http://localhost:${port}`);
  });
});
