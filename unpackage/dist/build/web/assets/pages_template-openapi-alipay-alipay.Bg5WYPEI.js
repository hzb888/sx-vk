import{c as e,w as a,i as t,o as s,b as i,a as n,g as l,t as d,d as o,k as p,h as r}from"./index-CI1WKL_Z.js";import{_ as c}from"./_plugin-vue_export-helper.BCo6x5W8.js";var u=uni.vk;const f=c({data:()=>({imageUrl:"",data:{}}),onLoad(e){u=uni.vk,this.options=e,this.init(e)},methods:{init(e){},code2Session(){u.toast("请在支付宝小程序中打开")},getMiniCode(){u.callFunction({url:"template/openapi/alipay/pub/getMiniCode",title:"请求中...",data:{page:"pages/index/index",scene:"a=1&b=2"},success:e=>{this.data=e,this.imageUrl=e.base64}})}}},[["render",function(c,u,f,g,_,h){const m=o,k=p,x=t,y=r;return s(),e(x,{class:"app"},{default:a((()=>[i(m,{type:"default",onClick:h.code2Session},{default:a((()=>[n("code2Session")])),_:1},8,["onClick"]),i(m,{type:"default",onClick:h.getMiniCode},{default:a((()=>[n("生成带参数的小程序码")])),_:1},8,["onClick"]),_.imageUrl?(s(),e(x,{key:0,style:{"text-align":"center"}},{default:a((()=>[i(k,{src:_.imageUrl,style:{width:"400rpx",height:"400rpx"}},null,8,["src"])])),_:1})):l("",!0),i(x,null,{default:a((()=>[i(y,{space:"ensp"},{default:a((()=>[n(d(JSON.stringify(_.data,null,2)),1)])),_:1})])),_:1})])),_:1})}],["__scopeId","data-v-8de505df"]]);export{f as default};
