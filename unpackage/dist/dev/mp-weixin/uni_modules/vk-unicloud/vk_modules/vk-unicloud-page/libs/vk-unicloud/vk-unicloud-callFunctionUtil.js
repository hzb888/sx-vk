"use strict";
const common_vendor = require("../../../../../../common/vendor.js");
const uni_modules_vkUnicloud_vk_modules_vkUnicloudPage_libs_cloudStorage_index = require("../cloud-storage/index.js");
var vk = {};
var counterNum = 0;
var uniCloudEnvs = {};
var lastToLoginTime = 0;
class CallFunctionUtil {
  constructor() {
    this.config = {
      // 是否开启测试环境的云函数，true：使用测试环境，false：使用正式环境，默认true
      isTest: false,
      // 设为false可关闭打印日志
      debug: true,
      // 云函数路由（主函数名）
      functionName: "router",
      // 云函数路由（开发测试函数名）
      testFunctionName: "router-test",
      // 云函数url化后对应的url地址
      functionNameToUrl: {
        "router": "https://xxxxxxx.bspapp.com/http/router",
        "router-test": "https://xxxxxxx.bspapp.com/http/router"
      },
      // vk.callFunction的isRequest的默认值
      isRequestDefault: false,
      // 默认时区（中国为8）
      targetTimezone: 8,
      // 客户端登录页面地址
      login: {
        url: "/pages_template/uni-id/login/index/index"
      },
      // 请求配置
      request: {
        // 公共请求参数(每次请求都会带上的参数)
        dataParam: {}
      },
      // 日志风格
      logger: {
        colorArr: [
          "#0095ff",
          "#67C23A"
        ]
      },
      // 缓存键名 - token（请勿修改）
      uniIdTokenKeyName: "uni_id_token",
      // 缓存键名 - token过期时间（请勿修改）
      uniIdTokenExpiredKeyName: "uni_id_token_expired",
      // 缓存键名 - 当前登录用户信息（请勿修改）
      uniIdUserInfoKeyName: "uni_id_user_info",
      // 缓存键名 - 公共请求参数（请勿修改）
      requestGlobalParamKeyName: "vk_request_global_param",
      // 监听token刷新事件的事件名
      onRefreshTokenEventName: "onRefreshToken",
      // 自定义组件配置
      components: {}
    };
    this.getToken = (res = {}) => {
      let config = this.config;
      return vk.getStorageSync(config.uniIdTokenKeyName) || void 0;
    };
    this.saveToken = (res = {}) => {
      let config = this.config;
      vk.setStorageSync(config.uniIdTokenKeyName, res.token);
      vk.setStorageSync(config.uniIdTokenExpiredKeyName, res.tokenExpired);
      this.emitRefreshToken(res);
      if (this.config.debug)
        console.log("--------【token已更新】--------");
    };
    this.deleteToken = () => {
      let config = this.config;
      vk.removeStorageSync(config.uniIdTokenKeyName);
      vk.removeStorageSync(config.uniIdTokenExpiredKeyName);
      this.deleteUserInfo();
      this.emitRefreshToken();
      if (this.config.debug)
        console.log("--------【token已删除】--------");
    };
    this.updateUserInfo = (res = {}) => {
      let config = this.config;
      let {
        userInfo = {}
      } = res;
      if (typeof vk.setVuex === "function") {
        vk.setVuex("$user.userInfo", userInfo);
      } else {
        vk.setStorageSync(config.uniIdUserInfoKeyName, userInfo);
      }
    };
    this.deleteUserInfo = (res = {}) => {
      let {
        log = true
      } = res;
      let config = this.config;
      if (typeof vk.setVuex === "function") {
        vk.setVuex("$user.userInfo", {});
        vk.setVuex("$user.permission", []);
        vk.removeStorageSync(config.uniIdUserInfoKeyName);
      } else {
        vk.removeStorageSync(config.uniIdUserInfoKeyName);
      }
      if (this.config.debug && log)
        console.log("--------【用户信息已删除】--------");
    };
    this.checkToken = (res = {}) => {
      let config = this.config;
      let token = common_vendor.index.getStorageSync(config.uniIdTokenKeyName);
      let tokenExpired = common_vendor.index.getStorageSync(config.uniIdTokenExpiredKeyName);
      let valid = false;
      if (token && tokenExpired && tokenExpired > Date.now()) {
        valid = true;
      }
      return valid;
    };
    this.emitRefreshToken = (data = {}) => {
      let config = this.config;
      return vk.$emit(config.onRefreshTokenEventName, data);
    };
    this.onRefreshToken = (callback) => {
      let config = this.config;
      return vk.$on(config.onRefreshTokenEventName, callback);
    };
    this.offRefreshToken = (callback) => {
      let config = this.config;
      return vk.$off(config.onRefreshTokenEventName, callback);
    };
    this.updateRequestGlobalParam = (data = {}, setKey) => {
      let config = this.config;
      if (setKey) {
        config.request.dataParam = data;
      } else {
        let dataParam = common_vendor.index.getStorageSync(config.requestGlobalParamKeyName) || {};
        config.request.dataParam = Object.assign(dataParam, data);
      }
      vk.setStorageSync(config.requestGlobalParamKeyName, config.request.dataParam);
    };
    this.getRequestGlobalParam = (globalParamName = "*") => {
      let config = this.config;
      let data = config.request.dataParam;
      if (!data || JSON.stringify(data) === "{}") {
        data = common_vendor.index.getStorageSync(config.requestGlobalParamKeyName) || {};
        config.request.dataParam = data;
      }
      let param = data[globalParamName] || {};
      return JSON.parse(JSON.stringify(param));
    };
    this.deleteRequestGlobalParam = (globalParamName) => {
      let config = this.config;
      let globalParam = common_vendor.index.getStorageSync(config.requestGlobalParamKeyName) || {};
      if (globalParamName) {
        delete globalParam[globalParamName];
      } else {
        globalParam = {};
      }
      config.request.dataParam = globalParam;
      vk.setStorageSync(config.requestGlobalParamKeyName, globalParam);
    };
    this.interceptor = {
      // 拦截1301、1302错误码（非法token和token失效）
      login: (obj = {}) => {
        let nowTime = Date.now();
        if (nowTime - lastToLoginTime < 300) {
          return false;
        }
        lastToLoginTime = nowTime;
        let {
          params,
          res
        } = obj;
        let config = this.config;
        this.callFunction;
        if (config.debug)
          console.log("跳登录页面");
        let { tokenExpiredAutoDelete = true } = config;
        if (tokenExpiredAutoDelete)
          this.deleteToken();
        setTimeout(() => {
          if (config.login.url) {
            let currentPage = getCurrentPages()[getCurrentPages().length - 1];
            if (currentPage && currentPage.route && "/" + currentPage.route === config.login.url) {
              return false;
            }
            if (vk.navigate.isOnLaunchToLogin) {
              setTimeout(() => {
                vk.navigate.isOnLaunchToLogin = false;
              }, 500);
              return false;
            }
            common_vendor.index.navigateTo({
              url: config.login.url,
              events: {
                // 监听登录成功后的事件
                loginSuccess: (data) => {
                  let num = 2;
                  let pages = getCurrentPages();
                  if (pages.length >= num) {
                    let that = pages[pages.length - num];
                    if (typeof that.onLoad == "function") {
                      that.onLoad(that.options);
                    } else if (typeof that.init == "function") {
                      that.init(that.options);
                    } else
                      ;
                  }
                }
              }
            });
          } else {
            if (params.needAlert) {
              vk.alert(res.result.msg);
            }
          }
        }, 0);
      },
      // 全局请求失败拦截器
      fail: (obj = {}) => {
        return true;
      }
    };
    this.callFunction = (obj = {}) => {
      let that = this;
      let { config } = that;
      let {
        url,
        data = {},
        globalParamName
      } = obj;
      if (!url) {
        vk.toast("vk.callFunction的url参数不能为空");
        return;
      }
      if (obj.retryCount) {
        return that.callFunctionRetry(obj);
      }
      if (typeof data === "object") {
        obj.data = vk.pubfn.copyObject(data);
      }
      let globalParam = common_vendor.index.getStorageSync(config.requestGlobalParamKeyName) || {};
      for (let i in globalParam) {
        let customDate2 = globalParam[i];
        if (customDate2.regExp) {
          if (typeof customDate2.regExp === "object") {
            for (let i2 = 0; i2 < customDate2.regExp.length; i2++) {
              let regExp = new RegExp(customDate2.regExp[i2]);
              if (regExp.test(url)) {
                obj.data = Object.assign(customDate2.data, obj.data);
                break;
              }
            }
          } else {
            let regExp = new RegExp(customDate2.regExp);
            if (regExp.test(url)) {
              obj.data = Object.assign(customDate2.data, obj.data);
            }
          }
        }
      }
      let customDate = that.getRequestGlobalParam(globalParamName);
      if (customDate && JSON.stringify(customDate) !== "{}") {
        if (customDate.regExp) {
          obj.data = Object.assign(customDate.data, obj.data);
        } else {
          obj.data = Object.assign(customDate, obj.data);
        }
      }
      let needCheckToken = false;
      let isCloudObject = url.indexOf(".") > -1 ? true : false;
      if (isCloudObject) {
        let cloudObjectRule = that.getCloudObjectRule(url);
        if (cloudObjectRule.type !== "pub") {
          needCheckToken = true;
        }
      } else {
        if (url.indexOf("/kh/") > -1 || url.indexOf("/sys/") > -1) {
          needCheckToken = true;
        }
      }
      if (needCheckToken) {
        if (!vk.checkToken()) {
          return new Promise((resolve, reject) => {
            let res = { code: 30204, msg: "本地token校验未通过" };
            let params = obj;
            if (typeof that.interceptor.login === "function") {
              that.interceptor.login({
                res,
                params,
                vk
              });
            }
            reject(res);
          });
        }
      }
      if (typeof obj.isRequest === "undefined") {
        obj.isRequest = config.isRequestDefault;
      }
      let encryptRequestConfig = {};
      if (typeof vk.getVuex === "function") {
        encryptRequestConfig = vk.getVuex("$app.config.checkEncryptRequest") || {};
      } else {
        let lifeData = vk.getStorageSync("lifeData") || {};
        encryptRequestConfig = vk.pubfn.getData(lifeData, "$app.config.checkEncryptRequest") || {};
      }
      if (encryptRequestConfig.mode === 1) {
        let list = encryptRequestConfig.list || [];
        for (let i = 0; i < list.length; i++) {
          let regExp = new RegExp(list[i]);
          if (regExp.test(url)) {
            obj.encrypt = true;
            break;
          }
        }
      }
      if (obj.isRequest) {
        return that.runRequest(obj);
      } else {
        return that.runCallFunction(obj);
      }
    };
    this.setConfig = (customConfig = {}) => {
      for (let key in customConfig) {
        if (key === "vk") {
          vk = customConfig[key];
        } else if (key === "interceptor") {
          this.interceptor = Object.assign(this.interceptor, customConfig[key]);
          this.config.interceptor = customConfig[key];
        } else if (key === "myfn") {
          vk.myfn = customConfig[key];
        } else if (key === "loginPagePath") {
          this.config.login.url = customConfig[key];
        } else if (key === "uniCloud") {
          let uniCloudConfig = customConfig[key];
          if (uniCloudConfig && uniCloudConfig.envs) {
            for (let envKey in uniCloudConfig.envs) {
              let envItem = uniCloudConfig.envs[envKey];
              if (envItem && envItem.provider && envItem.spaceId) {
                let initConifg = {
                  provider: envItem.provider,
                  spaceId: envItem.spaceId
                };
                if (envItem.provider === "aliyun") {
                  initConifg.clientSecret = envItem.clientSecret;
                } else if (envItem.provider === "alipay") {
                  initConifg.spaceAppId = envItem.spaceAppId;
                  initConifg.accessKey = envItem.accessKey;
                  initConifg.secretKey = envItem.secretKey;
                }
                if (envItem.endpoint)
                  initConifg.endpoint = envItem.endpoint;
                uniCloudEnvs[envKey] = common_vendor.Vs.init(initConifg);
              }
            }
          }
        } else if (typeof customConfig[key] === "object" && typeof this.config[key] === "object") {
          this.config[key] = Object.assign(this.config[key], customConfig[key]);
        } else if (typeof customConfig[key] !== "undefined") {
          this.config[key] = customConfig[key];
        }
      }
    };
    this.getConfig = (key) => {
      let config = this.config;
      if (key) {
        return vk.pubfn.getData(config, key);
      } else {
        return config;
      }
    };
    this.init = (obj = {}) => {
      vk = obj.vk;
    };
    this.uploadFile = (obj = {}) => {
      let that = this;
      let config = that.config;
      if (!obj.filePath && obj.file && obj.file.path)
        obj.filePath = obj.file.path;
      if (obj.errorToast)
        obj.needAlert = false;
      obj.fileType = that.getFileType(obj);
      obj.suffix = that.getFileSuffix(obj);
      if (typeof obj.encrypt === "undefined") {
        obj.encrypt = vk.pubfn.getData(config, "service.cloudStorage.encrypt") || false;
      }
      if (typeof obj.env === "undefined") {
        obj.env = vk.pubfn.getData(config, "service.cloudStorage.env") || "default";
      }
      let {
        title,
        file = {},
        filePath,
        provider,
        cloudPath,
        cloudDirectory,
        needSave = false,
        category_id,
        uniCloud: myCloud,
        env,
        cloudPathAsRealPath = true,
        // 阿里云目录支持，需HBX3.8.5以上版本才支持
        cloudPathRemoveChinese = true,
        // 删除文件名中的中文
        errorToast,
        needAlert,
        fileType,
        suffix,
        encrypt
      } = obj;
      if (!provider) {
        let aliyunOSS = vk.pubfn.getData(config, "service.aliyunOSS");
        let defaultProvider = vk.pubfn.getData(config, "service.cloudStorage.defaultProvider") || "unicloud";
        if (aliyunOSS && aliyunOSS.isDefault) {
          provider = "aliyun";
        } else {
          provider = defaultProvider;
        }
      }
      obj.provider = provider;
      obj.runCloud = myCloud || uniCloudEnvs[env];
      let Logger = {};
      Logger.startTime = Date.now();
      Logger.filePath = filePath;
      let promiseRes = new Promise((resolve, reject) => {
        if (title)
          vk.showLoading(title);
        uni_modules_vkUnicloud_vk_modules_vkUnicloudPage_libs_cloudStorage_index.cloudStorage[provider].uploadFile(obj).then((res) => {
          res.provider = provider;
          Logger.result = res;
          if (typeof obj.success == "function")
            obj.success(res);
          resolve(res);
          if (needSave) {
            vk.userCenter.addUploadRecord({
              encrypt: obj.encrypt,
              data: {
                url: res.fileURL,
                name: file.name || this.getFileName(res.cloudPath),
                size: file.size,
                file_id: res.fileID,
                provider,
                category_id
              },
              filePath,
              fileType,
              success: () => {
                if (typeof obj.addSuccess == "function")
                  obj.addSuccess(res);
              },
              fail: (err2) => {
                if (typeof obj.addFail === "function")
                  obj.addFail(err2);
              },
              complete: () => {
                if (typeof obj.addComplete === "function")
                  obj.addComplete();
              }
            });
          }
        }).catch((err2) => {
          Logger.error = err2;
          let errMsg = err2.msg || err2.errMsg || err2.message || "";
          if (errMsg.indexOf("fail url not in domain list") > -1) {
            vk.toast("上传域名未在白名单中");
          } else {
            if (errorToast) {
              vk.toast(errMsg);
            } else if (needAlert) {
              vk.alert(errMsg);
            }
          }
          if (typeof obj.fail === "function")
            obj.fail(err2);
          reject(err2);
        }).finally(() => {
          if (title)
            vk.hideLoading();
          let config2 = this.config;
          Logger.endTime = Date.now();
          Logger.runTime = Logger.endTime - Logger.startTime;
          let colorArr = config2.logger.colorArr;
          let colorStr = colorArr[counterNum % colorArr.length];
          counterNum++;
          const providerObj = {
            "unicloud": "内置存储",
            "extStorage": "扩展存储",
            "aliyun": "阿里云oss"
          };
          let providerName = providerObj[provider] || provider;
          console.log(`%c--------【开始】【${providerName}-文件上传】--------`, "color: " + colorStr + ";font-size: 12px;font-weight: bold;");
          console.log("【本地文件】: ", Logger.filePath);
          console.log("【返回数据】: ", Logger.result);
          console.log("【预览地址】: ", Logger.result && Logger.result.url);
          console.log("【上传耗时】: ", Logger.runTime, "毫秒");
          console.log("【上传时间】: ", vk.pubfn.timeFormat(Logger.startTime, "yyyy-MM-dd hh:mm:ss"));
          if (Logger.error)
            console.error("【error】:", Logger.error);
          console.log(`%c--------【结束】【${providerName}-文件上传】--------`, "color: " + colorStr + ";font-size: 12px;font-weight: bold;");
          if (typeof obj.complete == "function")
            obj.complete();
        });
      });
      promiseRes.catch((err2) => {
      });
      return promiseRes;
    };
  }
  // 云函数普通请求
  runCallFunction(obj = {}) {
    let that = this;
    let config = that.config;
    let {
      url,
      data,
      title,
      loading,
      isRequest,
      name,
      complete,
      uniCloud: myCloud,
      env = "default",
      secretType,
      encrypt,
      timeout
    } = obj;
    if (title)
      vk.showLoading(title);
    if (loading)
      vk.setLoading(true, loading);
    if (!name)
      name = config.isTest ? config.testFunctionName : config.functionName;
    obj.name = name;
    let Logger = {};
    if (config.debug)
      Logger.params = typeof data == "object" ? JSON.parse(JSON.stringify(data)) : data;
    let promiseAction = new Promise(function(resolve, reject) {
      if (config.debug)
        Logger.startTime = Date.now();
      let runCloud = myCloud || uniCloudEnvs[env] || common_vendor.Vs;
      let decryptFn;
      if (encrypt) {
        let encryptRes = vk.crypto.encryptCallFunction(data);
        data = encryptRes.data;
        decryptFn = encryptRes.decrypt;
      }
      runCloud.callFunction({
        name,
        timeout,
        data: {
          $url: url,
          data,
          encrypt
        },
        secretType,
        success(res = {}) {
          if (typeof decryptFn === "function") {
            res.result = decryptFn(res.result);
          }
          that.callFunctionSuccess({
            res: res.result,
            params: obj,
            Logger,
            resolve,
            reject
          });
        },
        fail(res) {
          that.callFunctionFail({
            res,
            params: obj,
            Logger,
            reject,
            sysFail: true
          });
        },
        complete(res) {
          that.callFunctionComplete({
            res,
            params: obj,
            Logger
          });
        }
      });
    });
    promiseAction.catch((error) => {
    });
    return promiseAction;
  }
  // 云函数url化请求
  runRequest(obj = {}) {
    let that = this;
    let config = that.config;
    let {
      url,
      data,
      title,
      loading,
      name,
      complete,
      encrypt,
      timeout
    } = obj;
    if (typeof obj.needAlert === "undefined")
      obj.needAlert = true;
    if (!name)
      name = config.isTest ? config.testFunctionName : config.functionName;
    obj.name = name;
    let functionUrl = config.functionNameToUrl[name];
    let Logger = {};
    if (config.debug)
      Logger.params = typeof data == "object" ? JSON.parse(JSON.stringify(data)) : data;
    let uniIdToken = common_vendor.index.getStorageSync(config.uniIdTokenKeyName);
    common_vendor.index.getStorageSync(config.uniIdTokenExpiredKeyName);
    if (title)
      vk.showLoading(title);
    if (loading)
      vk.setLoading(true, loading);
    let promiseAction = new Promise((resolve, reject) => {
      if (config.debug)
        Logger.startTime = Date.now();
      let requestUrl = functionUrl;
      if (url.indexOf("/") !== 0 && requestUrl.lastIndexOf("/") !== requestUrl.length - 1) {
        requestUrl += "/";
      }
      requestUrl += url;
      let decryptFn;
      if (encrypt) {
        let encryptRes = vk.crypto.encryptCallFunction(data);
        data = encryptRes.data;
        decryptFn = encryptRes.decrypt;
      }
      const sysInfo = common_vendor.index.getSystemInfoSync();
      let header = JSON.parse(JSON.stringify({
        "content-type": "application/json;charset=utf8",
        "vk-encrypt": encrypt ? "true" : void 0,
        "uni-id-token": uniIdToken,
        "vk-appid": sysInfo.appId,
        "vk-platform": sysInfo.uniPlatform,
        "vk-locale": sysInfo.appLanguage,
        "vk-device-id": sysInfo.deviceId,
        "vk-os": sysInfo.osName,
        "vk-app-name": sysInfo.appName ? encodeURIComponent(sysInfo.appName) : void 0,
        "vk-app-version": sysInfo.appVersion,
        "vk-app-version-code": sysInfo.appVersionCode,
        "vk-browser-name": sysInfo.browserName ? encodeURIComponent(sysInfo.browserName) : void 0,
        "vk-browser-version": sysInfo.browserVersion,
        "vk-app-wgt-version": sysInfo.appWgtVersion,
        "vk-device-brand": sysInfo.deviceBrand,
        "vk-device-model": sysInfo.deviceModel,
        "vk-device-type": sysInfo.deviceType,
        "vk-uni-compile-version": sysInfo.uniCompileVersion,
        "vk-uni-runtime-version": sysInfo.uniRuntimeVersion,
        "vk-uni-compiler-version": sysInfo.uniCompilerVersion
      }));
      common_vendor.index.request({
        method: "POST",
        url: requestUrl,
        timeout,
        header,
        data,
        success: (res = {}) => {
          if (typeof decryptFn === "function") {
            res.data = decryptFn(res.data);
          }
          that.callFunctionSuccess({
            res: res.data,
            params: obj,
            Logger,
            resolve,
            reject
          });
        },
        fail: (res) => {
          that.callFunctionFail({
            res,
            params: obj,
            Logger,
            reject,
            sysFail: true
          });
        },
        complete: (res) => {
          that.callFunctionComplete({
            res,
            params: obj,
            Logger
          });
        }
      });
    });
    promiseAction.catch((error) => {
    });
    return promiseAction;
  }
  // 云函数请求成功时执行
  callFunctionSuccess(obj) {
    let that = this;
    let config = that.config;
    let {
      res = {},
      params,
      Logger,
      resolve,
      reject
    } = obj;
    let {
      title,
      loading,
      success
    } = params;
    if (title)
      vk.hideLoading();
    if (loading)
      vk.setLoading(false, loading);
    if (typeof res.code === "undefined" && typeof res.errCode !== "undefined")
      res.code = res.errCode;
    let code = res.code;
    if (config.debug)
      Logger.result = typeof res == "object" ? JSON.parse(JSON.stringify(res)) : res;
    if (code == 0 || res.key == 1 || code == void 0 && res.uid) {
      if (res.vk_uni_token)
        that.saveToken(res.vk_uni_token);
      if (res.userInfo && res.needUpdateUserInfo)
        that.updateUserInfo(res);
      if (typeof success == "function")
        success(res);
      resolve(res);
    } else if ([1301, 1302, 30201, 30202, 30203, 30204].indexOf(code) > -1 && res.msg.indexOf("token") > -1) {
      if (typeof that.interceptor.login === "function") {
        that.interceptor.login({
          res,
          params,
          vk
        });
      }
      reject(res);
    } else {
      that.callFunctionFail({
        res,
        params,
        Logger,
        reject
      });
    }
  }
  // 云函数请求失败时执行
  callFunctionFail(obj) {
    let that = this;
    let config = that.config;
    let { globalErrorCode = {} } = config;
    let {
      res = {},
      params,
      Logger,
      reject,
      sysFail
    } = obj;
    let {
      title,
      loading,
      errorToast,
      noAlert,
      needAlert,
      fail
    } = params;
    if (params.needRetry) {
      if (sysFail || res.code && [90001].indexOf(res.code) > -1) {
        if (!obj.hookResult || typeof obj.hookResult === "function" && !obj.hookResult(err)) {
          Logger.sysFail = true;
          if (typeof params.retry == "function")
            params.retry(res, params);
          return false;
        }
      }
    }
    if (typeof noAlert !== "undefined")
      needAlert = !noAlert;
    if (typeof needAlert === "undefined") {
      needAlert = typeof fail === "function" ? false : true;
    }
    if (errorToast)
      needAlert = false;
    if (title)
      vk.hideLoading();
    if (loading)
      vk.setLoading(false, loading);
    let errMsg = "";
    let sysErr = false;
    if (typeof res.code !== "undefined") {
      if (res.msg) {
        errMsg = res.msg;
      } else if (res.errMsg) {
        errMsg = res.errMsg;
      } else if (res.message) {
        errMsg = res.message;
      }
    } else {
      sysErr = true;
      errMsg = JSON.stringify(res);
    }
    if (typeof errMsg !== "string")
      errMsg = JSON.stringify(errMsg);
    if (!errMsg)
      errMsg = "";
    if (res.code >= 90001 && errMsg.indexOf("数据库") > -1) {
      sysErr = true;
    } else if ([404, 500].indexOf(res.code) > -1 && errMsg.indexOf("云函数") > -1) {
      sysErr = true;
    } else if (res.code === 501 && errMsg.indexOf("timeout for 10000ms") > -1 || res.code === "SYS_ERR" && errMsg.indexOf(": request:ok") > -1) {
      errMsg = globalErrorCode["cloudfunction-unusual-timeout"] || "请求超时，但请求还在执行，请重新进入页面。";
    } else if (typeof errMsg.toLowerCase === "function" && (errMsg.toLowerCase().indexOf("timeout") > -1 || errMsg.toLowerCase().indexOf("etimedout") > -1)) {
      sysErr = true;
      errMsg = globalErrorCode["cloudfunction-timeout"] || "请求超时，请重试！";
      needAlert = false;
      errorToast = false;
    } else if (errMsg.indexOf("reaches burst limit") > -1) {
      errMsg = globalErrorCode["cloudfunction-reaches-burst-limit"] || "系统繁忙，请稍后再试。";
    } else if (res.code === "InternalServerError") {
      sysErr = true;
    } else if (res.code === "SYS_ERR" && errMsg.indexOf("似乎已断开与互联网的连接") > -1) {
      errMsg = globalErrorCode["cloudfunction-network-unauthorized"];
      sysErr = true;
      needAlert = false;
    } else if (typeof res.error === "object" && res.success === false) {
      res = {
        code: res.error.code || -1,
        msg: res.error.message || res.error.msg || res.error.errMsg || "未知错误"
      };
    }
    let runKey = true;
    if (typeof that.interceptor.fail == "function") {
      runKey = that.interceptor.fail({
        vk,
        res,
        params
      });
      if (runKey === void 0)
        runKey = true;
    }
    if (runKey) {
      Logger.error = res;
      if (errorToast)
        vk.toast(errMsg, "none");
      if (needAlert && vk.pubfn.isNotNull(errMsg)) {
        if (sysErr) {
          let toastMsg = globalErrorCode["cloudfunction-system-error"] || "网络开小差了！";
          vk.toast(toastMsg, "none");
        } else {
          vk.alert(errMsg);
        }
      }
      if (typeof fail == "function")
        fail(res);
    }
    if (typeof reject == "function")
      reject(res);
  }
  // 云函数请求完成后执行
  callFunctionComplete(obj) {
    let that = this;
    let config = that.config;
    let {
      res = {},
      params,
      Logger
    } = obj;
    let {
      name,
      url,
      isRequest,
      complete,
      debug: debugLog,
      encrypt
    } = params;
    if (params.needRetry && Logger.sysFail) {
      return false;
    }
    if (typeof debugLog === "undefined")
      debugLog = config.debug;
    if (debugLog) {
      Logger.endTime = Date.now();
      if (isRequest) {
        Logger.label = "【url化】";
      } else {
        Logger.label = "";
      }
      Logger.runTime = Logger.endTime - Logger.startTime;
      let colorArr = config.logger.colorArr;
      let colorStr = colorArr[counterNum % colorArr.length];
      counterNum++;
      let functionType = url.indexOf(".") > -1 ? "云对象" : "云函数";
      if (encrypt) {
        functionType = functionType + "加密";
      }
      console.log(`%c--------【开始】${Logger.label}【${functionType}请求】【${name}】【${url}】--------`, `color: ${colorStr};font-size: 12px;font-weight: bold;`);
      console.log("【请求参数】: ", Logger.params);
      console.log("【返回数据】: ", Logger.result);
      console.log("【总体耗时】: ", Logger.runTime, "毫秒【含页面渲染】");
      console.log("【请求时间】: ", vk.pubfn.timeFormat(Logger.startTime, "yyyy-MM-dd hh:mm:ss"));
      if (Logger.error) {
        let errorLog = console.warn || console.error;
        if (Logger.error.err && Logger.error.err.stack) {
          console.error("【Error】: ", Logger.error);
          console.error("【Stack】: ", Logger.error.err.stack);
        } else {
          errorLog("【Error】: ", Logger.error);
          if (typeof Logger.error === "object" && typeof Logger.error.code === "undefined" && typeof Logger.error.success !== "boolean" || typeof Logger.error !== "object") {
            errorLog("【提示】: ", "返回数据必须是对象，且至少需要返回 { code: 0 }，请查看VK框架响应体规范 https://vkdoc.fsq.pub/client/uniCloud/cloudfunctions/resformat.html");
          }
        }
      }
      console.log(`%c--------【结束】${Logger.label}【${functionType}请求】【${name}】【${url}】--------`, `color: ${colorStr};font-size: 12px;font-weight: bold;`);
    }
    if (typeof complete == "function")
      complete(res);
  }
  // 获取文件后缀名
  getFileSuffix(obj = {}) {
    let {
      file,
      filePath,
      suffix = "png"
    } = obj;
    if (filePath) {
      let suffixName = filePath.substring(filePath.lastIndexOf(".") + 1);
      if (suffixName && suffixName.length < 5)
        suffix = suffixName;
    }
    if (file) {
      if (file.path) {
        let suffixName = file.path.substring(file.path.lastIndexOf(".") + 1);
        if (suffixName && suffixName.length < 5)
          suffix = suffixName;
      }
      if (file.name) {
        let suffixName = file.name.substring(file.name.lastIndexOf(".") + 1);
        if (suffixName && suffixName.length < 5)
          suffix = suffixName;
      }
    }
    return suffix;
  }
  // 获取文件类型
  getFileType(obj = {}) {
    let fileType = "other";
    let suffix = this.getFileSuffix(obj);
    if (["png", "jpg", "jpeg", "gif", "bmp", "svg", "webp"].indexOf(suffix) > -1) {
      fileType = "image";
    } else if (["avi", "mp3", "mp4", "3gp", "mov", "rmvb", "rm", "flv", "mkv"].indexOf(suffix) > -1) {
      fileType = "video";
    }
    return fileType;
  }
  // 获取文件名
  getFileName(cloudPath = "") {
    let parts = cloudPath.split("/");
    return parts[parts.length - 1];
  }
  // 获取云对象权限类型
  // 文档：https://vkdoc.fsq.pub/client/uniCloud/cloudfunctions/cloudObject.html#内置权限
  getCloudObjectRule(url) {
    let directoryIndex = url.lastIndexOf("/");
    let cloudObjectUrl = url.substring(directoryIndex + 1);
    let lastIndex = cloudObjectUrl.lastIndexOf(".");
    let cloudObjectDirectory = url.substring(0, directoryIndex);
    let cloudObjectDirectoryArray = cloudObjectDirectory.split("/");
    let cloudObjectName = cloudObjectUrl.substring(0, lastIndex);
    let functionName = cloudObjectUrl.substring(lastIndex + 1);
    let rule = {
      type: "kh",
      weight: 0
    };
    if (cloudObjectDirectoryArray.indexOf("sys") > -1) {
      rule.type = "sys";
      rule.weight = 1;
    } else if (cloudObjectDirectoryArray.indexOf("kh") > -1) {
      rule.type = "kh";
      rule.weight = 1;
    } else if (cloudObjectDirectoryArray.indexOf("pub") > -1) {
      rule.type = "pub";
      rule.weight = 1;
    }
    if (cloudObjectName.indexOf("sys.") === 0 || cloudObjectName === "sys") {
      rule.type = "sys";
      rule.weight = 2;
    } else if (cloudObjectName.indexOf("kh.") === 0 || cloudObjectName === "kh") {
      rule.type = "kh";
      rule.weight = 2;
    } else if (cloudObjectName.indexOf("pub.") === 0 || cloudObjectName === "pub") {
      rule.type = "pub";
      rule.weight = 2;
    }
    if (functionName.indexOf("sys_") === 0) {
      rule.type = "sys";
      rule.weight = 3;
    } else if (functionName.indexOf("kh_") === 0) {
      rule.type = "kh";
      rule.weight = 3;
    } else if (functionName.indexOf("pub_") === 0) {
      rule.type = "pub";
      rule.weight = 3;
    }
    if (functionName.indexOf("_") === 0) {
      rule.type = "private";
      rule.weight = 99;
    }
    return rule;
  }
  // 系统异常重试机制（表单提交时慎用，建议只用在查询请求中，即无任何数据库修改的请求中）
  callFunctionRetry(obj = {}) {
    let { retryCount } = obj;
    delete obj.retryCount;
    return new Promise((resolve, reject) => {
      this.callRetryFn(obj, resolve, reject, retryCount);
    });
  }
  // 重试实现
  callRetryFn(obj, resolve, reject, retryCount) {
    let debug = this.config.debug;
    return this.callFunction({
      ...obj,
      needRetry: retryCount ? true : false,
      // 判断是否需要重试
      retry: (err2) => {
        obj.runCount = obj.runCount ? obj.runCount + 1 : 1;
        obj.needRetry = retryCount > obj.runCount ? true : false;
        err2.message ? `异常信息：${err2.message}` : "";
        if (debug)
          console.log(`【请求失败】正在第【${obj.runCount}】次重试：${obj.url}`);
        if (obj.retryInterval) {
          setTimeout(() => {
            this._callRetryFn(obj, resolve, reject, retryCount);
          }, obj.retryInterval);
        } else {
          this._callRetryFn(obj, resolve, reject, retryCount);
        }
      }
    }).then(resolve).catch(reject);
  }
  _callRetryFn(obj, resolve, reject, retryCount) {
    if (obj.runCount < retryCount) {
      this.callRetryFn(obj, resolve, reject, retryCount);
    } else {
      this.callFunction(obj).then(resolve).catch(reject);
    }
  }
}
const callFunctionUtil = new CallFunctionUtil();
exports.callFunctionUtil = callFunctionUtil;
