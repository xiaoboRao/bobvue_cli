//自定义options

const { program } = require("commander");

const helpOptions = () => {
  program.option("-s, --small", "small pizza size");
  program.option('-d,--dest <dest>', 'a destination folder, like: -d /src/components')
  //还可以自定义时间监听
  program.on("--help", function () {
    console.log("");
    console.log("Other:");
    console.log("  other options~");
  });
};

module.exports = {
  helpOptions,
};
