import mongoose from "mongoose";

const ValidacaoPendenteSchema = new mongoose.Schema({
    email: { type: String, required: true},
    expiration: { type: Date, required: true },
    code: { type: String, required: true }
}, { timestamps: true });

const ValidacaoPendenteDB= mongoose.models.appValidacao || mongoose.model("appValidacao",ValidacaoPendenteSchema);

export default ValidacaoPendenteDB;