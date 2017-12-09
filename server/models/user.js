const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    // the email and password are added by passportLocalMongoose
    // we can add any extra information like facebooktokens (or
    // others) as well as a picture, etc
    username: {
      type: String,
      unique: true
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    },
    picProfile: {
      type: String,
      default: "/static/images/Georges.jpg"
    },
    location: {
      type: String
    },
    lang: {
      type: String
    },
    skills: {
      type: [String]
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
