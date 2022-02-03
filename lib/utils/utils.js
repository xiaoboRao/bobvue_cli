const ejs = require("ejs");
const path = require("path");
const fs = require("fs");

//解析组件模板 成字符串，然后写入目标文件夹中
const compile = (templateName, data) => {
  const fileOption = `../templates/${templateName}`;
  const filePath = path.resolve(__dirname, fileOption);

  return new Promise((resolve, reject) => {
    ejs.renderFile(filePath, { data }, {}, (err, str) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(str);
    });
  });
};
/**
 * 递归创建不存在的文件夹
 * @param {路径名 包含后缀的文件} pathName 
 * @returns 
 */
const createDirSync = (pathName) => {
    if (fs.existsSync(pathName)) {
      return true;
    } else {
      if (createDirSync(path.dirname(pathName))) {
        fs.mkdirSync(pathName);
        return true;
      }
    }
  }
const writeToFile = (path, content) => {
  return fs.promises.writeFile(path, content);
};

module.exports = {
  writeToFile,
  compile,
  createDirSync
};
