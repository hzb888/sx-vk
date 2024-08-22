import{z as e,A as t,B as n,o as s,c as r,w as i,b as a,C as o,D as l,a as c,t as h,i as u}from"./index-CI1WKL_Z.js";import{_ as m}from"./_plugin-vue_export-helper.BCo6x5W8.js";const g={"zh-Hans":{startText:"获取验证码",changeText:"X秒重新获取",endText:"重新获取",tryAgainInSeconds:"秒后再重试",pleaseEnterTheCorrectMobileNumber:"请输入正确的手机号码",sending:"发送中...",verificationCodeSent:"验证码已发送",triggerDayLevelFlowControl:"触发天级流控",pleaseTryAgainTomorrow:"短信发送频繁，请明日再试！",pleaseTryAgainIn1Hour:"短信发送频繁，请过1小时后再试！",triggerMinuteLevelFlowControl:"触发分钟级流控",pleaseTryAgainLater:"短信发送频繁，请稍后再试！"},"zh-Hant":{startText:"獲取驗證碼",changeText:"X秒重新獲取",endText:"重新獲取",tryAgainInSeconds:"秒後再重試",pleaseEnterTheCorrectMobileNumber:"請輸入正確的手機號碼",sending:"發送中...",verificationCodeSent:"驗證碼已發送",triggerDayLevelFlowControl:"觸發天級流控",pleaseTryAgainTomorrow:"短信發送頻繁，請明日再試！",pleaseTryAgainIn1Hour:"短信發送頻繁，請過1小時後再試！",triggerMinuteLevelFlowControl:"觸發分鐘級流控",pleaseTryAgainLater:"短信發送頻繁，請稍後再試！"},en:{startText:"Get code",changeText:"X second reacquire",endText:"Reacquire",tryAgainInSeconds:"Try again in seconds",pleaseEnterTheCorrectMobileNumber:"Please enter the correct mobile number",sending:"Sending...",verificationCodeSent:"Verification code sent",triggerDayLevelFlowControl:"Trigger day level flow control",pleaseTryAgainTomorrow:"SMS sent frequently, please try again tomorrow!",pleaseTryAgainIn1Hour:"SMS sent frequently, please try again in 1 hour",triggerMinuteLevelFlowControl:"Trigger minute level flow control",pleaseTryAgainLater:"SMS sent frequently, please try again later"}};const d=m({name:"vk-data-verification-code",emits:["start","end","change","send","codeChange","error","success"],props:{mode:{type:String,default:"mobile"},mobile:{type:String},type:{type:String,default:"login"},customStyle:{type:[String,Object]},seconds:{type:[String,Number],default:60},startText:{type:String,default:""},changeText:{type:String,default:""},endText:{type:String,default:""},keepRunning:{type:Boolean,default:!1},uniqueKey:{type:String,default:""},checkUserExist:{type:Boolean,default:!1}},data(){return{secNum:this.seconds,timer:null,canGetCode:!0,tips:"",locale:{}}},created(){if("undefined"!=typeof vk){let e=vk.pubfn.getLocale();this.locale=g[e]}else this.locale=g["zh-Hans"]},mounted(){this.checkKeepRunning()},watch:{seconds:{immediate:!0,handler(e){this.secNum=e}}},computed:{startTextCom(){return this.startText||this.locale.startText||"获取验证码"},changeTextCom(){return this.changeText||this.locale.changeText||"X秒重新获取"},endTextCom(){return this.endText||this.locale.endText||"重新获取"}},methods:{checkKeepRunning(){let n=Number(e(this.uniqueKey+"_$uCountDownTimestamp"));if(!n)return this.changeEvent(this.startTextCom);let s=Math.floor(+new Date/1e3);this.keepRunning&&n&&n>s?(this.secNum=n-s,t(this.uniqueKey+"_$uCountDownTimestamp"),this.start()):this.changeEvent(this.startTextCom)},start(){this.timer&&(clearInterval(this.timer),this.timer=null),this.$emit("start"),this.canGetCode=!1,this.changeEvent(this.changeTextCom.replace(/x|X/,this.secNum)),this.setTimeToStorage(),this.timer=setInterval((()=>{--this.secNum?this.changeEvent(this.changeTextCom.replace(/x|X/,this.secNum)):(clearInterval(this.timer),this.timer=null,this.changeEvent(this.endTextCom),this.secNum=this.seconds,this.$emit("end"),this.canGetCode=!0)}),1e3)},reset(e){this.canGetCode=!0,clearInterval(this.timer),this.secNum=this.seconds,this.changeEvent(e||this.endTextCom)},changeEvent(e){this.codeChange(e),this.$emit("change",e)},setTimeToStorage(){if(this.keepRunning&&this.timer&&this.secNum>0&&this.secNum<=this.seconds){let e=Math.floor(+new Date/1e3);n({key:this.uniqueKey+"_$uCountDownTimestamp",data:e+Number(this.secNum)})}},codeChange(e){this.tips=e,this.$emit("codeChange",e)},sendSmsCode(){let e=this,t=uni.vk,{mobile:n,type:s,canGetCode:r,checkUserExist:i,secNum:a,mode:o}=e;r?"custom"!==o?t.pubfn.test(n,"mobile")?(e.tips=e.locale.sending,t.userCenter.sendSmsCode({needAlert:!1,data:{mobile:n,type:s,checkUserExist:i},success:function(n){t.toast(e.locale.verificationCodeSent),e.start(),e.$emit("success",n)},fail:function(n){e.tips=e.startTextCom,n.errMsg&&n.errMsg.indexOf("触发天级流控")>-1?t.alert(e.locale.pleaseTryAgainTomorrow,(()=>{e.$emit("error",n)})):n.errMsg&&n.errMsg.indexOf("触发小时级流控")>-1?t.alert(e.locale.pleaseTryAgainIn1Hour,(()=>{e.$emit("error",n)})):n.errMsg&&n.errMsg.indexOf("触发分钟级流控")>-1?t.alert(e.locale.pleaseTryAgainLater,(()=>{e.$emit("error",n)})):n.msg?t.alert(n.msg,(()=>{e.$emit("error",n)})):t.alert(e.locale.pleaseTryAgainLater,(()=>{e.$emit("error",n)}))}})):t.toast(e.locale.pleaseEnterTheCorrectMobileNumber,"none"):e.$emit("send",{type:s}):t.toast(`${a}${e.locale.tryAgainInSeconds}`,"none")}},beforeUnmount(){this.setTimeToStorage(),clearTimeout(this.timer),this.timer=null}},[["render",function(e,t,n,m,g,d){const p=u;return s(),r(p,{class:"vk-data-verification-code"},{default:i((()=>[a(p,{onClick:d.sendSmsCode,style:o(n.customStyle)},{default:i((()=>[l(e.$slots,"default",{tips:g.tips,secNum:g.secNum},(()=>[c(h(g.tips),1)]))])),_:3},8,["onClick","style"])])),_:3})}]]);function p(e,t){return"string"==typeof e?t:e}export{d as _,p as r};
