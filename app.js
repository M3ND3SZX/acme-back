/*********************************************************
 * Objetivo: Arquivo para realizar as requisiçõe dos filmes 
 * data: 08/02/2024
 * Autor: Julia Mendes
 * Versão: 1.0
 * 
 */

/**************************************************************************************************************
 * Para realizar a integração com o Banco de Dados devemos utilizar 
 * uma das seguintes bibliotecas;
 *      - SEQUELIZE = Mais antiga , mais documentação umas das primeiras porém temos bibliotecas mais evoluídas
 *      - PRISMA ORM = É a biblioteca mais atual (a que vamos utilizar)
 *      - FASTIFY ORM = É a bibliteca mais atual 
 * 
 * 
 * 
 * 
 *      npm install express --save
    é a biblioteca que vai gerenciar as requisições da API

    npm install body-parser --save
    É a biblioteca que vai manipular dados do corpo da requisição (POST, PUT)

    npm install cors --save
    É a bbiblioteca responsável pelas permissões (HEADER) de acesso das requisições 

     const bodyParser = require('body-parser')
            const cors = require ('cors')
    const {request} = require('http')


    const {access} = require('fs')

 *     Para a instalação do PRISMA ORM: 
 *        npm install prisma --save   (É responsável pela cpnexão com o BD)  
 *        npm install @prisma/client --save  (É responsável por executar Scripts SQl)
 * 
 *      Para iniciar o prisma no projeto, devemos:
 *      - npx prisma init
 ****************************************************************************************************************/



const express = require('express')
const cors = require ('cors')
const bodyParser = require('body-parser')

const app = express()

app.use((request, response, next) => {
    
    response.header('Access-Control-Allow-Origin', "*") 
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE,OPTIONS')

    app.use(cors())
    next()
})

const controllerFilmes = require('./controller/controller_filme.js')
const controllerClassificacao = require('./controller/controller_classificacao.js')
const controllerGenero = require('./controller/controller_genero.js')
const controllerNacionalidade = require ('./controller/controller_nacionalidade.js')
const controllerSexo = require ('./controller/controller_sexo.js')
const controllerDiretor = require ('./controller/controller_diretor.js')
const controllerAtor = require ('./controller/controller_ator.js')
//const controllerAtor = require ('./controller/')

//criando um objeto para controlar a chegada dos dados da rquisição em formato JSON (apenas post e put)
const bodyParserJson = bodyParser.json()

//Período de utilização 01/2024 até 02/2024
//EndPoint: Versão 1.0 - retorna todos os filmes do arquivo filmes.js
app.get('/v1/acmefilmes/listarfilmes', cors(), (request,response,next) => {

    let filme = require('./controller/funcao.js');
    let filmes = filme.listarFilmes();

        response.json(filmes);
        express.response.status(8080);
})

//EndPoint: Versão 1.0 - retorna todos os filmes do arquivo filmes.js por id
app.get('/v1/filmesAcme/filme/:id', cors(), async function(request,response,next){

    let mostrarFilme = request.params.id
    let filme = require ('./controller/funcaoAcme.js');
    let filmes = filme.filme(mostrarFilme);

        response.json(filmes);
        response.status(200);
})






//EndPoint: Versão 2.0 - retorna todos os filmes do Banco de Dados
app.get('/v2/acmefilmes/filmes', cors(), async function(request, response){

    //Chama a função da controller para retorNAR FILMES
    let dadosFilmes = await controllerFilmes.getListarFilmes();

    //Validação para retornar o JSON dos filmes ou retornar o 404
    if(dadosFilmes){
        response.json(dadosFilmes);
        response.status(200);
    }else{
        response.json({message: 'Nnehum registro foi encontrado'})
        response.status(404);
    }

})

//EndPoint: retorno o filme filtrando por id
app.get('/v2/acmefilmes/filme/:id', cors(), async function(request,response,next){

    //Recebe o ID da requisição
    let idFilme = request.params.id;

    //Encaminh o ID para o controller buscar o filme
    let dadosFilme = await controllerFilmes.getBuscarFilme(idFilme);

    response.status(dadosFilme.status_code);
    response.json(dadosFilme);

});

app.delete('/v2/acmefilmes/filme/:id', cors(), async function(request,response){

    let idFilme = request.params.id

    let dadosFilme = await controllerFilmes.setExcluirFilme(idFilme)
    response.status(dadosFilme.status_code)
    response.json(dadosFilme)

})

app.post('/v2/acmefilmes/filme', cors(), bodyParserJson, async function(request,response){

    let contentType = request.headers['content-type']
    
    //recebe todos os dados encaminhados na requisição pelo body
    let dadosBody = request.body

    //Encaminha os dados para cocntroller enviar ao DAO
    let resultadoDadosNovoFIlme = await controllerFilmes.setInserirNovoFilme(dadosBody,contentType)

    response.status(resultadoDadosNovoFIlme.status_code)
    response.json(resultadoDadosNovoFIlme)

})

// /*app.get('/v2/filmesAcme/filmeNome/:nome', cors(), async function(request,response,next){

//     let nomeFilme = request.query.nome
//     let filmeNome = await controllerFilmes.getBuscarFilmeNome(nomeFilme)

//         response.json(filmeNome);
//         response.status(filmeNome.status_code)
// })

app.put('/v2/acmefilmes/filme/:id', cors(), bodyParserJson, async function(request,response){
    let contentType = request.headers['content-type']
    let idFilme = request.params.id

    let dadosBody = request.body
    let resultadoNovosDadosFilme = await controllerFilmes.setAtualizarFilme(dadosBody,contentType, idFilme)

    response.status(resultadoNovosDadosFilme.status_code)
    response.json(resultadoNovosDadosFilme)
})




app.post('/v2/acmefilmes/classificacao', cors(), bodyParserJson, async function (request, response){
    let contentType = request.headers['content-type']

    let dadosBody = request.body
    let resultadoDadosNovaClassificacao = await controllerClassificacao.setInserirNovaClassificacao(dadosBody,contentType)

    response.status(resultadoDadosNovaClassificacao.status_code)
    response.json(resultadoDadosNovaClassificacao)
})

app.get('/v2/acmefilmes/classificacoes', cors(), async function(request, response){

    let dadosClassificacao = await controllerClassificacao.getListarclassificacao();

  

    if(dadosClassificacao){
        response.json(dadosClassificacao);
        response.status(200);
    }else{
        response.json({message: 'Nenhum registro foi encontrado'})
        response.status(404);
    }

})

app.get('/v2/acmefilmes/classificacaoNome', cors(), async function(request,response,next){

    let nomeClassificacao = request.query.nome
    let classificacaoNome = await controllerClassificacao.getBuscarClassificacaoNome(nomeClassificacao)

        response.json(classificacaoNome);
        response.status(classificacaoNome.status_code)
} )

app.put ('/v2/acmefilmes/classificacao/:id', cors(), bodyParserJson, async function (request, response){
    let contentType = request.headers['content-type']
    let idClassificacao = request.params.id

    let dadosBody = request.body
    let resultadoClassificacaoAtualizada = await controllerClassificacao.setAtualizarClassificacao(idClassificacao, dadosBody, contentType )

    response.status(resultadoClassificacaoAtualizada.status_code)
    response.json(resultadoClassificacaoAtualizada)
})

app.delete('/v2/acmefilmes/classificacao/:id', cors(), async function (request, response){
    let idClassificacao = request.params.id

    let dadosClassificacao = await controllerClassificacao.setExcluirClassificacao(idClassificacao)
    response.status(dadosClassificacao.status_code)
    response.json(dadosClassificacao)
})



app.post('/v2/acmefilmes/genero', cors(), bodyParserJson, async function (request, response){
    let contentType = request.headers['content-type']

    let dadosBody = request.body
    let resultadoDadosNovoGenero = await controllerGenero.setInserirNovoGenero(dadosBody,contentType)

    response.status(resultadoDadosNovoGenero.status_code)
    response.json(resultadoDadosNovoGenero)
})

app.get('/v2/acmefilmes/generos', cors(), async function(request, response){

    let dadosGenero = await controllerGenero.getListarGenero();

  

    if(dadosGenero){
        response.json(dadosGenero);
        response.status(200);
    }else{
        response.json({message: 'Nenhum registro foi encontrado'})
        response.status(404);
    }

})

app.put ('/v2/acmefilmes/genero/:id', cors(), bodyParserJson, async function (request, response){
    let contentType = request.headers['content-type']
    let idGenero = request.params.id

    let dadosBody = request.body
    let resultadoGeneroAtualizado = await controllerGenero.setAtualizarGenero(idGenero, dadosBody, contentType )

    response.status(resultadoGeneroAtualizado.status_code)
    response.json(resultadoGeneroAtualizado)
})

app.delete('/v2/acmefilmes/genero/:id', cors(), async function (request, response){
    let idGenero = request.params.id

    let dadosGenero = await controllerGenero.setExcluirGenero(idGenero)
    response.status(dadosGenero.status_code)
    response.json(dadosGenero)
})
app.get('/v2/acmefilmes/genero/:id', cors(), async function(request,response,next){

    //Recebe o ID da requisição
    let idGenero = request.params.id;

    //Encaminh o ID para o controller buscar o filme
    let dadosGenero = await controllerGenero.getBuscarGeneroById(idGenero);

    response.status(dadosGenero.status_code);
    response.json(dadosGenero);

});




app.get ('/v2/acmefilmes/nacionalidade', cors(), async function (request, response){

    let dadosNacionalidade  = await controllerNacionalidade.getListarNacionalidade()

    if(dadosNacionalidade){
        response.json(dadosNacionalidade);
        response.status(200);
    }else{
        response.json({message: 'Nenhum registro foi encontrado'})
        response.status(404);
    }
})

app.get('/v2/acmefilmes/nacionalidade/:id', cors(), async function(request,response,next){

    //Recebe o ID da requisição
    let idNacionalidade = request.params.id;

    //Encaminh o ID para o controller buscar o filme
    let dadosNacionalidade = await controllerNacionalidade.getBuscarNacionalidadeById(idNacionalidade)

    response.status(dadosNacionalidade.status_code);
    response.json(dadosNacionalidade);

});



app.get ('/v2/acmefilmes/sexo', cors(), async function (request, response){

    let dadosSexo = await controllerSexo.getListarSexo()

    if(dadosSexo){
        response.json(dadosSexo);
        response.status(200);
    }else{
        response.json({message: 'Nenhum registro foi encontrado'})
        response.status(404);
    }
})

app.get('/v2/acmefilmes/sexo/:id', cors(), async function(request,response,next){

    //Recebe o ID da requisição
    let idSexo = request.params.id;

    //Encaminh o ID para o controller buscar o filme
    let dadosSexo = await controllerSexo.getBuscarSexoById(idSexo)

    response.status(dadosSexo.status_code);
    response.json(dadosSexo);

});






app.get('/v2/acmefilmes/diretor', cors(), async function(request, response){

    let dadosDiretor = await controllerDiretor.getListarDiretores();

    if(dadosDiretor){
        response.json(dadosDiretor);
        response.status(200);
    }else{
        response.json({message: 'Nenhum registro foi encontrado'})
        response.status(404);
    }

})

app.get('/v2/acmefilmes/diretor/:id', cors(), async function(request,response,next){

    //Recebe o ID da requisição
    let idDiretor = request.params.id;

    let dadosDiretor = await controllerDiretor.getBuscarDiretorId(idDiretor);

    response.status(dadosDiretor.status_code);
    response.json(dadosDiretor);

});


app.delete('/v2/acmefilmes/diretor/:id', cors(), async function (request, response){
    let idDiretor = request.params.id

    let dadosDiretor = await controllerDiretor.setExcluirDiretor(idDiretor)
    response.status(dadosDiretor.status_code)
    response.json(dadosDiretor)
})

app.post('/v2/acmefilmes/diretor', cors(), bodyParserJson, async function (request, response){
    let contentType = request.headers['content-type']

    let dadosBody = request.body
    let resultadoDadosNovoDiretor = await controllerDiretor.setInserirNovoDiretor(dadosBody,contentType)

    response.status(resultadoDadosNovoDiretor.status_code)
    response.json(resultadoDadosNovoDiretor)
})


app.put ('/v2/acmefilmes/diretor/:id', cors(), bodyParserJson, async function (request, response){
    let contentType = request.headers['content-type']
    let idDiretor = request.params.id

    let dadosBody = request.body
    let resultadoDiretorAtualizada = await controllerDiretor.setAtualizarDiretor( idDiretor, contentType, dadosBody )

    response.status(resultadoDiretorAtualizada.status_code)
    response.json(resultadoDiretorAtualizada)
})








app.get('/v2/acmefilmes/ator', cors(), async function(request, response){

    let dadosAtor = await controllerAtor.getListaratores()

    if(dadosAtor){
        response.json(dadosAtor);
        response.status(200);
    }else{
        response.json({message: 'Nenhum registro foi encontrado'})
        response.status(404);
    }

})

app.get('/v2/acmefilmes/ator/:id', cors(), async function(request,response,next){

    //Recebe o ID da requisição
    let idAtor = request.params.id;

    let dadosAtor = await controllerAtor.getBuscarAtorById(idAtor);

    response.status(dadosAtor.status_code);
    response.json(dadosAtor);

});


app.delete('/v2/acmefilmes/ator/:id', cors(), async function (request, response){
    let idAtor = request.params.id

    let dadosAtor = await controllerAtor.setExcluirator(idAtor)
    response.status(dadosAtor.status_code)
    response.json(dadosAtor)
})

app.post('/v2/acmefilmes/ator', cors(), bodyParserJson, async function (request, response){
    let contentType = request.headers['content-type']

    let dadosBody = request.body
    let resultadoDadosNovoAtor = await controllerAtor.setInserirNovoAtor(dadosBody,contentType)

    response.status(resultadoDadosNovoAtor.status_code)
    response.json(resultadoDadosNovoAtor)
})


app.put ('/v2/acmefilmes/ator/:id', cors(), bodyParserJson, async function (request, response){
    let contentType = request.headers['content-type']
    let idAtor = request.params.id

    let dadosBody = request.body
    let resultadoAtorAtualizado = await controllerAtor.setAtualizarator( idAtor, contentType, dadosBody )

    response.status(resultadoAtorAtualizado.status_code)
    response.json(resultadoAtorAtualizado)
})












//Executar a API e faz ela aguardando requisições
app.listen('8080', function(){
    console.log("API funcionando e aguardando requisições");
})