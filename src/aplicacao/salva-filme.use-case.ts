import FilmeRepositorioInterface from "./filme-repositorio-interface"
class SalvaFilme{
    
    constructor(private bancoInterface:FilmeRepositorioInterface){}
    public async execute(input:Input):Promise<Output|undefined>{
        const {id, titulo, descricao, imagem} = input
        //Salvar no Banco
        const resultado = await this.bancoInterface.salvar({id,titulo,descricao,imagem})
        //Retornar o resultado
        if(!resultado) return undefined 
        return {id, titulo, descricao, imagem}
    }
}
export default SalvaFilme

type Input = {
    id:number,
    titulo:string,
    descricao:string,
    imagem:string
}
type Output = {
    id:number,
    titulo:string,
    descricao:string,
    imagem:string
}