"use strict";
const common_vendor = require("../../../common/vendor.js");
common_vendor.index.vk;
const _sfc_main = {
  data() {
    return {
      show: false,
      form: {
        name: "",
        intro: ""
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入姓名",
            // 可以单个或者同时写两个触发验证方式
            trigger: ["change", "blur"]
          }
        ],
        intro: [
          {
            required: true,
            message: "请输入简介",
            // 可以单个或者同时写两个触发验证方式
            trigger: ["change", "blur"]
          },
          {
            min: 5,
            message: "简介不能少于5个字",
            trigger: "change"
          }
        ]
      }
    };
  },
  onPageScroll(e) {
    this.scrollTop = e.scrollTop;
  },
  onLoad(options) {
    common_vendor.index.vk;
  },
  onReady() {
    this.$refs.uForm.setRules(this.rules);
  },
  methods: {
    click(e) {
      console.log(e);
    },
    change(index) {
      this.current = index;
    },
    submit() {
      this.$refs.uForm.validate((valid) => {
        if (valid) {
          console.log("验证通过");
        } else {
          console.log("验证失败");
        }
      });
    }
  }
};
if (!Array) {
  const _component_u_input = common_vendor.resolveComponent("u-input");
  const _component_u_form_item = common_vendor.resolveComponent("u-form-item");
  const _component_u_form = common_vendor.resolveComponent("u-form");
  const _component_u_button = common_vendor.resolveComponent("u-button");
  (_component_u_input + _component_u_form_item + _component_u_form + _component_u_button)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $data.form.name = $event),
    b: common_vendor.p({
      modelValue: $data.form.name
    }),
    c: common_vendor.p({
      label: "姓名",
      prop: "name"
    }),
    d: common_vendor.o(($event) => $data.form.intro = $event),
    e: common_vendor.p({
      modelValue: $data.form.intro
    }),
    f: common_vendor.p({
      label: "简介",
      prop: "intro"
    }),
    g: common_vendor.sr("uForm", "27126203-0"),
    h: common_vendor.p({
      model: $data.form
    }),
    i: common_vendor.o($options.submit),
    j: common_vendor.o(($event) => $data.show = true)
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-27126203"]]);
_sfc_main.__runtimeHooks = 1;
wx.createPage(MiniProgramPage);
