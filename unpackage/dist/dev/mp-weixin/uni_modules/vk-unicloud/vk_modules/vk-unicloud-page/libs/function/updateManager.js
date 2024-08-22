"use strict";
const common_vendor = require("../../../../../../common/vendor.js");
var updateManager = {};
updateManager.updateReady = function(obj) {
  updateManagerByMP(obj);
};
function updateManagerByMP(obj = {}) {
  let {
    title = "更新提示",
    content = "新版本已经准备好，点击更新！",
    autoUpdate = true,
    showCancel = false,
    confirmText = "一键更新"
  } = obj;
  const updateManager2 = common_vendor.index.getUpdateManager();
  updateManager2.onCheckForUpdate(function(res) {
  });
  updateManager2.onUpdateReady(function(res) {
    common_vendor.index.showModal({
      title,
      content,
      showCancel,
      confirmText,
      success(res2) {
        if (res2.confirm) {
          if (typeof obj.success === "function") {
            obj.success({
              applyUpdate: updateManager2.applyUpdate
            });
          }
          if (typeof obj.complete === "function")
            obj.complete();
          if (autoUpdate) {
            updateManager2.applyUpdate();
          }
        }
      }
    });
  });
  updateManager2.onUpdateFailed(function(res) {
    console.error("onUpdateFailed", res);
    if (typeof obj.fail === "function")
      obj.fail(res);
    if (typeof obj.complete === "function")
      obj.complete();
  });
}
exports.updateManager = updateManager;
