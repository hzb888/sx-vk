import{n as e,c as a,w as s,i as t,o,b as i,a as n,t as c,d as l,h as p}from"./index-CI1WKL_Z.js";import{_ as u}from"./_plugin-vue_export-helper.BCo6x5W8.js";var d=uni.vk;const r=u({data:()=>({data:{},form1:{}}),onLoad(e={}){d=uni.vk,this.options=e,this.init(e)},methods:{init(e){},chooseImage(){let a=this;e({count:1,sizeType:["compressed"],success:e=>{let s=e.tempFiles[0];d.pubfn.fileToBase64({file:s}).then((e=>{if(s.size/1024/1024>1)return d.toast("图片不能大于1M","none"),!1;d.callFunction({url:"template/openapi/qq/pub/imgSecCheck",title:"检测中...",data:{base64:e},success:e=>{a.data=e},fail:e=>{a.data=e,d.toast(e.msg,"none")}})}))}})}},computed:{}},[["render",function(e,u,d,r,f,m){const h=l,_=p,g=t;return o(),a(g,{class:"app"},{default:s((()=>[i(h,{onClick:m.chooseImage},{default:s((()=>[n("上传图片,并检测图片是否违规")])),_:1},8,["onClick"]),i(_,{space:"ensp"},{default:s((()=>[n(c(JSON.stringify(f.data,null,2)),1)])),_:1})])),_:1})}],["__scopeId","data-v-2f02e376"]]);export{r as default};
