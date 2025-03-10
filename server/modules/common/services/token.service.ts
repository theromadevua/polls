import jwt, { SignOptions } from 'jsonwebtoken';
import { config } from '../../../config';

export class TokenService {
  static generateTokens(payload: any): ITokens {
    const accessToken = jwt.sign(payload, config.JWT_ACCESS_SECRET as jwt.Secret, {
      expiresIn: config.JWT_ACCESS_EXPIRATION as SignOptions['expiresIn']
    });

    const refreshToken = jwt.sign(payload, config.JWT_REFRESH_SECRET as jwt.Secret, {
      expiresIn: config.JWT_REFRESH_EXPIRATION as SignOptions['expiresIn']
    });

    return { accessToken, refreshToken };
  }

  static validateAccessToken(token: string): any {
    try {
      return jwt.verify(token, config.JWT_ACCESS_SECRET);
    } catch (e) {
      return null;
    }
  }

  static async validateRefreshToken(token: string): Promise<{ valid: boolean; _id?: any }> {
    try {
      const decoded: any = jwt.verify(token, config.JWT_REFRESH_SECRET);
      console.log(decoded);
      return { valid: true, _id: decoded._id };
    } catch (e) {
      return { valid: false };
    }
  }
}