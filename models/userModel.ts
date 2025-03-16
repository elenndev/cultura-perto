import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true],
    },
    password:{
        type:String,
        required:[true],
    },
    perfilArtisticoId:{
        type:String,
    },
    username: {
        type: String,
        required: [true]
    },
    isverified:{
        type:Boolean,
        default:false,
    }
})



const UserDB= mongoose.models.appUsers || mongoose.model("appUsers",userSchema);

export default UserDB;