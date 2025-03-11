import _ from "lodash";
import { join } from "path";

let config = {
  viewDir: join(__dirname, "..", "views"),
  staticDir: join(__dirname, "..", "assets"),
  port: 8080,
  memoryFlag: false,
};
if (process.env.NODE_ENV === "development") {
  let localConfig = {
    port: 8080,
  };
  config = _.assignIn(config, localConfig);
}
if (process.env.NODE_ENV === "production") {
  let prodConfig = {
    port: 8080,
    memoryFlag: "memory",
  };
  config = _.assignIn(config, prodConfig);
}

export default config;
