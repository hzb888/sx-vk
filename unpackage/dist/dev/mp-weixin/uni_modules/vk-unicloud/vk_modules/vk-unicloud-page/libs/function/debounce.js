"use strict";
let timeoutArr = [];
function debounce(fn, time = 500, isImmediate = true, timeoutName = "default") {
  if (!timeoutArr[timeoutName])
    timeoutArr[timeoutName] = null;
  if (timeoutArr[timeoutName] !== null)
    clearTimeout(timeoutArr[timeoutName]);
  if (isImmediate) {
    var callNow = !timeoutArr[timeoutName];
    timeoutArr[timeoutName] = setTimeout(() => {
      timeoutArr[timeoutName] = null;
    }, time);
    if (callNow) {
      if (typeof fn === "function")
        return fn();
    }
  } else {
    timeoutArr[timeoutName] = setTimeout(() => {
      if (typeof fn === "function")
        return fn();
    }, time);
  }
}
exports.debounce = debounce;
