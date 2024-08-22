"use strict";
const common_vendor = require("../vendor.js");
var myfn = {};
myfn.test1 = function(obj = {}) {
  common_vendor.index.vk;
  console.log("执行了自定义公共函数test1");
  return obj;
};
exports.myfn = myfn;
