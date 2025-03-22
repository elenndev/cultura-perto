import mongoose from "mongoose"

const linksPerfilSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    link: { type: String, required: true}
})

const localidadeSchema = new mongoose.Schema({
    cidade: {type: String},
    estado: {type: String}
})

const localEventoSchema = new mongoose.Schema({
    nomeLocal: {type:String, required: true},
    bairro: {type:String, required: true},
    rua: {type:String, required: true},
})

const linksEventoSchema = new mongoose.Schema({
    nome: {type: String, required: true},
    link: {type: String, required: true}
})

const eventoSchema = new mongoose.Schema({
    id: {type: String, required: true},
    nome: {type: String, required:true},
    icon: {type: String},
    detalhes: {type: String, required:true},
    data: {type: [Date], required:true},
    localidade: {type: localEventoSchema, required:true},
    linksEvento: {type: [linksEventoSchema], required:true},
})

const perfilArtisticoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },
    username: {
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