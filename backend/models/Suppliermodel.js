
const mongoose=require('mongoose')




const SupplierSchema= new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    contactInfo:{
        phone:{type:String},
        email:{type:String},
        address:{type:String}
    },
    productsSupplied:[{ // Changed to array of ObjectIds
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    }],
    createdAt:{
        type:Date,
        default:Date.now

    },




},    { timestamps: true }


)

const Supplier=mongoose.model("Supplier",SupplierSchema)


module.exports=Supplier