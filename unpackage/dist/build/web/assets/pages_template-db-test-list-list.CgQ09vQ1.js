import{s as e,f as a,c as t,w as s,i as o,o as l,b as i,a as n,t as d,g as r,e as c,r as u,F as m,h}from"./index-CI1WKL_Z.js";import{_ as g}from"./_plugin-vue_export-helper.BCo6x5W8.js";var p=uni.vk;const f=g({data:()=>({action:"template/db_api/pub/getList",data:{list:[],pageKey:!0,loadmore:"loading"},form1:{addTime:"",endTime:"",searchvalue:"",pageIndex:1,pageSize:10},scrollTop:0}),onPageScroll(e){this.scrollTop=e.scrollTop},onLoad(e={}){p=uni.vk,this.options=e,this.init(e)},onReady(){},onShow(){},onHide(){},onPullDownRefresh(){setTimeout((()=>{e()}),1e3)},onReachBottom(e){this.nextPage()},onResize(){},onShareAppMessage(e){},methods:{init(e){console.log("init: ",e),this.getList({success:()=>{}})},pageTo(e){p.navigateTo(e)},getList(e={}){p.pubfn.getListData({that:this,url:this.action,success:e.success})},nextPage(){let e=this;"loadmore"==e.data.loadmore&&(e.data.loadmore="loading",e.form1.pageIndex++,e.getList())},onSearch(e){let a=this;console.log("搜索",a.form1.searchvalue),a.form1.pageIndex=1,a.data.pageKey=!0,a.getList()},itemBtn(e){console.log("点击",e),p.toast("点击"+e._id.substring(20))}},computed:{}},[["render",function(e,g,p,f,_,v){const x=a("u-search"),y=o,b=h,k=a("u-empty"),L=a("u-loadmore");return l(),t(y,{class:"app"},{default:s((()=>[i(y,{class:"vk-list-view"},{default:s((()=>[i(y,{class:"list-head"},{default:s((()=>[i(y,{class:"list-search"},{default:s((()=>[i(x,{placeholder:"输入金额搜索",modelValue:_.form1.searchvalue,"onUpdate:modelValue":g[0]||(g[0]=e=>_.form1.searchvalue=e),"show-action":!1,"input-align":"center",shape:"square",onSearch:v.onSearch,onClear:v.onSearch},null,8,["modelValue","onSearch","onClear"])])),_:1}),i(y,{class:"list-head-desc-text"},{default:s((()=>[n(" 共 "),i(b,{class:"list-head-text-num"},{default:s((()=>[n(d(_.data.total),1)])),_:1}),n(" 条记录 ")])),_:1})])),_:1}),0==_.data.list.length?(l(),t(y,{key:0,style:{padding:"40% 0 80% 0"}},{default:s((()=>[i(k,{text:"暂无内容",mode:"list"})])),_:1})):r("",!0),_.data.list.length>0?(l(),t(y,{key:1,class:"list-view my-list-view"},{default:s((()=>[(l(!0),c(m,null,u(_.data.list,((e,a)=>(l(),t(y,{key:e._id},{default:s((()=>[i(y,{onClick:a=>v.itemBtn(e),style:{display:"block",height:"200rpx","background-color":"#FFFFFF",margin:"20rpx"}},{default:s((()=>[n(d(a+1)+": {_id: "+d(e._id.substring(20))+", money: "+d(e.money)+"} 此处为你自己写的UI样式 ",1)])),_:2},1032,["onClick"])])),_:2},1024)))),128)),i(L,{status:_.data.loadmore,"bg-color":"#f8f8f8","margin-bottom":"30",onLoadmore:v.nextPage},null,8,["status","onLoadmore"])])),_:1})):r("",!0)])),_:1})])),_:1})}],["__scopeId","data-v-c9aadf22"]]);export{f as default};
