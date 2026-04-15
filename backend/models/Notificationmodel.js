
const mongoose=require('mongoose')




const NotificationSchema= new mongoose.Schema({

    title:{
        type:String,
        required:true
    },
    message: {
        type: String,
        required: true
    },
    type:{
        type:String,
        required:true,
    },
    read: {
        type: Boolean,
        default: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
},
{ timestamps: true }
)

const Notification=mongoose.model("Notification",NotificationSchema)

module.exports=Notification