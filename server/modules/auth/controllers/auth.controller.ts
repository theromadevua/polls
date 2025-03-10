import { Request, Response } from 'express';
import { AuthService } from '../services/auth.serveice';

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const { username, email, password } = req.body;
      const { tokens, user } = await AuthService.register(username, email, password);
      res.cookie('refreshToken', tokens.refreshToken, { maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true });
      res.json({ ...tokens, user });
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const { tokens, user } = await AuthService.login(email, password);
      res.cookie('refreshToken', tokens.refreshToken, { maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true });
      res.json({ ...tokens, user });
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  }
  
  static async refresh(req: Request, res: Response) {
    try {
      const { refreshToken } = req.cookies;
      const { tokens, user } = await AuthService.refresh(refreshToken);
      
      res.cookie('refreshToken', tokens.refreshToken, { maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict',path: '/'});
      res.cookie('accessToken', tokens.accessToken, { maxAge: 15 * 60 * 1000, httpOnly: true, sameSite: 'strict', path: '/'});
      
      res.json({ ...tokens, user });
    } catch (e) {
      res.status(401).json({ message: e.message });
    }
  }

  static async logout(req: Request, res: Response) {
    try {
      const { refreshToken } = req.cookies;
      await AuthService.logout(refreshToken);
      res.clearCookie('refreshToken');
      res.clearCookie('accessToken');
      res.json({ message: 'Successfully logged out' });
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  }

  static async updateUser(req: RequestBody, res: Response) {
    try {
      const { username, email } = req.body;
      const avatar = req.files?.avatar;
      const user = await AuthService.updateUser(req.user._id, { username, email, avatar });
      res.json(user);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  }
}

interface RequestBody extends Request {
  files?: { avatar: any };
  user?: any;
}

