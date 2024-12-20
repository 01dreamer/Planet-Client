import AppCustomUserPlane from "@/render/components/app/AppCustomUserPlane.vue";
import { useRouterStore } from "@/store";
import { SideType } from "@/typing/side";
import { NAvatar, NDropdown } from "naive-ui";
import { h } from "vue";

export const initSIdeOptions: Array<SideType.SideOption> = [
  {
    key1: "home",
    label: "首页",
    icon: "i-gravity-ui:display-pulse",
    active: true,
    execute: () => {
      const routerStore = useRouterStore();
      routerStore.state.router!.push({
        name: "home",
      });
    },
  },
  {
    key1: "server",
    label: "服务器",
    icon: "i-gravity-ui:server",
    active: false,
    execute: () => {
      const routerStore = useRouterStore();
      routerStore.state.router!.push({
        name: "server",
      });
    },
  },
  {
    key1: "project",
    label: "项目",
    icon: "i-gravity-ui:folder",
    active: false,
    execute: () => {
      console.log("about");
    },
  },
  {
    key1: "plugins",
    label: "插件",
    icon: "i-gravity-ui:rocket",
    active: false,
    execute: () => {
      console.log("about");
    },
  },
];

const renderAvatar = () => {
  const options = [
    {
      label: "customRender",
      type: "render",
      render: () => h(AppCustomUserPlane),
    },
  ];

  return h(
    NDropdown,
    {
      target: "hover",
      placement: "right",
      size: "small",
      options: options,
      class: "rounded-10px",
    },
    () => h(NAvatar, { round: true, src: "src/assets/images.jpg" }),
  );
};

export const initSysSideOptions: Array<SideType.SideOption> = [
  {
    key1: "github",
    label: "github",
    icon: () => renderAvatar(),
    active: false,
    actionable: false,
    showMask: false,
    showLabel: false,
    execute: () => {
      console.log("about");
    },
  },
  {
    key1: "github",
    label: "github",
    icon: "i-tdesign:logo-github-filled",
    active: false,
    actionable: false,
    showMask: false,
    showLabel: false,
    execute: () => {
      console.log("about");
    },
  },
  {
    key1: "setting",
    label: "设置",
    icon: "i-gravity-ui:gear",
    active: false,
    actionable: false,
    showMask: false,
    showLabel: false,
    execute: () => {
      console.log("about");
    },
  },
];
