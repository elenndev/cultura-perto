import mongoose, { ConnectOptions } from "mongoose"

export const connectMongoDB = async ()=> {
    try{
        const options: ConnectOptions = {
            dbName: "culturaperto"
        }
        await mongoose.connect(process.env.MONGODB_URI!, options)
    }catch(error){
    console.log('Erro ao conectar com o MongoDB:', error)}
}