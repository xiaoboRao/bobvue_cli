const { program } = require("commander");

const {
  createProjectAction,
  addCpnAction,
  addPageRouteAction,
  addStoreAction,
} = require("./action.js");

const createOptions = () => {
  //process.argv获取的是输入控制台的字符，是个数组
  let index = process.argv.length - 1;
  console.log("commaner", process.argv[index]);
  //获取到最后的字符串
  let folder = process.argv[index];
  //create project
  program
    .command("create <project> [others...]")
    .description("clone a repository into a newly created directory")
    .action(createProjectAction);

  program
    .command("addcpn <name>")
    .description(
      "add vue component, like: why addcpn HelloWorld [-d src/components]"
    )
    .action((name) => {
      addCpnAction(name, folder || "src/components");
    });

  program
    .command("addpage <page>")
    .description(
      "add vue page and router config, like: why addpage Home [-d src/pages]"
    )
    .action((page) => {
      addPageRouteAction(page, folder || "src/pages");
    });

  program
    .command("addstore <store>")
    .description(
      "add vue page and router config, like: why addpage Home [-d src/pages]"
    )
    .action((store) => {
      addStoreAction(store, folder || "src/store/modules");
    });
};

module.exports = {
  createOptions,
};
