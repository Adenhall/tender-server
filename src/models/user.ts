import mongoose, { Schema, SchemaDefinition } from "mongoose";

const userSchemaDef: SchemaDefinition = {
  name: {
    type: String,
    required: [true, "Name is mandatory for users"],
  },
  age: Date,
  pictureUrl: {
    type: String,
    required: [true, "Profile picture is needed"],
  },
  bio: String,
  username: {
    type: String,
    required: [true, "Username is required"],
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

export default mongoose.model("User", userSchema);
