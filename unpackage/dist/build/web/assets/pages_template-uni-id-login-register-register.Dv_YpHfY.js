import{s as e,p as o,u as a,c as l,w as s,i as t,o as r,b as n,a as c,k as d,I as m,d as i,v as p,h as u,x as f,y as g,q as h}from"./index-CI1WKL_Z.js";import{r as b,_}from"./uni-app.es.CDievr-Z.js";import{_ as y}from"./_plugin-vue_export-helper.BCo6x5W8.js";var v=uni.vk;const w=y({data:()=>({data:{},form1:{agreement:!0,mobile:"",password:"",password2:"",code:"",type:"register"},scrollTop:0,isRotate:!1,logoImage:"/static/logo.png"}),onPageScroll(e){this.scrollTop=e.scrollTop},onLoad(e){v=uni.vk,this.init(e)},onReady(){},onShow(){},onHide(){},onPullDownRefresh(){setTimeout((()=>{e()}),1e3)},onShareAppMessage(e){},methods:{init(e={}){console.log("init: ",e)},pageTo(e){v.navigateTo(e)},checkboxChange(e){let o=this,a=e.detail.value||[];a.length>0&&a[0]?o.form1.agreement=!0:o.form1.agreement=!1},loginBySms(){let e=this;if(e.isRotate)return!1;const{agreement:a,mobile:l,code:s,password:t,password2:r}=e.form1;a?v.pubfn.test(l,"mobile")?v.pubfn.test(t,"pwd")&&v.pubfn.test(r,"pwd")?t==r?v.pubfn.test(s,"mobileCode")?(e.isRotate=!0,v.userCenter.loginBySms({data:e.form1,success:a=>{e.isRotate=!1,"login"==a.type?v.toast("登录成功!"):v.toast("注册成功!"),setTimeout((()=>{o().length>1?v.navigateBack():v.navigateToHome()}),1e3)},complete:()=>{e.isRotate=!1}})):v.toast("验证码格式为6位数字","none"):v.toast("两次密码必须相同!","none"):v.toast("密码以字母开头，长度在6~18之间，只能包含字母、数字和下划线","none"):v.toast("请输入正确的手机号码","none"):v.toast("请阅读并同意用户服务及隐私协议","none")}},computed:{}},[["render",function(e,o,y,v,w,k){const V=d,x=t,C=m,T=b(a("vk-data-verification-code"),_),R=i,S=p,B=u,I=f,U=g,j=h;return r(),l(x,{class:"app register"},{default:s((()=>[n(x,{class:"content"},{default:s((()=>[n(x,{class:"header"},{default:s((()=>[n(V,{class:"logo",src:w.logoImage},null,8,["src"])])),_:1}),n(x,{class:"form-view"},{default:s((()=>[n(x,{class:"form-item form-border"},{default:s((()=>[n(C,{class:"form-input",modelValue:w.form1.mobile,"onUpdate:modelValue":o[0]||(o[0]=e=>w.form1.mobile=e),type:"text",maxlength:11,placeholder:"手机号","placeholder-style":"'color':'#8e8e8e'"},null,8,["modelValue"])])),_:1}),n(x,{class:"form-item form-border"},{default:s((()=>[n(C,{class:"form-input",modelValue:w.form1.password,"onUpdate:modelValue":o[1]||(o[1]=e=>w.form1.password=e),type:"password",placeholder:"请输入新密码","placeholder-style":"'color':'#8e8e8e'"},null,8,["modelValue"])])),_:1}),n(x,{class:"form-item form-border"},{default:s((()=>[n(C,{class:"form-input",modelValue:w.form1.password2,"onUpdate:modelValue":o[2]||(o[2]=e=>w.form1.password2=e),type:"password",placeholder:"请再次输入新密码","placeholder-style":"'color':'#8e8e8e'"},null,8,["modelValue"])])),_:1}),n(x,{class:"form-item form-border"},{default:s((()=>[n(C,{class:"form-input",modelValue:w.form1.code,"onUpdate:modelValue":o[3]||(o[3]=e=>w.form1.code=e),type:"number",maxlength:6,placeholder:"请输入验证码","placeholder-style":"'color':'#8e8e8e'"},null,8,["modelValue"]),n(T,{seconds:"60",mobile:w.form1.mobile,type:"register","custom-style":"font-size: 28rpx;"},null,8,["mobile"])])),_:1})])),_:1}),n(x,{class:"login-btn"},{default:s((()=>[n(R,{class:"btn success circle","hover-class":"hover",shape:"circle",onClick:k.loginBySms,plain:!1,"hair-line":!1,type:"success"},{default:s((()=>[c("注 册")])),_:1},8,["onClick"])])),_:1}),n(x,{class:"footer"},{default:s((()=>[n(U,null,{default:s((()=>[n(I,{onChange:k.checkboxChange},{default:s((()=>[n(S,{class:"footer-checkbox",value:"true",checked:w.form1.agreement,"active-color":"#737373",shape:"circle"},null,8,["checked"]),n(B,null,{default:s((()=>[c("同意")])),_:1})])),_:1},8,["onChange"])])),_:1}),n(j,{url:"","open-type":"navigate",style:{color:"#007AFF"}},{default:s((()=>[c("《用户协议》")])),_:1})])),_:1})])),_:1})])),_:1})}],["__scopeId","data-v-efec6cee"]]);export{w as default};
