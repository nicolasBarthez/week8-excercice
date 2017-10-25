const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stockSchema = new Schema(
  {
    longName: {
      type: String,
      required: true
    },
    isin: String,
    shortName: String,
    description: String,
    stockImg: String,
    symbolPrice: String,
    index: [String],
    price: Number,
    variation: Number,
    volume: Number,
    trend: {
      type: [Number],
      default: [50, 50]
    }
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  }
);

//

var Stock = mongoose.model("Stock", stockSchema);
module.exports = Stock;
