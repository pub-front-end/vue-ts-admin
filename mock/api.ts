import { Response, Request } from 'express';

export interface IUserData {
  id: number;
  username: string;
  password: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  introduction: string;
  roles: string[];
}
const userList: IUserData[] = [
  {
    id: 0,
    username: 'admin',
    password: 'any',
    name: 'Admin',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    introduction: '超级管理员',
    email: 'admin@test.com',
    phone: '1234567890',
    roles: ['admin']
  },
  {
    id: 1,
    username: 'editor',
    password: 'any',
    name: 'Editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    introduction: '系统管理员',
    email: 'editor@test.com',
    phone: '1234567890',
    roles: ['editor']
  }
];

export const login = (req: Request, res: Response) => {
  const { username } = req.body;
  for (const user of userList) {
    if (user.username === username) {
      return res.json({
        code: 20000,
        data: {
          accessToken: username + '-token'
        }
      });
    }
  }
  return res.status(400).json({
    code: 50004,
    messaege: '非法用户'
  });
};
