"use strict";
const common_vendor = require("../../common/vendor.js");
const vk = common_vendor.index.vk;
const _sfc_main = {
  data() {
    return {
      // init请求返回的数据
      data: {},
      show: false,
      // 表单请求数据
      form1: {},
      scrollTop: 0
    };
  },
  onPageScroll(e) {
    this.scrollTop = e.scrollTop;
  },
  // 监听 - 页面每次【加载时】执行(如：前进)
  onLoad(options = {}) {
    vk = common_vendor.index.vk;
    this.options = options;
    this.init(options);
  },
  // 监听 - 页面【首次渲染完成时】执行。注意如果渲染速度快，会在页面进入动画完成前触发
  onReady() {
  },
  // 监听 - 页面每次【显示时】执行(如：前进和返回) (页面每次出现在屏幕上都触发，包括从下级页面点返回露出当前页面)
  onShow() {
  },
  // 监听 - 页面每次【隐藏时】执行(如：返回)
  onHide() {
  },
  // 监听 - 点击右上角转发时
  onShareAppMessage(options) {
  },
  // 函数
  methods: {
    // 页面数据初始化函数
    init(options) {
    },
    pageTo(path) {
    },
    test() {
      console.log("test");
      console.log(vk.getVuex("$user.test"));
      common_vendor.index.vk.setVuex("$user.test", "dnasjkjjdhaskj");
    }
  },
  // 监听器
  watch: {},
  // 计算属性
  computed: {
    // ...mapState("systemState", ["systemEnv", "classTimeData"]),
    // ...mapState("markState", ["noticeMsgMark"]),
  }
};
if (!Array) {
  const _easycom_wd_button2 = common_vendor.resolveComponent("wd-button");
  const _easycom_wd_overlay2 = common_vendor.resolveComponent("wd-overlay");
  (_easycom_wd_button2 + _easycom_wd_overlay2)();
}
const _easycom_wd_button = () => "../../uni_modules/wot-design-uni/components/wd-button/wd-button.js";
const _easycom_wd_overlay = () => "../../uni_modules/wot-design-uni/components/wd-overlay/wd-overlay.js";
if (!Math) {
  (_easycom_wd_button + _easycom_wd_overlay)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t(_ctx.vk.getVuex("$user.test")),
    b: common_vendor.o((...args) => $options.test && $options.test(...args)),
    c: common_vendor.o(($event) => $data.show = true),
    d: common_vendor.p({
      type: "primary"
    }),
    e: common_vendor.o(($event) => $data.show = false),
    f: common_vendor.p({
      show: $data.show
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
_sfc_main.__runtimeHooks = 3;
wx.createPage(MiniProgramPage);
