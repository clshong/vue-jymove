//影院模块路由规则文件
import Cinema from "@/views/Cinema/Cinema.vue";
// const cinemasRoutes = [{
//     path: '/cinema',
//     component: cinemas,
// }]

// 异步路由导入影院模块
const cinemasRoutes = [
  {
    path: "/citys",
    // route level code-splitting
    // this generates a separate chunk (cinema.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "cinema" */ "@/views/Cinema/Citys"),
  },
  {
    path: "/cinema/:cid?/:cname?",
    component: Cinema,
  },
];

//要是有es6导出语法
export default cinemasRoutes;
