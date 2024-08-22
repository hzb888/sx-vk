<template>
    <view>
        测试 vuex
        <view>{{ vk.getVuex("$user.test") }}</view>
        <button @click="test">Test</button>
        <wd-button type="primary" @click="show = true">显示遮罩层</wd-button>
        <wd-overlay :show="show" @click="show = false" />
    </view>
</template>

<script>
const vk = uni.vk;
export default {
    data() {
        // 页面数据变量
        return {
            // init请求返回的数据
            data: {},
            show: false,
            // 表单请求数据
            form1: {},
            scrollTop: 0,
        };
    },
    onPageScroll(e) {
        this.scrollTop = e.scrollTop;
    },
    // 监听 - 页面每次【加载时】执行(如：前进)
    onLoad(options = {}) {
        vk = uni.vk;
        this.options = options;
        this.init(options);
    },
    // 监听 - 页面【首次渲染完成时】执行。注意如果渲染速度快，会在页面进入动画完成前触发
    onReady() {},
    // 监听 - 页面每次【显示时】执行(如：前进和返回) (页面每次出现在屏幕上都触发，包括从下级页面点返回露出当前页面)
    onShow() {},
    // 监听 - 页面每次【隐藏时】执行(如：返回)
    onHide() {},
    // 监听 - 点击右上角转发时
    onShareAppMessage(options) {},
    // 函数
    methods: {
        // 页面数据初始化函数
        init(options) {
            // vk.reLaunch("/pages_template/uni-id/index/index");
        },
        pageTo(path) {
            // vk.navigateTo(path);
        },
        test() {
            console.log("test");
            console.log(vk.getVuex("$user.test"));
            uni.vk.setVuex("$user.test", "dnasjkjjdhaskj");
        },
    },
    // 监听器
    watch: {},
    // 计算属性
    computed: {
        // ...mapState("systemState", ["systemEnv", "classTimeData"]),
        // ...mapState("markState", ["noticeMsgMark"]),
    },
};
</script>
<style lang="scss" scoped></style>
