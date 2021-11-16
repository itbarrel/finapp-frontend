import dev from "./dev";
import stage from "./stage";
import prod from "./prod";

let env = {};
let configs = {
  dev: dev,
  stage: stage,
  prod: prod,
};

env = configs.dev;

export default env;
