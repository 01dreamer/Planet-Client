export declare namespace UserRequestType {
  type SendCode = {
    email: string;
  };

  type ValidateCode = {
    email: string;
    code: string;
  };

  type Register = {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
    uuid: string;
  };
}

export type UserInfo = {
  id: number;
  username: string;
  nickname: string;
  email: string;
  avatar: string;
};
