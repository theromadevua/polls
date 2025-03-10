import { Request, Response, NextFunction } from 'express';
import { TokenService } from '../modules/common/services/token.service';

interface AuthenticatedRequest extends Request {
  user?: any; 
}

export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(401).json({ message: 'Unauthorized: no token provided' });
      return
    }

    const accessToken = authHeader.split(' ')[1];
    const userData = TokenService.validateAccessToken(accessToken);
    if (!userData) {
      res.status(401).json({ message: 'Unauthorized: cannot find user' });
      return
    }
    req.user = userData;
    next();
  } catch (e) {
    res.status(401).json({ message: 'Unauthorized' });
    return
  }
};
