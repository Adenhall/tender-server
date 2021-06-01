import mongoose, { Schema, SchemaDefinition } from "mongoose";

export interface IUser {
  name: string,
  age?: Date
  pictureUrl?: string
  bio?: string
  username: string
  password: string
  liked: Schema.Types.ObjectId[]
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
};

const userSchema = new Schema(userSchemaDef, {
  timestamps: true,
  versionKey: false,
});

export default mongoose.model<IUser>("User", userSchema);
