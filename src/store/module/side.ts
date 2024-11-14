import { initSIdeOptions, initSysSideOptions } from "@/constants/side.ts";
import { SideType } from "@/typing/side";
import { defineStore } from "pinia";
import { ref } from "vue";

type SideState = {
  side: SideType.Side;
  sysSide: SideType.Side;
};

export const useSideStore = defineStore("side", () => {
  const state = ref<SideState>({
    side: {
      currentActive: "home",
      options: [...initSIdeOptions],
    },
    sysSide: {
      currentActive: "",
      options: [...initSysSideOptions],
    },
  });

  const select = async (key: string) => {
    state.value.side.currentActive = key;
  };

  return {
    state,
    actions: { select },
  };
});
