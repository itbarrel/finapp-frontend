import NextI18Next from "next-i18next";
const languages = ["en", "fr"];

const options = {
  defaultLanguage: "en",
  otherLanguages: ["fr"],
  // eslint-disable-next-line no-undef
  localePath: process.browser ? "locales" : "public/locales",
  detection: {
    cookieSameSite: "strict",
  },
};

const NextI18NextInstance = new NextI18Next(options);

NextI18NextInstance.i18n.languages = languages;

export default NextI18NextInstance;
