#!/usr/bin/env node
// console.log("bob cli");
const { program } = require("commander");
const { helpOptions } = require("./lib/core/help");
const { createOptions } = require("./lib/core/create");
//获取版本号
program.version(require("./package.json").version);

//help命令 
helpOptions();

//create项目命令 
createOptions()
//解析控制台的指令
program.parse(process.argv);
