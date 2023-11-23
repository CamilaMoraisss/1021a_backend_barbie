import FilmeRepositorioInterface from "../../aplicacao/filme-repositorio-interface";
import mongoose from 'mongoose'
require('dotenv').config()
export default class BancoMongoDB implements FilmeRepositorioInterface{
    public filmeModel:any
    constructor(){
        try{
            mongoose.connect(process.env.MONGODB_URL || '')
            console.log("Conectado ao banco de dados")
        }catch(erro){
            console.log(erro)
        }
        this.filmeModel = 
        mongoose.model('filme', new mongoose.Schema({
                _id: Number,
                titulo: String,
                descricao: String,
                imagem: String
            })
        )
    }
    public async salvar(filme:Filme): Promise<boolean> {
        const filmeDTO = {
            _id: filme.id,
            titulo: filme.titulo,
            descricao: filme.descricao,
            imagem: filme.imagem
        }
        try{
            const filmeModelo = new this.filmeModel({...filmeDTO})
            const result = await filmeModelo.save()
            return !!result
        }catch(erro){
            console.log(erro)
            return false
        }
        
    }
    public async listar(): Promise<Filme[]> {
        const filmes = await this.filmeModel.find({})
        return filmes.map((filme:FilmeDTO)=>{
            return {
                id: filme._id,
                titulo: filme.titulo,
                descricao: filme.descricao,
                imagem: filme.imagem
            }
        })
    }
    public desconectar(): void {
        mongoose.disconnect()
    }
}
type Filme = {
    id:number,
    titulo:string,
    descricao:string,
    imagem:string
}
type FilmeDTO = {
    _id:number,
    titulo:string,
    descricao:string,
    imagem:string
}