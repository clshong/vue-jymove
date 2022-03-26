import Vue from "vue";
import App from "./App.vue";
import router from "./router";
// 导入 store 
import store from "./store";

Vue.config.productionTip = false;
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 导入 vant 的 css  
import "vant/lib/index.css";


// // 导入axios
// import axios from "axios";
// // 设置请求的基础域名
// axios.defaults.baseURL = "https://m.maizuo.com";

// // 添加请求拦截器
// axios.interceptors.request.use(
//   function(config) {
//     config.headers = {
//       "X-Client-Info":
//         '{"a":"3000","ch":"1002","v":"5.0.4","e":"1598087896889693885431809","bc":"110100"}',
//       "X-Host": "mall.film-ticket.film.list",
//     };
//     // 在发送请求之前做些什么
//     return config;
//   },
//   function(error) {
//     // 对请求错误做些什么
//     return Promise.reject(error);
//   }
// );

// axios.get("gateway?cityId=110100&pageNum=1&pageSize=10&type=1&k=8591124");

// import all from "./model/all"
// console.log(all)
// all.sayHello()

// import sc from "./model/need"
// console.log(sc)

// import "./model/run"

// 引入图片懒加载
import VueLazyload from "vue-lazyload";
Vue.use(VueLazyload);

Vue.prototype.eventBus = new Vue();

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
