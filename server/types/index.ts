interface IUser {
    _id?: string;
    email: string;
    username: string;
    password: string;
    refreshToken?: string;
    avatar?: string;
  }
  
  interface ITokens {
    accessToken: string;
    refreshToken: string;
  }
  