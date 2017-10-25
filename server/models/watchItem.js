const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const watchItemSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
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
<<<<<<< HEAD
        type: String,
        enum: ["won", "lost", "active"],
        default: "active"
=======
      type: String,
      enum: ["won", "lost", "active", "removed"],
      default: "active"
>>>>>>> 3beb0d2863d5a5ec72013f3c3c7ec40e95f4a29e
    }
}, {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

//

var WatchItem = mongoose.model("WatchItem", watchItemSchema);
module.exports = WatchItem;