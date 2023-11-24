import { createParamDecorator } from '@nestjs/common';

export type UserInfo = {
  id: string;
};

export const User = createParamDecorator((_, req) => {
  return req.args[0].user;
});
