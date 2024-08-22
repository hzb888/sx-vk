"use strict";
const common_vendor = require("../../../../../../common/vendor.js");
const app_config = require("../../../../../../app.config.js");
var util = {};
var lastNavigate = {
  url: "",
  time: 0
};
util.navigateTo = function(obj) {
  let vk = common_vendor.index.vk;
  if (typeof obj == "string") {
    let url = obj;
    obj = {
      url
    };
  } else if (typeof obj == "undefined") {
    obj = {};
  }
  if (!obj.url) {
    vk.toast("url不能为空!");
    return false;
  }
  let time = Date.now();
  if (lastNavigate.url === obj.url && time - lastNavigate.time < 200) {
    return false;
  }
  lastNavigate = { url: obj.url, time };
  util.checkNeedLogin({
    url: obj.url,
    success: function(res) {
      if (res.needLogin) {
        obj.url = vk.pubfn.getPageFullPath(obj.url);
        vk.navigate.setOriginalPage(obj);
        obj.url = app_config.config.login.url;
        let { interceptor = {} } = app_config.config;
        if (typeof interceptor.login === "function") {
          let key = interceptor.login({
            vk,
            params: obj,
            res: {
              ...res,
              code: 30204,
              msg: "本地token校验未通过"
            }
          });
          if (typeof key === "undefined" || key !== true)
            return false;
        }
      } else {
        vk.navigate.setOriginalPage(null);
      }
      util._navigateTo(obj);
    }
  });
};
util._navigateTo = function(obj) {
  let { interceptor = {} } = app_config.config;
  if (typeof interceptor.navigateTo === "function") {
    let vk = common_vendor.index.vk;
    obj.pagePath = vk.pubfn.getPageFullPath(obj.url);
    let key = interceptor.navigateTo({
      ...obj,
      vk
    });
    if (typeof key == "boolean" && key === false)
      return false;
  }
  let {
    url,
    animationType = "pop-in",
    animationDuration = 300,
    events,
    mode = "navigateTo"
  } = obj;
  let navigateFn;
  if (mode === "navigateTo") {
    navigateFn = common_vendor.index.navigateTo;
  } else if (mode === "redirectTo") {
    navigateFn = common_vendor.index.redirectTo;
  } else if (mode === "reLaunch") {
    navigateFn = common_vendor.index.reLaunch;
  } else if (mode === "switchTab") {
    navigateFn = common_vendor.index.switchTab;
  } else {
    navigateFn = common_vendor.index.navigateTo;
  }
  navigateFn({
    url,
    animationType,
    animationDuration,
    events,
    // 参考 https://uniapp.dcloud.io/api/router?id=navigateto
    success: function(res) {
      if (typeof obj.success == "function")
        obj.success(res);
    },
    fail: function(err) {
      if (err.errMsg.indexOf("not found") > -1) {
        let vk = common_vendor.index.vk;
        let errUrl = vk.pubfn.getPageFullPath(url);
        vk.toast(`页面 ${errUrl} 不存在`, "none");
        console.error(err);
        return false;
      }
      common_vendor.index.switchTab({
        url,
        success: obj.success,
        fail: function() {
          common_vendor.index.redirectTo({
            url,
            success: obj.success,
            fail: function(err2) {
              console.error(err2);
              if (typeof obj.fail == "function")
                obj.fail(err2);
            }
          });
        }
      });
    },
    complete: function(res) {
      if (typeof obj.complete == "function")
        obj.complete(res);
    }
  });
};
util.redirectTo = function(obj) {
  obj = util.paramsInit(obj);
  obj.mode = "redirectTo";
  util.navigateTo(obj);
};
util.reLaunch = function(obj) {
  obj = util.paramsInit(obj);
  obj.mode = "reLaunch";
  util.navigateTo(obj);
};
util.switchTab = function(obj) {
  obj = util.paramsInit(obj);
  obj.mode = "switchTab";
  util.navigateTo(obj);
};
util.navigateBack = function(obj) {
  common_vendor.index.vk;
  if (typeof obj == "number") {
    let delta2 = obj;
    obj = {
      delta: delta2
    };
  } else if (typeof obj == "undefined") {
    obj = {};
  }
  let {
    delta = 1,
    animationType = "pop-out",
    animationDuration = 300
  } = obj;
  common_vendor.index.navigateBack({
    delta,
    animationType,
    animationDuration,
    success: function() {
      if (typeof obj.success == "function")
        obj.success();
    },
    fail: function(res) {
      console.error(res);
      if (typeof obj.fail == "function")
        obj.fail();
    },
    complete: function() {
      if (typeof obj.complete == "function")
        obj.complete();
    }
  });
};
util.originalTo = function() {
  let vk = common_vendor.index.vk;
  let originalPage = vk.navigate.getOriginalPage();
  vk.navigate.setOriginalPage(null);
  util.redirectTo(originalPage);
};
util.getOriginalPage = function() {
  if (typeof common_vendor.index.vk.getVuex === "function") {
    return common_vendor.index.vk.getVuex("$app.originalPage");
  } else {
    return common_vendor.index.vk.getStorageSync("vk.navigate.originalPage");
  }
};
util.setOriginalPage = function(originalPage) {
  common_vendor.index.vk.navigate.originalPage = originalPage;
  if (typeof common_vendor.index.vk.getVuex === "function") {
    return common_vendor.index.vk.setVuex("$app.originalPage", originalPage);
  } else {
    return common_vendor.index.vk.setStorageSync("vk.navigate.originalPage", originalPage);
  }
};
util.navigateToHome = function(obj = {}) {
  let vk = common_vendor.index.vk;
  let {
    mode = "reLaunch"
  } = obj;
  vk[mode](app_config.config.index.url);
};
util.navigateToLogin = function(obj = {}) {
  let vk = common_vendor.index.vk;
  let {
    redirectUrl,
    // 当mode为reLaunch或redirectTo时，指定登录成功后跳转的地址，redirectUrl的优先级高于needBack
    needBack,
    // 当mode为reLaunch或redirectTo时，登录成功是否需要返回当前页面
    mode = "reLaunch",
    // 可选值为 navigateTo redirectTo reLaunch
    query
    // 传递给登录页的参数
  } = obj;
  let url = app_config.config.login.url;
  let { pagePath, fullPath } = vk.pubfn.getCurrentPage();
  if (pagePath === url) {
    return false;
  }
  if (mode !== "navigateTo") {
    let uniIdRedirectUrl;
    if (typeof redirectUrl === "string") {
      uniIdRedirectUrl = encodeURIComponent(redirectUrl);
    } else if (needBack) {
      uniIdRedirectUrl = encodeURIComponent(fullPath);
    }
    if (uniIdRedirectUrl) {
      url += url.indexOf("?") > -1 ? `&` : `?`;
      url += `uniIdRedirectUrl=${uniIdRedirectUrl}`;
    }
  }
  if (query) {
    url += url.indexOf("?") > -1 ? `&` : `?`;
    url += query;
  }
  vk[mode]({
    ...obj,
    url
  });
};
util.checkWildcardTest = function(obj) {
  let vk = common_vendor.index.vk;
  let {
    url,
    pagesRule
  } = obj;
  url = vk.pubfn.getPageFullPath(url);
  let key = false;
  if (vk.pubfn.isNotNull(pagesRule)) {
    let { mode = 0, list = [] } = pagesRule;
    if (mode > 0) {
      let regExpKey = false;
      let path = util.getPagePath(url);
      for (let i = 0; i < list.length; i++) {
        let pageRegExp = list[i];
        regExpKey = vk.pubfn.wildcardTest(path, pageRegExp);
        if (regExpKey) {
          break;
        }
      }
      if (mode === 1 && regExpKey) {
        key = true;
      } else if (mode === 2 && !regExpKey) {
        key = true;
      }
    }
  }
  return {
    url,
    key
  };
};
util.checkNeedLogin = function(obj) {
  let vk = common_vendor.index.vk;
  let { url, success } = obj;
  let needLogin = false;
  let pageNeedLogin = false;
  let pagesRule = app_config.config.checkTokenPages;
  if (pagesRule) {
    let res = util.checkWildcardTest({
      url,
      pagesRule
    });
    pageNeedLogin = res.key;
    if (pageNeedLogin) {
      if (!vk.checkToken()) {
        needLogin = true;
      }
    }
  }
  success({
    url,
    needLogin,
    pageNeedLogin
  });
};
util.getPagePath = function(url) {
  let pathIndex = url.indexOf("?");
  let path = url;
  if (pathIndex > -1) {
    path = path.substring(0, pathIndex);
  }
  return path;
};
util.paramsInit = function(obj) {
  let vk = common_vendor.index.vk;
  if (typeof obj == "string") {
    let url = obj;
    obj = {
      url
    };
  } else if (typeof obj == "undefined") {
    obj = {};
  }
  if (!obj.url) {
    vk.toast("url不能为空!");
    return false;
  }
  return obj;
};
util.navigateToMiniProgram = function(obj) {
  common_vendor.index.vk;
  common_vendor.index.navigateToMiniProgram(obj);
};
util.checkAllowShare = function(obj) {
  common_vendor.index.vk;
  let { url, success } = obj;
  let pagesRule = app_config.config.checkSharePages || {};
  if (pagesRule && pagesRule.mode > 0) {
    let res = util.checkWildcardTest({
      url,
      pagesRule
    });
    {
      let menus = pagesRule.menus || ["shareAppMessage", "shareTimeline"];
      if (res.key) {
        common_vendor.index.showShareMenu({
          withShareTicket: false,
          menus
        });
      } else {
        common_vendor.index.hideShareMenu({
          menus
        });
      }
    }
  }
};
util.$emit = function(...obj) {
  return common_vendor.index.$emit(...obj);
};
util.$on = function(...obj) {
  return common_vendor.index.$on(...obj);
};
util.$once = function(...obj) {
  return common_vendor.index.$once(...obj);
};
util.$off = function(...obj) {
  return common_vendor.index.$off(...obj);
};
exports.util = util;
