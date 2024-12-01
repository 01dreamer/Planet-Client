import { register } from "@/api";
import { ElectronChannel } from "@/constants/electron.ts";
import { storeKey } from "@/constants/store.ts";
import { UserInfo, UserRequestType } from "@/typing/user";
import { defineStore } from "pinia";
import { watchEffect } from "vue";

type State = {
  userInfo?: UserInfo;
  token: string;
};

async function getTokenByStore() {
  return await window.ipcRenderer.invoke(
    ElectronChannel.store.get,
    storeKey.user.TOKEN,
  );
}

async function setTokenInStore(token: string) {
  return await window.ipcRenderer.invoke(
    ElectronChannel.store.set,
    storeKey.user.TOKEN,
    token,
  );
}

async function getUserInfoByStore() {
  return await window.ipcRenderer.invoke(
    ElectronChannel.store.get,
    storeKey.user.USER_INFO,
  );
}

async function setUserInfoInStore(userInfo: UserInfo) {
  return await window.ipcRenderer.invoke(
    ElectronChannel.store.set,
    storeKey.user.USER_INFO,
    userInfo,
  );
}

export const useUserStore = defineStore("user", () => {
  const state = ref<State>({
    userInfo: undefined,
    token: "",
  });

  watchEffect(() => {
    setTokenInStore(state.value.token);
    setUserInfoInStore(state.value.userInfo);
  });

  const registerAction = async (data: UserRequestType.Register) => {
    const { token, userInfo } = (await register(data)) as any;
    state.value.token = token;
    state.value.userInfo = userInfo;
  };

  const loginByToken = async () => {};

  const init = async () => {
    const token = await getTokenByStore();
    if (!token && token === "") return;
    state.value.token = token;
    state.value.userInfo = await getUserInfoByStore();
  };

  return {
    state,
    actions: {
      init,
      registerAction,
    },
  };
});
