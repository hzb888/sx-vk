import{n as e,f as t,c as a,w as s,i as l,o as r,b as c,g as n,a as o,d as i,I as u}from"./index-CI1WKL_Z.js";import{_ as d}from"./_plugin-vue_export-helper.BCo6x5W8.js";var f=uni.vk;const p=d({data:()=>({form1:{inviteCode:""},avatar:""}),onLoad(e){f=uni.vk},methods:{setAvatar(){let e=this,t="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1594798658581&di=bcd5486940ad88cf88a904f411c53e94&imgtype=0&src=http%3A%2F%2Fn.sinaimg.cn%2Fsinacn15%2F600%2Fw1920h1080%2F20180505%2Fad66-hacuuvt5802647.jpg";e.form1,f.userCenter.setAvatar({data:{avatar:t},success:a=>{e.avatar=t,f.alert("设置成功")}})},updateUser(){this.form1,f.userCenter.updateUser({data:{nickname:"剑圣李白"},success:e=>{f.alert("更新成功")}})},getMyUserInfo(){this.form1,f.userCenter.getCurrentUserInfo({success:e=>{f.alert(JSON.stringify(e.userInfo))}})},checkToken(){f.userCenter.checkToken({success:e=>{f.alert("token有效")}})},logout(){f.userCenter.logout({success:e=>{f.alert("退出成功")}})},setUserInviteCode(){f.userCenter.setUserInviteCode({success:e=>{f.alert(e.msg)}})},acceptInvite(){var e=this.form1;e.inviteCode?f.userCenter.acceptInvite({data:e,success:e=>{f.alert("接受邀请成功")}}):f.alert("请填写邀请码")},uploadAvatar(){let t=this;e({count:1,sizeType:["compressed"],success:e=>{f.uploadFile({title:"上传中...",filePath:e.tempFilePaths[0],fileType:"image",success:e=>{f.userCenter.setAvatar({data:{avatar:e.url,deleteOldFile:!0},success:()=>{t.avatar=e.url}})}})}})}}},[["render",function(e,d,f,p,C,v){const k=t("u-avatar"),m=l,g=i,y=u;return r(),a(m,{class:"content"},{default:s((()=>[c(m,{style:{"text-align":"center"}},{default:s((()=>[C.avatar?(r(),a(k,{key:0,src:C.avatar,size:"140"},null,8,["src"])):n("",!0)])),_:1}),c(g,{type:"default",onClick:v.setAvatar},{default:s((()=>[o("直接设置头像")])),_:1},8,["onClick"]),c(g,{type:"default",onClick:v.uploadAvatar},{default:s((()=>[o("上传到云储存(并设置为头像)")])),_:1},8,["onClick"]),c(g,{type:"default",onClick:v.updateUser},{default:s((()=>[o("更新用户信息")])),_:1},8,["onClick"]),c(g,{type:"default",onClick:v.getMyUserInfo},{default:s((()=>[o("获取用户信息")])),_:1},8,["onClick"]),c(g,{type:"default",onClick:v.checkToken},{default:s((()=>[o("token校验")])),_:1},8,["onClick"]),c(g,{type:"default",onClick:v.setUserInviteCode},{default:s((()=>[o("设置邀请码")])),_:1},8,["onClick"]),c(m,{class:"tips"},{default:s((()=>[o("设置邀请码时如果传入邀请码则设置传入的邀请码，如果不传则随机生成6位邀请码")])),_:1}),c(y,{type:"text",modelValue:C.form1.inviteCode,"onUpdate:modelValue":d[0]||(d[0]=e=>C.form1.inviteCode=e),placeholder:"邀请码"},null,8,["modelValue"]),c(g,{type:"default",onClick:v.acceptInvite},{default:s((()=>[o("接受邀请")])),_:1},8,["onClick"]),c(g,{type:"default",onClick:v.logout},{default:s((()=>[o("退出")])),_:1},8,["onClick"])])),_:1})}],["__scopeId","data-v-ef4329ba"]]);export{p as default};
