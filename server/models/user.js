const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    // the username and password are added by passportLocalMongoose
    // we can add any extra information like facebooktokens (or
    // others) as well as a picture, etc
    username: String,
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    },
    picProfile: {
      type: String,
      default: "/images/avatar.png"
    },
    location: {
      type: String,
      default: "****"
    },
    bio: {
      type: String,
      default: "none"
    },
    following: [{ type: Schema.Types.ObjectId, ref: "User" }],
    score: {
      type: Number,
      default: 0
    },
    watchList: [
      {
        type: Schema.Types.ObjectId,
        ref: "WatchItem"
      }
    ],
    nbFollower: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  }
);

userSchema.plugin(passportLocalMongoose, { usernameField: "email" });

module.exports = mongoose.model("User", userSchema);
