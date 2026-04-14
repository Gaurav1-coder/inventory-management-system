const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    category: { type: String, required: true, unique: true }, // Matching frontend 'category'
    name: { type: String }, // Backward compatibility
    description: { type: String },
  },

{ timestamps: true }

);
// Create the Category model
const Category= mongoose.model("Category", CategorySchema);

module.exports =Category
