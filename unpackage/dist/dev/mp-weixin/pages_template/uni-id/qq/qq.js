"use strict";
const common_vendor = require("../../../common/vendor.js");
var vk = common_vendor.index.vk;
const _sfc_main = {
  data() {
    return {};
  },
  onLoad(options) {
    vk = common_vendor.index.vk;
  },
  methods: {
    // QQ登陆
    loginByQQ(type) {
      vk.userCenter.loginByQQ({
        data: {
          type
        },
        success: (data) => {
          vk.alert("登录成功");
        }
      });
    },
    // 绑定QQ
    bindQQ() {
      vk.userCenter.bindQQ({
        success: (data) => {
          vk.alert("绑定成功");
        }
      });
    },
    // 解绑QQ
    unbindQQ() {
      vk.userCenter.unbindQQ({
        success: (data) => {
          vk.alert("解绑成功");
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $options.loginByQQ("register")),
    b: common_vendor.o(($event) => $options.loginByQQ("login")),
    c: common_vendor.o(($event) => $options.loginByQQ()),
    d: common_vendor.o((...args) => $options.bindQQ && $options.bindQQ(...args)),
    e: common_vendor.o((...args) => $options.unbindQQ && $options.unbindQQ(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-49a977d6"]]);
wx.createPage(MiniProgramPage);
