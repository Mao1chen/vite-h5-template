export const routes = [
  /*{path: "/:path(.*)", redirect: "/405"},
  {path: '/405', component: Page405, meta: {title: '温馨提示'}},*/
  {
    path: "",
    component: Layout,
    redirect: "/home",
    children: [],
  },
  { path: "/:path(.*)", redirect: "/404" },
];
export default routes;
