import { log } from "../../utils/console-log";

const logger =
  (params) => ({ getState, dispatch }) => (next) => (action) => {
    log("logger:params", params);
    log("logger:store getState", getState);
    log("logger:store dispatch", dispatch);
    log("logger:next", next);
    log("logger:action", action);

    next(action);
  };

export default logger;
