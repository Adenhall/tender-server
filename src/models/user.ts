import mongoose, { Schema, SchemaDefinition } from "mongoose";
import jwt from "jsonwebtoken";

export interface IUser extends mongoose.Document {
  name: string;
  age?: Date;
  pictureUrl?: string;
  bio?: string;
  username: string;
  password: string;
  liked: Schema.Types.ObjectId[];
  match: Schema.Types.ObjectId[];
  token: string;
}

interface IUserDocument extends IUser {
  generateToken: () => Promise<string>;
}

const userSchemaDef: SchemaDefinition = {
  name: {
    type: String,
    required: [true, "Name is mandatory for users"],
  },
  age: Date,
  pictureUrl: {
    type: String,
    // required: [true, "Profile picture is needed"],
  },
  bio: String,
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  liked: {
    type: [Schema.Types.ObjectId],
    ref: "User",
  },
  match: {
    type: [Schema.Types.ObjectId],
    ref: "User",
  },
  token: {
    type: String,
  },
};

const userSchema = new Schema<IUser>(userSchemaDef, {
  timestamps: true,
  versionKey: false,
});

userSchema.methods.generateToken = async function () {
  const user = this;
  const token = jwt.sign(
    { _id: this._id },
    process.env.JWT_SECRET || "very_secret",
    {
      expiresIn: "14d",
    }
  );
  user.token = token;
  await user.save();
  return token;
};

export default mongoose.model<IUserDocument>("User", userSchema);
