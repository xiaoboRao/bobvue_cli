const { program } = require("commander");

const {
  createProjectAction,
  addCpnAction,
  addPageRouteAction,
  addStoreAction,
} = require("./action.js");

const createOptions = () => {
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
      const options = program.opts();
      addCpnAction(name, options.dest || "src/components");
    });

  program
    .command("addpage <page>")
    .description(
      "add vue page and router config, like: why addpage Home [-d src/pages]"
    )
    .action((page) => {
      const options = program.opts();
      addPageRouteAction(page, options.dest || "src/pages");
    });

  program
    .command("addstore <store>")
    .description(
      "add vue page and router config, like: why addpage Home [-d src/pages]"
    )
    .action((store) => {
      const options = program.opts();
      addStoreAction(store, options.dest || "src/store/modules");
    });
};

module.exports = {
  createOptions,
};
