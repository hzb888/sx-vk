import{n as e,c as a,w as s,i as t,o,b as i,a as n,t as c,d as l,h as d}from"./index-CI1WKL_Z.js";import{_ as p}from"./_plugin-vue_export-helper.BCo6x5W8.js";var u=uni.vk;const r=p({data:()=>({data:{},form1:{}}),onLoad(e={}){u=uni.vk,this.options=e,this.init(e)},methods:{init(e){},chooseImage(){let a=this;e({count:1,sizeType:["compressed"],success:e=>{let s=e.tempFiles[0];u.pubfn.fileToBase64({file:s}).then((e=>{if(s.size/1024/1024>1)return u.toast("图片不能大于1M","none"),!1;u.callFunction({url:"template/openapi/douyin/pub/imgSecCheck",title:"检测中...",data:{base64:e},success:e=>{a.data=e},fail:e=>{a.data=e,u.toast(e.msg,"none")}})}))}})}},computed:{}},[["render",function(e,p,u,r,f,m){const h=l,_=d,g=t;return o(),a(g,{class:"app"},{default:s((()=>[i(h,{onClick:m.chooseImage},{default:s((()=>[n("上传图片,并检测图片是否违规")])),_:1},8,["onClick"]),i(_,{space:"ensp"},{default:s((()=>[n(c(JSON.stringify(f.data,null,2)),1)])),_:1})])),_:1})}],["__scopeId","data-v-15d0c9c6"]]);export{r as default};
