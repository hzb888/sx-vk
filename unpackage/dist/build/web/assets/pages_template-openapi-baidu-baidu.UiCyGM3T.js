import{n as e,c as s,w as a,i as t,o as i,b as n,a as d,t as c,d as l,h as o}from"./index-CI1WKL_Z.js";import{_ as u}from"./_plugin-vue_export-helper.BCo6x5W8.js";var p=uni.vk;const r=u({data:()=>({data:{}}),onLoad(e){p=uni.vk,this.options=e,this.init(e)},methods:{init(e){},business_license(){let s=this;e({count:1,sizeType:["compressed"],success:e=>{let a=e.tempFiles[0];p.openapi.baidu.open.ocr.business_license({title:"识别中...",data:{file:a},success:e=>{s.data=e},fail:e=>{s.data=e}})}})},idcard(){let s=this;e({count:1,sizeType:["compressed"],success:e=>{let a=e.tempFiles[0];p.openapi.baidu.open.ocr.idcard({title:"识别中...",data:{file:a},success:e=>{s.data=e}})}})}}},[["render",function(e,u,p,r,f,_){const m=l,h=o,b=t;return i(),s(b,{class:"content"},{default:a((()=>[n(m,{type:"default",onClick:_.business_license},{default:a((()=>[d("营业执照识别")])),_:1},8,["onClick"]),n(m,{type:"default",onClick:_.idcard},{default:a((()=>[d("身份证识别")])),_:1},8,["onClick"]),n(b,null,{default:a((()=>[n(h,{space:"ensp"},{default:a((()=>[d(c(JSON.stringify(f.data,null,2)),1)])),_:1})])),_:1})])),_:1})}],["__scopeId","data-v-f5f99cd6"]]);export{r as default};
