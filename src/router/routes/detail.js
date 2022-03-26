// 影片详情 模块路由规则文件
// 异步路由导入影院模块
const detailRoutes = [
  {
    path: "/film/:filmId",
    component: () =>
      import(/* webpackChunkName: "filmDetail" */ "@/views/Detail/Detail.vue"),
  },
];

//要是有es6导出语法
export default detailRoutes;
