import { UserRequestType } from "@/typing/user";
import request from "@/utils/request.ts";

/**
 * 发送验证码
 * @param data
 * @return uuid
 */
export function sendCode(data: UserRequestType.SendCode) {
  return request.post("/user/auth/send-code", data);
}

/**
 * 验证验证码
 * @param data
 * @return uuid
 */
export function validateCode(data: UserRequestType.ValidateCode) {
  return request.post("/user/auth/validate-code", data);
}

export function register(data: UserRequestType.Register) {
  return request.post("/user/auth/sign-up", data);
}
