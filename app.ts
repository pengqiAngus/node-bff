import { addAliases } from "module-alias";
addAliases({
  "@root": __dirname,
  "@interfaces": `${__dirname}/interface`,
  "@config": `${__dirname}/config`,
});

import Koa from "koa";
import config from "@config/index";
import render from "koa-swig";
import serve from "koa-static";
import co from "co";
import { createContainer, Lifetime } from "awilix";
import { loadControllers, scopePerRequest } from "awilix-koa";
import { historyApiFallback } from "koa2-connect-history-api-fallback";
import path from "path";
import glob from "glob";

const app = new Koa();
const { port, viewDir, memoryFlag, staticDir } = config;

app.context.render = co.wrap(
  render({
    root: viewDir,
    autoescape: true,
    cache: <"memory" | false>memoryFlag,
    writeBody: false,
    ext: "html",
  })
);

app.use(serve(staticDir));

const container = createContainer();
container.loadModules([`${__dirname}/services/*.ts`], {
  formatName: "camelCase",
  resolverOptions: {
    lifetime: Lifetime.SCOPED,
  },
});

app.use(scopePerRequest(container));

// 
const fileExt = process.env.NODE_ENV === "development" ? ".js" : ".js";

const loadDynamicControllers = async () => {
  // 获取所有控制器文件的路径
  const files = glob.sync(path.join(__dirname, "/routers/*.js"));

  // 动态导入所有控制器模块
  const controllers = await Promise.all(files.map((file) => import(file)));

  // 返回控制器模块
  return controllers.map((controller) => controller.default || controller);
};

loadDynamicControllers()
  .then((controllers:any) => {
    app.use(loadControllers(controllers));
  })
  .catch((err) => {
    console.error("Failed to load controllers:", err);
  });

// app.use(loadControllers(`${__dirname}/routers/*.${fileExt}`));
app.listen(port, () => {
  console.log("京程一灯Server BFF启动成功");
});

export default app;
