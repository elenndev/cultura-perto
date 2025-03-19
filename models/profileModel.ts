import mongoose from "mongoose"

const linksPerfilSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    link: { type: String, required: true}
})

const localidadeSchema = new mongoose.Schema({
    cidade: {type: String},
    estado: {type: String}
})

const linksEvento = new mongoose.Schema({
    nome: {type: String, required: true},
    link: {type: String, required: true}
})

const eventoSchema = new mongoose.Schema({
    nome: {type: String, required:true},
    icon: {type: String},
    detalhes: {type: String, required:true},
    data: {type: [Date], required:true},
    localidade: {type: [localidadeSchema], required:true},
    linksEvento: {type: [linksEvento], required:true},
})

const perfilArtisticoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },
    descricao: {
        type: String,
        required: true,
    },
    tipo: {
        type: String,
        required: true
    },
    area: {
        type: String,
        required:true
    },
    linksDoPerfil: {
        type: [linksPerfilSchema]
    },
    localidade: {type: localidadeSchema, required: true},
    agenda: { type: eventoSchema}
})

const PerfilArtisticoDB = mongoose.models.perfisArtistas || mongoose.model("perfisArtistas", perfilArtisticoSchema)

export default PerfilArtisticoDB