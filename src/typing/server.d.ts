import { Common } from "@/typing/common";

export declare namespace ServerType {
  export type Server = {
    instance?: ServerInstance; // 服务器实例
    status?: ServerStatus; // 服务器状态
  };

  export type ServerInstance = {
    id?: number; // 服务器的唯一标识符
    name?: string; // 服务器名称
    os?: string; // 操作系统（如：Ubuntu 20.04, Windows Server）
    ip?: string; // 公网 IP 地址
    region?: string; // 数据中心区域（如：北京，上海）
    instanceType?: string; // 实例类型（如：t2.micro, m5.large）
    createdAt?: string; // 创建时间（ISO 格式）
    updatedAt?: string; // 最后更新时间（ISO 格式）
    tags?: string[]; // 服务器标签，用于组织和筛选
    cpuCores?: number; // CPU 核心数
    memory?: number; // 总内存（MB 或 GB）
    disk?: number; // 磁盘总容量（GB）
    billingMode?: "hourly" | "monthly" | "prepaid"; // 计费模式
    sshKeys?: string[]; // 与服务器关联的 SSH 密钥 ID 数组
    restartCount?: number; // 重启次数
  };

  export type ServerStatus = {
    status: "running" | "stopped" | "starting" | "stopping" | "error"; // 服务器状态
    cpuUsage?: number; // 当前 CPU 使用率（百分比）
    memFree?: string; // 空闲内存量
    memTotal?: string; // 已用内存量
    diskTotal?: string; // 磁盘空间总量
    diskUsed?: string; //已用磁盘空间
    lastUpdated?: string; // 最后更新时间（ISO 格式）
  };
}

export declare namespace ServerRequestType {
  export type GetServerList = {
    userId: number;
    state?: string;
    tags?: string[];
  } & Common.PageRequest;

  export type GetServerState = {
    host: string;
  };

  export type AddServer = {
    name: string;
    ip: string;
    autoFullInfo?: boolean;
    remote: {
      user: string;
      password: string;
    };
    os: string;
  };
}
