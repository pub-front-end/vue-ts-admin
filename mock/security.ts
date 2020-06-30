import { Response, Request, NextFunction } from 'express';

export const accessTokenAuth = (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.header('X-Access-Token');
  if (!accessToken) {
    return res.status(401).json({
      code: 50001,
      messaege: '无效的Token信息'
    });
  }
  next();
};
