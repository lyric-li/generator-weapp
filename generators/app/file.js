const path = require("path");
const fs = require("fs");

/**
 * 绝对路径
 * @param {*} dir 目录
 */
function resolvePath(dir) {
  return path.join(__dirname, "", dir);
}

/**
 * 遍历目录文件
 * @param {*} currentDirPath
 * @param {*} callback
 */
function walkSync(currentDirPath, callback) {
  fs.readdirSync(currentDirPath).forEach(function(name) {
    const filePath = path.join(currentDirPath, name);
    let filePath2 = "";

    if (name.indexOf("_") === 0) {
      const tmp = name.replace("_", ".");
      filePath2 = path.join(currentDirPath, tmp);
    }

    const stat = fs.statSync(filePath);
    if (stat.isFile()) {
      callback(filePath, filePath2, stat);
    } else if (stat.isDirectory()) {
      walkSync(filePath, callback);
    }
  });
}

module.exports.resolvePath = resolvePath;
module.exports.walkSync = walkSync;
