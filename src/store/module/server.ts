import { getServerList, getServerState } from "@/api";
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

  // 获取服务器状态
  const fetchServerState = async (
    request: ServerRequestType.GetServerState,
  ) => {
    const { data } = await getServerState(request);
    const server = getServer(request.host);
    if (server) server.status = data;
    return data;
  };

  const fetchServerList = async () => {
    const { data } = await getServerList({ userId });
    if (!Array.isArray(data)) return;
    state.value.servers = data.map((i: ServerType.ServerInstance) => ({
      instance: i,
    }));
  };

  return {
    state,
    actions: {
      fetchServerList,
      fetchServerState,
    },
  };
});
