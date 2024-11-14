import { defineStore } from "pinia";
import { ref } from "vue";
import { Router, RouteRecordRaw } from "vue-router";

type RouterState = {
  router?: Router;
  routes: RouteRecordRaw[];
};

export const useRouterStore = defineStore("router", () => {
  const state = ref<RouterState>({
    router: undefined,
    routes: [],
  });

  const initRouter = (router: any) => {
    state.value.router = router;
    return router;
  };

  return {
    state,
    actions: {
      initRouter,
    },
  };
});
