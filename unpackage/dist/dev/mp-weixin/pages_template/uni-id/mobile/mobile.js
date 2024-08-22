"use strict";
const common_vendor = require("../../../common/vendor.js");
var vk = common_vendor.index.vk;
const _sfc_main = {
  data() {
    return {
      form1: {
        mobile: "",
        code: "",
        password: "123456"
      }
    };
  },
  onLoad(options) {
    vk = common_vendor.index.vk;
  },
  methods: {
    // 为了演示把这个逻辑放在客户端
    getCode() {
      const randomStr = "00000" + Math.floor(Math.random() * 1e6);
      this.form1.code = randomStr.substring(randomStr.length - 6);
    },
    sendSmsCode(type) {
      let that = this;
      if (!/^1\d{10}$/.test(that.form1.mobile)) {
        common_vendor.index.showModal({
          content: "请输入正确的手机号",
          showCancel: false
        });
        return;
      }
      var form1 = that.form1;
      vk.userCenter.sendSmsCode({
        data: {
          mobile: form1.mobile,
          type
        },
        success: (data) => {
          vk.alert("短信发送成功");
        }
      });
    },
    setVerifyCode(type) {
      let that = this;
      if (!/^1\d{10}$/.test(that.form1.mobile)) {
        common_vendor.index.showModal({
          content: "请输入正确的手机号",
          showCancel: false
        });
        return;
      }
      that.getCode();
      var form1 = that.form1;
      vk.userCenter.setVerifyCode({
        data: {
          mobile: form1.mobile,
          code: form1.code,
          type
        },
        success: (data) => {
          vk.toast("发送成功");
        }
      });
    },
    // 登录(手机号+验证码)
    loginBySms() {
      let that = this;
      var form1 = that.form1;
      vk.userCenter.loginBySms({
        data: form1,
        success: (data) => {
          vk.alert("登录成功");
        }
      });
    },
    // 绑定手机号
    bindMobile() {
      let that = this;
      var form1 = that.form1;
      vk.userCenter.bindMobile({
        data: form1,
        success: (data) => {
          vk.alert("绑定成功");
        }
      });
    },
    // 解绑手机
    unbindMobile() {
      let that = this;
      var form1 = that.form1;
      vk.userCenter.unbindMobile({
        data: form1,
        success: (data) => {
          vk.alert("解绑成功");
        }
      });
    },
    // 手机验证码充值账号密码
    resetPasswordByMobile() {
      let that = this;
      var form1 = that.form1;
      vk.userCenter.resetPasswordByMobile({
        data: form1,
        success: (data) => {
          vk.alert("密码重置成功,新密码为:" + form1.password);
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.form1.mobile,
    b: common_vendor.o(($event) => $data.form1.mobile = $event.detail.value),
    c: $data.form1.code,
    d: common_vendor.o(($event) => $data.form1.code = $event.detail.value),
    e: common_vendor.t($data.form1.code),
    f: common_vendor.o(($event) => $options.sendSmsCode("login")),
    g: common_vendor.o(($event) => $options.setVerifyCode("login")),
    h: common_vendor.o((...args) => $options.loginBySms && $options.loginBySms(...args)),
    i: common_vendor.o(($event) => $options.sendSmsCode("bind")),
    j: common_vendor.o(($event) => $options.setVerifyCode("bind")),
    k: common_vendor.o((...args) => $options.bindMobile && $options.bindMobile(...args)),
    l: common_vendor.o(($event) => $options.sendSmsCode("unbind")),
    m: common_vendor.o(($event) => $options.setVerifyCode("unbind")),
    n: common_vendor.o((...args) => $options.unbindMobile && $options.unbindMobile(...args)),
    o: common_vendor.o(($event) => $options.sendSmsCode("reset-pwd")),
    p: common_vendor.o(($event) => $options.setVerifyCode("reset-pwd")),
    q: common_vendor.o((...args) => $options.resetPasswordByMobile && $options.resetPasswordByMobile(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-d2b54625"]]);
wx.createPage(MiniProgramPage);
