(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-login-login"],{1502:function(t,e,a){t.exports=a.p+"static/img/logo.8e3317cb.png"},"38da":function(t,e,a){"use strict";a.r(e);var s=a("59bc"),o=a.n(s);for(var n in s)"default"!==n&&function(t){a.d(e,t,(function(){return s[t]}))}(n);e["default"]=o.a},"59bc":function(t,e,a){"use strict";var s=a("ee27");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,a("96cf");var o=s(a("c964")),n={data:function(){return{headTitle:"登录",isShow:1,account:"",password:"",account2:"",phone2:"",code2:"",password2:"",surepass2:"",codeName2:"获取验证码",phone3:"",code3:"",password3:"",surepass3:"",codeName3:"获取验证码"}},onLoad:function(t){t.isShow&&(1==t.isShow?this.headTitle="登录":2==t.isShow?this.headTitle="注册":this.headTitle="密码找回",this.isShow=t.isShow)},methods:{goBack:function(){uni.navigateBack({delta:1})},changePart:function(t){uni.redirectTo({url:"../login/login?isShow="+t})},loginBy:function(){var t=this;return(0,o.default)(regeneratorRuntime.mark((function e(){var a,s,o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(a=t,a.account){e.next=5;break}a.showToast("请输入账号名称/手机号"),e.next=18;break;case 5:if(a.password){e.next=9;break}a.showToast("请输入密码"),e.next=18;break;case 9:if(!(a.password&&a.password.length<6)){e.next=13;break}a.showToast("密码不能少于6位"),e.next=18;break;case 13:return s="?phone_num="+a.account+"&password="+a.password,e.next=16,a.$api.commonMethod("/login"+s,"GET");case 16:o=e.sent,200==o.statusCode&&0==o.data.re_code?(a.showToast("登录成功"),uni.setStorageSync("user_id",o.data.data.user_id),uni.setStorageSync("user_name",o.data.data.user_name),uni.setStorageSync("user_phone",o.data.data.user_phone),setTimeout((function(){uni.redirectTo({url:"../mine/my_index"})}),2e3)):a.showToast(o.data.msg);case 18:case"end":return e.stop()}}),e)})))()},getCode:function(t){var e=this;return(0,o.default)(regeneratorRuntime.mark((function a(){var s,o,n,i,r,c,l,u,d;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(s=e,o=/^1[13456789]\d{9}$/,(2!=t||s.phone2)&&(3!=t||s.phone3)){a.next=6;break}s.showToast("请输入手机号码"),a.next=20;break;case 6:if((2!=t||o.test(s.phone2))&&(3!=t||o.test(s.phone3))){a.next=10;break}s.showToast("请输入正确的电话号码"),a.next=20;break;case 10:if(!(2==t&&s.phone2||3==t&&s.phone3)){a.next=20;break}if(n=2==t?s.codeName2:s.codeName3,"获取验证码"!=n){a.next=20;break}return i="",r=0,2==t?(i=s.phone2,r=0):3==t&&(i=s.phone3,r=1),c="?phone_num="+i+"&sms_kind="+r,a.next=18,s.$api.commonMethod("/smscode"+c,"GET");case 18:l=a.sent,200==l.statusCode&&0==l.data.re_code?(s.showToast("验证码发送成功"),u=60,d=setInterval((function(){u-=1,n=u+"S",2==t?s.codeName2=n:s.codeName3=n}),1e3),setTimeout((function(){clearInterval(d),2==t?s.codeName2="获取验证码":s.codeName3="获取验证码"}),6e4)):s.showToast(l.data.msg);case 20:case"end":return a.stop()}}),a)})))()},register:function(){var t=this;return(0,o.default)(regeneratorRuntime.mark((function e(){var a,s,o,n,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(a=t,s=/^[A-Za-z0-9]+$/,o=/^1[13456789]\d{9}$/,a.account2){e.next=7;break}a.showToast("请输入账号名称"),e.next=52;break;case 7:if(!(a.account2.length<8||a.account2.length>12)){e.next=11;break}a.showToast("请输入8-12位的账号名称"),e.next=52;break;case 11:if(!a.account2||s.test(a.account2)){e.next=15;break}a.showToast("账号名称格式不正确"),e.next=52;break;case 15:if(a.phone2){e.next=19;break}a.showToast("请输入手机号码"),e.next=52;break;case 19:if(!a.phone2||o.test(a.phone2)){e.next=23;break}a.showToast("请输入正确的手机号码"),e.next=52;break;case 23:if(a.code2){e.next=27;break}a.showToast("请输入验证码"),e.next=52;break;case 27:if(a.password2){e.next=31;break}a.showToast("请输入密码"),e.next=52;break;case 31:if(!(a.password2&&a.password2.length<6)){e.next=35;break}a.showToast("密码不能少于6位"),e.next=52;break;case 35:if(!a.password2||s.test(a.password2)){e.next=39;break}a.showToast("密码格式不正确"),e.next=52;break;case 39:if(a.surepass2){e.next=43;break}a.showToast("请再次输入密码"),e.next=52;break;case 43:if(a.password2==a.surepass2){e.next=47;break}a.showToast("两次密码不一致"),e.next=52;break;case 47:return n="?name="+a.account2+"&phone_num="+a.phone2+"&code="+a.code2+"&pwd="+a.password2+"&re_pwd="+a.surepass2,e.next=50,a.$api.commonMethod("/register"+n,"GET");case 50:i=e.sent,200==i.statusCode&&0==i.data.re_code?(a.showToast("注册成功，请登录"),setTimeout((function(){uni.redirectTo({url:"../login/login?isShow=1"})}),2e3)):a.showToast(i.data.msg);case 52:case"end":return e.stop()}}),e)})))()},saveData:function(){var t=this;return(0,o.default)(regeneratorRuntime.mark((function e(){var a,s,o,n,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(a=t,s=/^[A-Za-z0-9]+$/,o=/^1[13456789]\d{9}$/,a.phone3){e.next=7;break}a.showToast("请输入手机号码"),e.next=40;break;case 7:if(!a.phone3||o.test(a.phone3)){e.next=11;break}a.showToast("请输入正确的电话号码"),e.next=40;break;case 11:if(a.code3){e.next=15;break}a.showToast("请输入验证码"),e.next=40;break;case 15:if(a.password3){e.next=19;break}a.showToast("请输入密码"),e.next=40;break;case 19:if(!(a.password3&&a.password3.length<6)){e.next=23;break}a.showToast("密码不能少于6位"),e.next=40;break;case 23:if(!a.password3||s.test(a.password3)){e.next=27;break}a.showToast("密码格式不正确"),e.next=40;break;case 27:if(a.surepass3){e.next=31;break}a.showToast("请再次输入密码"),e.next=40;break;case 31:if(a.password3==a.surepass3){e.next=35;break}a.showToast("两次密码不一致"),e.next=40;break;case 35:return n="?phone_num="+a.phone3+"&code="+a.code3+"&new_pwd="+a.password3+"&re_new_pwd="+a.surepass3,e.next=38,a.$api.commonMethod("/reset_pwd"+n,"GET");case 38:i=e.sent,200==i.statusCode&&0==i.data.re_code?(a.showToast("密码已重置，请登录"),setTimeout((function(){uni.redirectTo({url:"../login/login?isShow=1"})}),2e3)):a.showToast(i.data.msg);case 40:case"end":return e.stop()}}),e)})))()},showToast:function(t){uni.showToast({title:t,icon:"none"})}}};e.default=n},9151:function(t,e,a){"use strict";a.r(e);var s=a("bcff"),o=a("38da");for(var n in o)"default"!==n&&function(t){a.d(e,t,(function(){return o[t]}))}(n);a("f22c");var i,r=a("f0c5"),c=Object(r["a"])(o["default"],s["b"],s["c"],!1,null,"aff297b2",null,!1,s["a"],i);e["default"]=c.exports},"94cb":function(t,e,a){var s=a("ee36");"string"===typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);var o=a("4f06").default;o("041b7091",s,!0,{sourceMap:!1,shadowMode:!1})},bcff:function(t,e,a){"use strict";var s,o=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-uni-view",{staticClass:"content"},[s("v-uni-view",{staticClass:"top-part"},[s("v-uni-view",{staticClass:"head-part"},[s("v-uni-image",{staticClass:"return-btn",attrs:{src:a("b4c0"),mode:"aspectFit"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.goBack()}}}),s("v-uni-view",{staticClass:"head-title"},[t._v(t._s(t.headTitle))])],1)],1),s("v-uni-view",{staticClass:"box-part main"},[s("v-uni-image",{staticClass:"login-img",attrs:{src:a("3522"),mode:"aspectFit"}}),1==t.isShow?s("v-uni-view",{staticClass:"info-part"},[s("v-uni-view",{staticClass:"row-item"},[s("v-uni-image",{staticClass:"row-img",attrs:{src:a("5029"),mode:"aspectFit"}}),s("v-uni-input",{staticClass:"row-input",attrs:{type:"text",placeholder:"账号名称/手机号","placeholder-class":"pla-class"},model:{value:t.account,callback:function(e){t.account=e},expression:"account"}})],1),s("v-uni-view",{staticClass:"row-item"},[s("v-uni-image",{staticClass:"row-img",attrs:{src:a("ba6f"),mode:"aspectFit"}}),s("v-uni-input",{staticClass:"row-input",attrs:{type:"password",maxlength:"12",placeholder:"密码","placeholder-class":"pla-class"},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}})],1),s("v-uni-view",{staticClass:"bottom-btn",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.loginBy()}}},[t._v("登录")]),s("v-uni-view",{staticClass:"bottom-row"},[s("v-uni-view",{staticClass:"row-des des-left",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.changePart(2)}}},[t._v("没有账号，我要注册")]),s("v-uni-view",{staticClass:"row-des des-right",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.changePart(3)}}},[t._v("忘记密码")])],1)],1):t._e(),2==t.isShow?s("v-uni-view",{staticClass:"info-part"},[s("v-uni-view",{staticClass:"row-item"},[s("v-uni-image",{staticClass:"row-img",attrs:{src:a("5029"),mode:"aspectFit"}}),s("v-uni-input",{staticClass:"row-input",attrs:{type:"text",placeholder:"请输入8-12位数字字母组合的账号名称","placeholder-class":"pla-class"},model:{value:t.account2,callback:function(e){t.account2=e},expression:"account2"}})],1),s("v-uni-view",{staticClass:"row-item"},[s("v-uni-image",{staticClass:"row-img",attrs:{src:a("6af9"),mode:"aspectFit"}}),s("v-uni-input",{staticClass:"row-input",attrs:{type:"number",maxlength:"11",placeholder:"请输入手机号码","placeholder-class":"pla-class"},model:{value:t.phone2,callback:function(e){t.phone2=e},expression:"phone2"}})],1),s("v-uni-view",{staticClass:"row-item"},[s("v-uni-image",{staticClass:"row-img",attrs:{src:a("dd26"),mode:"aspectFit"}}),s("v-uni-input",{staticClass:"row-input",staticStyle:{"margin-right":"150rpx"},attrs:{type:"text",placeholder:"请输入验证码","placeholder-class":"pla-class"},model:{value:t.code2,callback:function(e){t.code2=e},expression:"code2"}}),s("span",{staticClass:"row-span",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.getCode(2)}}},[t._v(t._s(t.codeName2))])],1),s("v-uni-view",{staticClass:"row-item"},[s("v-uni-image",{staticClass:"row-img",attrs:{src:a("2df4"),mode:"aspectFit"}}),s("v-uni-input",{staticClass:"row-input",attrs:{type:"password",maxlength:"12",placeholder:"请输入6-12位数字字母组合的密码","placeholder-class":"pla-class"},model:{value:t.password2,callback:function(e){t.password2=e},expression:"password2"}})],1),s("v-uni-view",{staticClass:"row-item"},[s("v-uni-image",{staticClass:"row-img",attrs:{src:a("7daa"),mode:"aspectFit"}}),s("v-uni-input",{staticClass:"row-input",attrs:{type:"password",placeholder:"请确认密码","placeholder-class":"pla-class"},model:{value:t.surepass2,callback:function(e){t.surepass2=e},expression:"surepass2"}})],1),s("v-uni-view",{staticClass:"bottom-btn",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.register()}}},[t._v("注册")]),s("v-uni-view",{staticClass:"bottom-row"},[s("v-uni-view",{staticClass:"row-des des-center",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.changePart(1)}}},[t._v("已有账号，我要登录")])],1)],1):t._e(),3==t.isShow?s("v-uni-view",{staticClass:"info-part"},[s("v-uni-view",{staticClass:"row-item"},[s("v-uni-image",{staticClass:"row-img",attrs:{src:a("6af9"),mode:"aspectFit"}}),s("v-uni-input",{staticClass:"row-input",attrs:{type:"number",maxlength:"11",placeholder:"请输入手机号码","placeholder-class":"pla-class"},model:{value:t.phone3,callback:function(e){t.phone3=e},expression:"phone3"}})],1),s("v-uni-view",{staticClass:"row-item"},[s("v-uni-image",{staticClass:"row-img",attrs:{src:a("dd26"),mode:"aspectFit"}}),s("v-uni-input",{staticClass:"row-input",staticStyle:{"margin-right":"150rpx"},attrs:{type:"text",placeholder:"请输入验证码","placeholder-class":"pla-class"},model:{value:t.code3,callback:function(e){t.code3=e},expression:"code3"}}),s("span",{staticClass:"row-span",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.getCode(3)}}},[t._v(t._s(t.codeName3))])],1),s("v-uni-view",{staticClass:"row-item"},[s("v-uni-image",{staticClass:"row-img",attrs:{src:a("2df4"),mode:"aspectFit"}}),s("v-uni-input",{staticClass:"row-input",attrs:{type:"password",maxlength:"12",placeholder:"请输入6-12位数字字母组合的密码","placeholder-class":"pla-class"},model:{value:t.password3,callback:function(e){t.password3=e},expression:"password3"}})],1),s("v-uni-view",{staticClass:"row-item"},[s("v-uni-image",{staticClass:"row-img",attrs:{src:a("7daa"),mode:"aspectFit"}}),s("v-uni-input",{staticClass:"row-input",attrs:{type:"password",placeholder:"请确认密码","placeholder-class":"pla-class"},model:{value:t.surepass3,callback:function(e){t.surepass3=e},expression:"surepass3"}})],1),s("v-uni-view",{staticClass:"bottom-btn",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.saveData()}}},[t._v("保存")]),s("v-uni-view",{staticClass:"bottom-row"},[s("v-uni-view",{staticClass:"row-des des-center",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.changePart(1)}}},[t._v("我要登录")])],1)],1):t._e()],1),s("v-uni-view",{staticClass:"bottom-part"},[s("v-uni-image",{staticClass:"logo-img",attrs:{src:a("1502"),mode:"aspectFit"}})],1)],1)},n=[];a.d(e,"b",(function(){return o})),a.d(e,"c",(function(){return n})),a.d(e,"a",(function(){return s}))},e666:function(t,e,a){t.exports=a.p+"static/img/loginBgbottom.3d300cf1.jpg"},ee36:function(t,e,a){var s=a("24fb"),o=a("1de5"),n=a("6b2b"),i=a("e666");e=s(!1);var r=o(n),c=o(i);e.push([t.i,".top-part[data-v-aff297b2]{width:100%;height:%?459?%;background:url("+r+") no-repeat;background-size:cover}.head-part[data-v-aff297b2]{height:%?110?%;position:relative}.return-btn[data-v-aff297b2]{width:%?21?%;height:%?37?%;margin:%?65?% 0 0 %?22?%;position:absolute}.head-title[data-v-aff297b2]{font-size:%?36?%;color:#fff;text-align:center;padding-top:%?60?%}.box-part[data-v-aff297b2]{height:%?950?%;border-radius:%?20?%;box-shadow:0 0 %?10?% %?1?% #ffe5eb;position:relative;margin-top:%?-220?%;background-color:#fff}.login-img[data-v-aff297b2]{width:%?287?%;height:%?287?%;position:absolute;left:0;right:0;margin:%?-144?% auto 0}.info-part[data-v-aff297b2]{padding-top:%?130?%}.row-item[data-v-aff297b2]{width:%?600?%;height:%?115?%;margin:0 auto;border-bottom:1px solid #dbdbdb;padding-top:%?65?%}.row-img[data-v-aff297b2]{width:%?32?%;height:%?36?%;float:left;margin-right:%?25?%;margin-top:%?5?%}.pla-class[data-v-aff297b2]{font-size:%?30?%;color:#c2c2c2}.bottom-btn[data-v-aff297b2]{width:%?600?%;height:%?90?%;background-color:#f62f0e;color:#fff;font-size:%?34?%;text-align:center;margin:%?55?% auto 0;line-height:%?90?%;border-radius:%?45?%}.bottom-row[data-v-aff297b2]{position:absolute;bottom:%?35?%;width:%?600?%;margin:0 auto;left:0;right:0}.row-des[data-v-aff297b2]{font-size:%?24?%;color:#666}.des-left[data-v-aff297b2]{float:left;text-decoration:underline}.des-right[data-v-aff297b2]{float:right}.des-center[data-v-aff297b2]{text-align:center;text-decoration:underline}.bottom-part[data-v-aff297b2]{width:100%;height:%?115?%;background:url("+c+") no-repeat;background-size:cover;margin-top:%?30?%;position:relative}.logo-img[data-v-aff297b2]{width:%?146?%;height:%?42?%;margin:%?30?% auto 0;position:absolute;left:0;right:0}.row-span[data-v-aff297b2]{font-size:%?26?%;color:#ea1313;float:right;margin-top:%?-40?%}",""]),t.exports=e},f22c:function(t,e,a){"use strict";var s=a("94cb"),o=a.n(s);o.a}}]);