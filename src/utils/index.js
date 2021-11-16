// eslint-disable-next-line no-undef
const _ = require("lodash");

export const getDisplayName = (Component) => {
  return Component.displayName || Component.name || "Component";
};

export const capitalize = (str) => {
  return _.capitalize(str.replace("_", " "));
};
