import { ServerRequestType } from "@/typing/server";
import request from "@/utils/request.ts";

export function getServerList(data: ServerRequestType.GetServerList) {
  return request.post("/server/get-server-list", data);
}

export function getServerState(data: ServerRequestType.GetServerState) {
  return request.post("/server/get-server-state", data);
}
