export interface User {
  _id: string;
  email: string;
  password: string;
  devices: string[];
  isVerified: boolean;
  verificationToken: string;
  verifiedOn: Date;
  passwordResetToken: string;
  passwordResetExpiration: Date;
}
