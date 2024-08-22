"use strict";
require("../../../../common/vendor.js");
const uni_modules_wotDesignUni_components_common_AbortablePromise = require("./AbortablePromise.js");
function addUnit(num) {
  return Number.isNaN(Number(num)) ? `${num}` : `${num}px`;
}
function isObj(value) {
  return Object.prototype.toString.call(value) === "[object Object]" || typeof value === "object";
}
function getType(target) {
  const typeStr = Object.prototype.toString.call(target);
  const match = typeStr.match(/\[object (\w+)\]/);
  const type = match && match.length ? match[1].toLowerCase() : "";
  return type;
}
const isDef = (value) => value !== void 0 && value !== null;
function kebabCase(word) {
  const newWord = word.replace(/[A-Z]/g, function(match) {
    return "-" + match;
  }).toLowerCase();
  return newWord;
}
function isArray(value) {
  if (typeof Array.isArray === "function") {
    return Array.isArray(value);
  }
  return Object.prototype.toString.call(value) === "[object Array]";
}
function isFunction(value) {
  return getType(value) === "function";
}
function isString(value) {
  return getType(value) === "string";
}
function isPromise(value) {
  if (isObj(value) && isDef(value)) {
    return isFunction(value.then) && isFunction(value.catch);
  }
  return false;
}
function objToStyle(styles) {
  if (isArray(styles)) {
    return styles.filter(function(item) {
      return item != null && item !== "";
    }).map(function(item) {
      return objToStyle(item);
    }).join(";");
  }
  if (isString(styles)) {
    return styles;
  }
  if (isObj(styles)) {
    return Object.keys(styles).filter(function(key) {
      return styles[key] != null && styles[key] !== "";
    }).map(function(key) {
      return [kebabCase(key), styles[key]].join(":");
    }).join(";");
  }
  return "";
}
const requestAnimationFrame = (cb = () => {
}) => {
  return new uni_modules_wotDesignUni_components_common_AbortablePromise.AbortablePromise((resolve) => {
    const timer = setInterval(() => {
      clearInterval(timer);
      resolve(true);
      cb();
    }, 1e3 / 30);
  });
};
function isImageUrl(url) {
  const imageRegex = /\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg|image)/i;
  return imageRegex.test(url);
}
exports.addUnit = addUnit;
exports.isDef = isDef;
exports.isImageUrl = isImageUrl;
exports.isObj = isObj;
exports.isPromise = isPromise;
exports.objToStyle = objToStyle;
exports.requestAnimationFrame = requestAnimationFrame;
