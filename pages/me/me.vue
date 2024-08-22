<template>
    <div>我的页面</div>
    {{ vk.getVuex("$user.test") }}
</template>

<script>
let vk = uni.vk;
</script>
