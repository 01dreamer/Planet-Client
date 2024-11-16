import * as api from "@/api";
import { ServerRequestType, ServerType } from "@/typing/server";
import { defineStore } from "pinia";
import { ref } from "vue";

type ServerState = {
  servers: ServerType.Server[];
};

export const useServerStore = defineStore("server", () => {
  const state = ref<ServerState>({
    servers: [],
  });

  const userId = 1;

  // 获取服务器
  function getServer(host: string) {
    return state.value.servers.find((i) => i.instance!.ip === host);
  }

  //添加服务器
  async function addServer(request: ServerRequestType.AddServer) {
    return await api.addServer(request);
  }

  // 获取服务器状态
  const fetchServerState = async (
    request: ServerRequestType.GetServerState,
  ) => {
    const data = (await api.getServerState(request)) as any;
    const server = getServer(request.host);
    if (server) server.status = data;
    return data;
  };

  const fetchServerList = async () => {
    const data = await api.getServerList({ userId });
    if (!Array.isArray(data)) return;
    state.value.servers = data.map((i: ServerType.ServerInstance) => ({
      instance: i,
    }));

    state.value.servers.forEach((i) =>
      fetchServerState({ host: i.instance!.ip! }),
    );
  };

  return {
    state,
    actions: {
      fetchServerList,
      fetchServerState,
      addServer,
    },
  };
});
