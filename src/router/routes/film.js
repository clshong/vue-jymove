//电影模块的路由规则文件
import film from "@/views/Film/Film";
import nowplaying from "@/views/Film/NowPlaying";
import comingsoon from "@/views/Film/ComingSoon";

const filmsRoutes = [
  {
    path: "/film",
    component: film,
    //指定嵌套路由
    children: [
      { path: "nowplaying", component: nowplaying },
      { path: "comingsoon", component: comingsoon },
      {
        path: "/film",
        redirect: "nowplaying",
      },
    ],
  },
];

//要是有es6导出语法
export default filmsRoutes;
