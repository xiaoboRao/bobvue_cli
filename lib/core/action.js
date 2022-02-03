const { promisify } = require('util');
const open = require("open");
const download = promisify(require("download-git-repo"));
const path = require("path");

const { vueRepo } = require("../config/repo-config");
const { commandOptions } = require("../utils/terminal");
const { compile, writeToFile, createDirSync } = require("../utils/utils.js");
//a.创建project
//callBack ==> promisify ===>promise ==> async/await
const createProjectAction = async (project) => {
  //1.克隆项目
  await download(vueRepo, project, { clone: true });

  // 2.执行npm install
  //兼容windows
  const command = process.platform === "win32" ? "npm.cmd" : "npm";
  await commandOptions(command, ["install"], { cwd: `${project}` });

  //3.启动serve
  await commandOptions(command, ["run", "serve"], { cwd: `${project}` });

  //4.打开浏览器
  open("http://localhost:8080");
};

//b.创建组件
/**
 *
 * @param {组件名} name
 * @param {目标文件夹} dest
 */
const addCpnAction = async (name, dest) => {
  //1.编译ejs模板 result
  const result = await compile("vue-component.ejs", {
    name,
    lowerName: name.toLowerCase(),
  });
  console.log(result);

  //2.写入文件夹
  //没有就创建。

  if (createDirSync(dest)) {
  const targetPath = path.resolve(dest, `${name}.vue`);
  console.log(targetPath);
  writeToFile(targetPath, result);
  }
};

//b.创建文件加及路由
const addPageRouteAction = async (name, dest) => {
  //1.编译ejs模板 result
  const pageResult = await compile("vue-component.ejs", {
    name,
    lowerName: name.toLowerCase(),
  });

  const routerResult = await compile("vue-router.ejs", {
    name,
    lowerName: name.toLowerCase(),
  });

  console.log("dest", dest);
  //将目标文件夹和组件文件夹做一个拼接。
  const targetPath = path.resolve(dest, name.toLowerCase());

  console.log("targetPath", targetPath);
  //先判断是否有文件夹，没有就创建、、
  if (createDirSync(targetPath)) {
    //2.写入文件夹
    //program.dest可以获取到终端的<dest>
    const targetPagePath = path.resolve(targetPath, `${name}.vue`);

    const targetRouterPath = path.resolve(targetPath, "router.js");

    writeToFile(targetPagePath, pageResult);
    writeToFile(targetRouterPath, routerResult);
  }
};

//b.创建文件加及路由
const addStoreAction = async (name, dest) => {
  //1.编译ejs模板 result
  const storeResult = await compile("vue-store.ejs");
  const typesResult = await compile("vue-types.ejs");

  console.log("dest", dest);
  //将目标文件夹和组件文件夹做一个拼接。
  const targetPath = path.resolve(dest, name.toLowerCase());

  console.log("targetPath", targetPath);
  //先判断是否有文件夹，没有就创建、、
  if (createDirSync(targetPath)) {
    //2.写入文件夹
    //program.dest可以获取到终端的<dest>
    const targetStorePath = path.resolve(targetPath, `${name}.js`);
    const targetTypesPath = path.resolve(targetPath, "types.js");

    writeToFile(targetStorePath, storeResult);
    writeToFile(targetTypesPath, typesResult);
  }
};
module.exports = {
  createProjectAction,
  addCpnAction,
  addPageRouteAction,
  addStoreAction,
};
