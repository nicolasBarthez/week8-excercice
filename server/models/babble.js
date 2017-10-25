const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const babbleSchema = new Schema(
  {
    babble: {
      type: String,
      required: [true, "babble can't be empty"]
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    stockLink: {
      type: [String],
      default: ["news"]
    },
    like: {
      type: Number,
      default: 0
    },
    babble_img: String,
    reply: Array
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  }
);

//

const Babble = mongoose.model("Babble", babbleSchema);
module.exports = Babble;
