
const mongoose=require('mongoose')




const ProductSchema= new mongoose.Schema({
    product: { // Matching frontend 'product' field for name
        type: String,
        required: true
    },
    name: { // Keeping name for backward compatibility
        type: String
    },
    description: {
        type: String,
        required: true,
    },
    category: { // Matching frontend 'category'
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    }, 
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        default: 0
    },
    image: {
        type: String,
    },
    supplier: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Supplier" 
    },
},
{ timestamps: true }
)

const Product=mongoose.model("Product",ProductSchema)

module.exports=Product