import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/Index.vue"),
  },
  {
    path: "/home",
    name: "home",
    component: () => import("@/views/home/Index.vue"),
    children: [
      {
        path: "/server",
        name: "server",
        component: () => import("@/views/server/Index.vue"),
      },
      {
        path: "/server",
        name: "server-detail",
        component: () => import("@/views/server/detail/Index.vue"),
        children: [
          {
            path: "/server/detail/:id",
            name: "server-detail-summary",
            component: () => import("@/views/server/detail/summary/Index.vue"),
          },
        ],
      },
    ],
  },
  {
    path: "/403",
    name: "forbidden",
    component: () => import("@/views/errors/403.vue"),
  },
  {
    path: "/404",
    name: "not-found",
    component: () => import("@/views/errors/404.vue"),
  },
  {
    path: "/500",
    name: "server-error",
    component: () => import("@/views/errors/500.vue"),
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/404",
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
