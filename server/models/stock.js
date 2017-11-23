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
    price2: Number,
    variation: Number,
    variation2: Number,
    volume: Number,
    currency: String,
    currency2: String,
    scrapKey: String
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  }
);

//

var Stock = mongoose.model("Stock", stockSchema);
module.exports = Stock;
