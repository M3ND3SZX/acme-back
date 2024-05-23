var acmeFilmes = require ('../modulo/filmes.js')

const listarFilmes = () => {
    let todosFilmes = acmeFilmes.ListaDeFilmes.filmes
    let status = false 
    let filmesArray = []
    let filmesJson = {}

    todosFilmes.forEach((filme) => {


        let infofilmes = {
            id: filme.id,
            nome: filme.nome,
            sinopse: filme.sinopse,
            duracao: filme.duracao,
            dataLancamento: filme.data_lancamento,
            dataRelancmento: filme.data_relancamento,
            fotoCapa: filme.foto_capa,
            valor: filme.valor_unitario
        }

        status = true
        filmesArray.push(infofilmes)
    })
    
    
    filmesJson.filmes = filmesArray

    if(status){
        return filmesJson
    }else{
        return false
    }


}

const filtrarFilmes = (id) => {
    let todosFilmes = acmeFilmes.ListaDeFilmes.filmes
    let status = false 
    let filmesArray = []
    let filmesJson = {}
    let filmesID = id
    let infofilmes = {}

    todosFilmes.forEach((filme) => {
        if(filme.id == filmesID ){
            
             infofilmes = {
                id: filme.id,
                nome: filme.nome,
                sinopse: filme.sinopse,
                duracao: filme.duracao,
                dataLancamento: filme.data_lancamento,
                dataRelancmento: filme.data_relancamento,
                fotoCapa: filme.foto_capa,
                valor: filme.valor_unitario
            }
            status = true
            filmesArray.push(infofilmes)
        }
        
        

    })

    filmesJson.filmes = filmesArray
    
    if(status){
        return filmesJson
    }else{
        return false
    }
}

const filtrarFilmesNome = (nome) => {
    let todosFilmes = acmeFilmes.ListaDeFilmes.filmes
    let status = false 
    let filmesArray = []
    let filmesJson = {}
    let filmesNome = nome
    let infofilmes = {}

    todosFilmes.forEach((filme) => {
        if(filme.nome == filmesNome){
            infofilmes = {
                id: filme.id,
                nome: filme.nome,
                sinopse: filme.sinopse,
                duracao: filme.duracao,
                dataLancamento: filme.data_lancamento,
                dataRelancmento: filme.data_relancamento,
                fotoCapa: filme.foto_capa,
                valor: filme.valor_unitario
            }
            status = true
            filmesArray.push(infofilmes)
        }

    })
    
    filmesJson.filmes = filmesArray
    
    return filmesJson

}

//console.log(listarFilmes())
//console.log(filtrarFilmes(2))
console.log(filtrarFilmesNome('O Segredo do Vale'))

module.exports = {
    listarFilmes,
    filtrarFilmes
}