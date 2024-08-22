"use strict";
const common_vendor = require("../../../../../../common/vendor.js");
var localStorage = {};
localStorage.setStorageSync = function(key, data) {
  common_vendor.index.setStorageSync(key, data);
  watchLocalStorage({ type: "set", key, data });
};
localStorage.getStorageSync = function(key) {
  let data = common_vendor.index.getStorageSync(key);
  return data;
};
localStorage.getStorageInfoSync = function() {
  let info = common_vendor.index.getStorageInfoSync();
  let sizeInfo = calcSize(Number(info.currentSize), 1024, 3, ["KB", "MB", "GB"]);
  info.sizeInfo = sizeInfo;
  return info;
};
localStorage.removeStorageSync = function(key) {
  common_vendor.index.removeStorageSync(key);
  watchLocalStorage({ type: "remove", key });
};
localStorage.removeStorage = function(obj) {
  common_vendor.index.removeStorage({
    key: obj.key,
    success: (res) => {
      watchLocalStorage({ type: "remove", key: obj.key });
      if (obj.success)
        obj.success(res);
    },
    fail: obj.fail,
    complete: obj.complete
  });
};
localStorage.clearStorageSync = function(key) {
  if (key) {
    let { keys } = common_vendor.index.getStorageInfoSync();
    if (keys) {
      keys.map((keyName) => {
        if (keyName.indexOf(key) == 0) {
          localStorage.removeStorage({
            key: keyName
          });
        }
      });
    }
  } else {
    common_vendor.index.clearStorage();
    watchLocalStorage({ type: "clear" });
  }
};
function calcSize(length = 0, ary, precision, arr) {
  var size = parseFloat(length);
  var mySize = 0;
  var type = "";
  if (size < ary || arr.length <= 1) {
    type = arr[0];
    mySize = parseFloat(size.toFixed(precision));
  } else {
    for (var i = 1; i < arr.length; i++) {
      var g = arr[i];
      size = size / ary;
      if (size < ary) {
        type = g;
        mySize = parseFloat(size.toFixed(precision));
        break;
      }
    }
  }
  return {
    size: mySize,
    type,
    title: mySize + " " + type
  };
}
function watchLocalStorage(obj) {
  if (typeof localStorage.watch === "function") {
    localStorage.watch(obj);
  }
}
exports.localStorage = localStorage;
