"use strict";
const common_vendor = require("../../../common/vendor.js");
var vk = common_vendor.index.vk;
const _sfc_main = {
  data() {
    return {
      options: {}
    };
  },
  onLoad(options) {
    vk = common_vendor.index.vk;
    this.options = options || {};
    this.init(options);
  },
  methods: {
    // 初始化
    init(options) {
      if (this.options.code) {
        vk.toast("已获取到code，请点击相应操作。");
        return false;
      }
    },
    getWeixinCode(scope) {
      let appid = "wx9ef431a7a78cb770";
      let redirect_uri = window.location.href.split("?")[0];
      let url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=${scope}&state=STATE#wechat_redirect`;
      window.location.href = url;
    },
    code2SessionWeixin() {
      let that = this;
      if (!that.options.code) {
        vk.toast("请先获取code");
        return false;
      }
      vk.userCenter.code2SessionWeixin({
        data: {
          code: that.options.code,
          state: that.options.state
        },
        success: (data) => {
          vk.alert(JSON.stringify(data));
        }
      });
    },
    // 微信登陆
    loginByWeixin(type) {
      let that = this;
      if (!that.options.code) {
        vk.toast("请先获取code");
        return false;
      }
      vk.userCenter.loginByWeixin({
        data: {
          code: that.options.code,
          state: that.options.state,
          type
        },
        success: (data) => {
          vk.alert(data.msg);
          that.data = data;
        }
      });
    },
    // 绑定微信
    bindWeixin() {
      let that = this;
      if (!that.options.code) {
        vk.toast("请先获取code");
        return false;
      }
      vk.userCenter.bindWeixin({
        data: {
          code: that.options.code
        },
        success: (data) => {
          vk.alert("绑定成功");
          that.data = data;
        }
      });
    },
    // 解绑微信
    unbindWeixin() {
      let that = this;
      vk.userCenter.unbindWeixin({
        success: (data) => {
          vk.alert("解绑成功");
          that.data = data;
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $options.getWeixinCode("snsapi_base")),
    b: common_vendor.o((...args) => $options.code2SessionWeixin && $options.code2SessionWeixin(...args)),
    c: common_vendor.o(($event) => $options.getWeixinCode("snsapi_userinfo")),
    d: common_vendor.o(($event) => $options.loginByWeixin("register")),
    e: common_vendor.o(($event) => $options.loginByWeixin("login")),
    f: common_vendor.o(($event) => $options.loginByWeixin()),
    g: common_vendor.o(($event) => $options.bindWeixin()),
    h: common_vendor.o(($event) => $options.unbindWeixin())
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-22fedd66"]]);
wx.createPage(MiniProgramPage);
