const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const babblereplySchema = new Schema(
  {
    babble: {
      type: String,
      required: [true, "babble can't be empty"]
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    username: String,
    picProfile: String,
    babble_img: String
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  }
);

//

const Babblereply = mongoose.model("Babblereply", babblereplySchema);
module.exports = Babblereply;
