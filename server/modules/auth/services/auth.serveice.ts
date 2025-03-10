import bcrypt from 'bcrypt';
import { User } from '../models/user.model';
import { TokenService } from '../../common/services/token.service';
import { MediaService } from '../../common/services/media.service';

export class AuthService {
  static async register(username: string, email: string, password: string) {
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error('User already exists');
    
    const user = await User.create({ email, password, username });
    if (!user) throw new Error('User creation failed');
    
    const tokens = TokenService.generateTokens({ _id: user._id });
    user.refreshToken = tokens.refreshToken;
    await user.save();
    
    return { tokens, user };
  }

  static async login(email: string, password: string) {
    const user = await User.findOne({ email });
    if (!user) throw new Error('User not found');
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error('Invalid password');
    
    const tokens = TokenService.generateTokens({ _id: user._id });
    user.refreshToken = tokens.refreshToken;
    await user.save();
    
    return { tokens, user };
  }

  static async refresh(refreshToken: string) {
    if (!refreshToken) throw new Error('No token provided');
    
    const userData = await TokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await User.findOne({ refreshToken });
    if (!userData || !tokenFromDb) throw new Error('Invalid refresh token');
    
    const user = await User.findById(userData._id);
    if (!user) throw new Error('User not found');
    
    const tokens = TokenService.generateTokens({ _id: user._id });
    user.refreshToken = tokens.refreshToken;
    await user.save();
    
    return { tokens, user };
  }

  static async logout(refreshToken: string) {
    if (!refreshToken) throw new Error('User is already logged out');
    
    const user = await User.findOne({ refreshToken });
    if (user) {
      user.refreshToken = undefined;
      await user.save();
    }
  }

  static async updateUser(userId: string, data: { username?: string, email?: string, avatar?: any }) {
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');
    
    if (data.username) user.username = data.username;
    if (data.email) user.email = data.email;
    if (data.avatar) {
      const avatarUrl = await MediaService.saveImage(data.avatar);
      user.avatar = avatarUrl;
    }
    await user.save();
    return user;
  }
}