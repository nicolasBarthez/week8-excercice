const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const watchItemSchema = new Schema(
  {
    userId: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    stockId: {
      type: Schema.Types.ObjectId,
      ref: "WatchItem"
    },
    position: {
      type: String,
      enum: ["bull", "bear", "none"],
      default: "none"
    },
    initialPrice: {
      type: Number,
      default: 0
    },
    status: {
      type: String,
      enum: ["won", "lost", "active"],
      default: "active"
    }
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  }
);

//

var WatchItem = mongoose.model("WatchItem", watchItemSchema);
module.exports = WatchItem;
