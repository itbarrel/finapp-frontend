import ENV from "../configs";

export const log = (string, dump = "") => {
  const fancy = `>> ${string} <<`;
  return ENV.consoleLog && console.log(fancy, dump);
};
