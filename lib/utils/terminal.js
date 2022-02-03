/**
 * 执行终端命令相关的代码
 */
//开启子进程
const { spawn } = require("child_process");

const commandOptions = (...args) => {
  return new Promise((resolve, reject) => {
     console.log("ready to create project ");
    const childProcess = spawn(...args);
    //将子进程的输出信息输出到当前控制台
    childProcess.stdout.pipe(process.stdout);
    childProcess.stderr.pipe(process.stderr);
    childProcess.on("close", (code) => {
      console.log(`child process exited with code ${code}`);
      resolve()
    });
  });
};

module.exports = {
    commandOptions
}
