// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import store from './vuex/store.js'

Vue.use(ElementUI)

Vue.config.productionTip = false

Vue.prototype.accAdd = function(arg1,arg2){
  var r1,r2,m;
  try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
  try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
  m=Math.pow(10,Math.max(r1,r2))
  return ((parseFloat(arg1*m,10) + parseFloat(arg2*m,10))/m).toFixed(2)
}

Vue.prototype.accSubtra = function(arg1,arg2){
  var r1,r2,m;
  try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
  try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
  m=Math.pow(10,Math.max(r1,r2))
  return ((parseFloat(arg1*m,10) - parseFloat(arg2*m,10))/m).toFixed(2)
}

Vue.prototype.toDecimal2 = function(x){
	var f = parseFloat(x);    
    if (isNaN(f)) {    
        return false;    
    }    
    var f = Math.round(x*100)/100;    
    var s = f.toString();    
    var rs = s.indexOf('.');    
    if (rs < 0) {    
        rs = s.length;    
        s += '.';    
    }    
    while (s.length <= rs + 2) {    
        s += '0';    
    }    
    return s;    
}

Vue.prototype.formatTime = function(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  return [year, month, day].map((n) => {
  		n = n.toString()
  		return n[1] ? n : '0' + n
  	}).join('-') 
  // 	+ ' ' + [hour, minute, second].map((n) => {
		// n = n.toString()
  // 		return n[1] ? n : '0' + n
  // 	}).join(':')
}
Vue.prototype.jumpCode = function(val){
  console.log("code",val)
  var code = val.Code;
	switch (code)
    {
      case 913://Token过期
        var _this = this
        this.$alert(val.Msg, '提示', {
          confirmButtonText: '确定',
          callback: action => {
            _this.$router.push('/login')
          }
        })
        break;
      case 912://Token不存在
        var _this = this
        this.$alert(val.Msg, '提示', {
          confirmButtonText: '确定',
          callback: action => {
            _this.$router.push('/login')
          }
        })
        break;
      default://400,800
        this.$alert(val.Msg, '提示', {
          confirmButtonText: '确定',
          callback: action => {
            console.log(action)
          }
        })
    }
}

Vue.prototype.RequestFullScreen = function(){
  var docElm = document.documentElement;
  //W3C  
  if (docElm.requestFullscreen) {  
      docElm.requestFullscreen();  
  }
  //FireFox  
  else if (docElm.mozRequestFullScreen) {  
      docElm.mozRequestFullScreen();  
  }
  //Chrome等  
  else if (docElm.webkitRequestFullScreen) {  
      docElm.webkitRequestFullScreen();  
  }
  //IE11
  else if (elem.msRequestFullscreen) {
    elem.msRequestFullscreen();
  }
}

Vue.prototype.exitFullscreen = function(){
  if (document.exitFullscreen) {  
      document.exitFullscreen();  
  }  
  else if (document.mozCancelFullScreen) {  
      document.mozCancelFullScreen();  
  }  
  else if (document.webkitCancelFullScreen) {  
      document.webkitCancelFullScreen();  
  }
  else if (document.msExitFullscreen) {
        document.msExitFullscreen();
  }
}
// set cookie
Vue.prototype.SetCookie = function(name, value, days) {
    var d = new Date;
    d.setTime(d.getTime() + 24*60*60*1000*days);
    var _value = JSON.stringify(value);
    window.document.cookie = name + "=" + _value + ";path=/;expires=" + d.toGMTString();
}
/**
 *对Date的扩展，将 Date 转化为指定格式的String
 *月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
 *年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 *例子：
 *(new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
 *(new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
 */
Date.prototype.format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
