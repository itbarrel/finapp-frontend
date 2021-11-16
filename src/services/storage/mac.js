// local store :: MAC
import localforage from "localforage";
import { IPV4 } from "../../constants/local-forage";

const MacService = {
  getIP() {
    return localforage.getItem(IPV4);
  },

  saveIP(ip) {
    localforage.setItem(IPV4, ip);
  },

  removeIP() {
    localforage.removeItem(IPV4);
  },
};

export default MacService;
