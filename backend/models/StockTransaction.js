const mongoose = require("mongoose");

const StockTransactionSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true },
    type: { type: String, enum: ["In", "Out"], required: true },
    reason: { type: String, required: true },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("StockTransaction", StockTransactionSchema);
