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
    descriptionEng: String,
    stockImg: String,
    symbolPrice: String,
    index: [String],
    price: {
      type: Number,
      default: 1
    },
    price2: {
      type: Number,
      default: 1
    },
    variation: {
      type: Number,
      default: 1
    },
    variation2: {
      type: Number,
      default: 1
    },
    volume: {
      type: Number,
      default: 1
    },
    currency: {
      type: String,
      default: "EUR"
    },
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
