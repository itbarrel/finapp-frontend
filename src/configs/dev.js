/* eslint-disable no-undef */
const dev = {
  dev: "dev",
  baseURL: process.env.NEXT_PUBLIC_HOST_URL, // prod api
  dynamicFormBaseURL: process.env.NEXT_PUBLIC_DYNAMIC_FORM_HOST_URL, // prod api 
  dynamicFormToken: process.env.NEXT_PUBLIC_DYNAMIC_FORM_HOST_TOKEN, // prod api
  siteName: "CrisisHub",
  siteDescription:
    "CrisisHub is a software platform that helps organizations take control of the chaotic crisis management process.",

  siteLogoUrl: "",
  consoleLog: true,
};

export default dev;
