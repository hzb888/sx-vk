"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_wotDesignUni_components_common_util = require("../common/util.js");
const uni_modules_wotDesignUni_components_wdTransition_types = require("./types.js");
const uni_modules_wotDesignUni_components_common_AbortablePromise = require("../common/AbortablePromise.js");
const __default__ = {
  name: "wd-transition",
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: "shared"
  }
};
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  ...__default__,
  props: uni_modules_wotDesignUni_components_wdTransition_types.transitionProps,
  emits: ["click", "before-enter", "enter", "before-leave", "leave", "after-leave", "after-enter"],
  setup(__props, { emit: __emit }) {
    const getClassNames = (name) => {
      if (!name) {
        return {
          enter: `${props.enterClass} ${props.enterActiveClass}`,
          "enter-to": `${props.enterToClass} ${props.enterActiveClass}`,
          leave: `${props.leaveClass} ${props.leaveActiveClass}`,
          "leave-to": `${props.leaveToClass} ${props.leaveActiveClass}`
        };
      }
      return {
        enter: `wd-${name}-enter wd-${name}-enter-active`,
        "enter-to": `wd-${name}-enter-to wd-${name}-enter-active`,
        leave: `wd-${name}-leave wd-${name}-leave-active`,
        "leave-to": `wd-${name}-leave-to wd-${name}-leave-active`
      };
    };
    const props = __props;
    const emit = __emit;
    const inited = common_vendor.ref(false);
    const display = common_vendor.ref(false);
    const status = common_vendor.ref("");
    const transitionEnded = common_vendor.ref(false);
    const currentDuration = common_vendor.ref(300);
    const classes = common_vendor.ref("");
    const enterPromise = common_vendor.ref(null);
    const enterLifeCyclePromises = common_vendor.ref(null);
    const leaveLifeCyclePromises = common_vendor.ref(null);
    const style = common_vendor.computed(() => {
      return `-webkit-transition-duration:${currentDuration.value}ms;transition-duration:${currentDuration.value}ms;${display.value ? "" : "display: none;"}${props.customStyle}`;
    });
    const rootClass = common_vendor.computed(() => {
      return `wd-transition ${props.customClass}  ${classes.value}`;
    });
    common_vendor.onBeforeMount(() => {
      if (props.show) {
        enter();
      }
    });
    common_vendor.watch(
      () => props.show,
      (newVal) => {
        handleShow(newVal);
      },
      { deep: true }
    );
    function handleClick() {
      emit("click");
    }
    function handleShow(value) {
      if (value) {
        handleAbortPromise();
        enter();
      } else {
        leave();
      }
    }
    function handleAbortPromise() {
      uni_modules_wotDesignUni_components_common_util.isPromise(enterPromise.value) && enterPromise.value.abort();
      uni_modules_wotDesignUni_components_common_util.isPromise(enterLifeCyclePromises.value) && enterLifeCyclePromises.value.abort();
      uni_modules_wotDesignUni_components_common_util.isPromise(leaveLifeCyclePromises.value) && leaveLifeCyclePromises.value.abort();
      enterPromise.value = null;
      enterLifeCyclePromises.value = null;
      leaveLifeCyclePromises.value = null;
    }
    function enter() {
      enterPromise.value = new uni_modules_wotDesignUni_components_common_AbortablePromise.AbortablePromise(async (resolve) => {
        try {
          const classNames = getClassNames(props.name);
          const duration = uni_modules_wotDesignUni_components_common_util.isObj(props.duration) ? props.duration.enter : props.duration;
          status.value = "enter";
          emit("before-enter");
          enterLifeCyclePromises.value = uni_modules_wotDesignUni_components_common_util.requestAnimationFrame();
          await enterLifeCyclePromises.value;
          emit("enter");
          classes.value = classNames.enter;
          currentDuration.value = duration;
          enterLifeCyclePromises.value = uni_modules_wotDesignUni_components_common_util.requestAnimationFrame();
          await enterLifeCyclePromises.value;
          inited.value = true;
          display.value = true;
          enterLifeCyclePromises.value = uni_modules_wotDesignUni_components_common_util.requestAnimationFrame();
          await enterLifeCyclePromises.value;
          enterLifeCyclePromises.value = null;
          transitionEnded.value = false;
          classes.value = classNames["enter-to"];
          resolve();
        } catch (error) {
        }
      });
    }
    async function leave() {
      if (!enterPromise.value) {
        transitionEnded.value = false;
        return onTransitionEnd();
      }
      try {
        await enterPromise.value;
        if (!display.value)
          return;
        const classNames = getClassNames(props.name);
        const duration = uni_modules_wotDesignUni_components_common_util.isObj(props.duration) ? props.duration.leave : props.duration;
        status.value = "leave";
        emit("before-leave");
        currentDuration.value = duration;
        leaveLifeCyclePromises.value = uni_modules_wotDesignUni_components_common_util.requestAnimationFrame();
        await leaveLifeCyclePromises.value;
        emit("leave");
        classes.value = classNames.leave;
        leaveLifeCyclePromises.value = uni_modules_wotDesignUni_components_common_util.requestAnimationFrame();
        await leaveLifeCyclePromises.value;
        transitionEnded.value = false;
        classes.value = classNames["leave-to"];
        leaveLifeCyclePromises.value = setPromise(currentDuration.value);
        await leaveLifeCyclePromises.value;
        leaveLifeCyclePromises.value = null;
        onTransitionEnd();
        enterPromise.value = null;
      } catch (error) {
      }
    }
    function setPromise(duration) {
      return new uni_modules_wotDesignUni_components_common_AbortablePromise.AbortablePromise((resolve) => {
        const timer = setTimeout(() => {
          clearTimeout(timer);
          resolve();
        }, duration);
      });
    }
    function onTransitionEnd() {
      if (transitionEnded.value)
        return;
      transitionEnded.value = true;
      if (status.value === "leave") {
        emit("after-leave");
      } else if (status.value === "enter") {
        emit("after-enter");
      }
      if (!props.show && display.value) {
        display.value = false;
      }
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: inited.value
      }, inited.value ? {
        b: common_vendor.n(rootClass.value),
        c: common_vendor.s(style.value),
        d: common_vendor.o(onTransitionEnd),
        e: common_vendor.o(handleClick)
      } : {});
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-af59a128"]]);
wx.createComponent(Component);
