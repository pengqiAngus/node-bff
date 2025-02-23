import { addAliases } from "module-alias";
addAliases({
  "@root": __dirname,
  "@interfaces": `${__dirname}/interface`,
  "@config": `${__dirname}/config`,
  "@middlewares": `${__dirname}/middlewares`,
});

import Koa from "koa";
import render from "koa-swig";
import serve from "koa-static";
import co from "co";
import { createContainer, Lifetime } from "awilix";
import { loadControllers, scopePerRequest } from "awilix-koa";

import { configure, getLogger } from "log4js";

import ErrorHandler from "@middlewares/ErrorHandler";
import { historyApiFallback } from "koa2-connect-history-api-fallback";

import config from "@config/index";

configure({
  appenders: { cheese: { type: "file", filename: `${__dirname}/logs/yd.log` } },
  categories: { default: { appenders: ["cheese"], level: "error" } },
});
const logger = getLogger("cheese");

const { port, viewDir, staticDir, memoryFlag } = config;

const app = new Koa();
// app.context.render = co.wrap(
//   render({
//     root: viewDir,
//     autoescape: true,
//     cache: <"memory" | false>memoryFlag,
//     writeBody: false,
//     ext: "html",
//   })
// );
app.use(serve(staticDir));

const container = createContainer();
container.loadModules([`${__dirname}/services/*.ts`], {
  formatName: "camelCase",
  resolverOptions: {
    lifetime: Lifetime.SCOPED,
  },
});

app.use(scopePerRequest(container));

console.log(`${__dirname}/routers/`);

app.use(loadControllers(`${__dirname}/routers/*.ts`));

ErrorHandler.error(app, logger);

// 不是api都定向到根路由，让前端接管路由
app.use(historyApiFallback({ index: "/", whiteList: ["/api"] }));
app.listen(port, () => {
  console.log("京程一灯Server BFF启动成功");
});
export default app;
