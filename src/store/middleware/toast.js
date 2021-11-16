import { log } from "../../utils/console-log";

const toast = () => (next) => (action) => {
  if (action.type === "error") {
    log(`Toastify`, action.payload.message);
  } else {
    return next(action);
  }
};

export default toast;
