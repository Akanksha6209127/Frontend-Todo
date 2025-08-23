import mongoose, { Document, Model, Schema } from "mongoose";

export interface IUser extends Document {
  name: string,
  email: string,
  password?: string,
  provider?: string,
  emailVerified?: Date
}

const UserSchema: Schema<IUser> = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  provider: {
    type: String,
  },
  emailVerified: {
    type: Date,
  },
  password: {
    type: String,
    required: true,
  },
});

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;