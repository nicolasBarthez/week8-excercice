const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const watchItemSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    stockId: {
      type: Schema.Types.ObjectId,
      ref: "Stock"
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
      enum: ["won", "lost", "active", "removed"],
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
