/************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, consistência de dados das  requisicões da API de filmes
 * Data: 01/02
 * Autor: Julia Mendes
 * Versão: 1.0
 * //para conversar direto com o banco
************************************************************************************************************/

//Import do arquivo de configuração do projeto
const message = require('../modulo/config.js')

//Import do arquivo DAO que fará a comunicação com o Banco de Dados
const filmeDAO = require('../model/DAO/filme.js')

const classificacaoDAO = require('../model/DAO/classificacao.js')
const generoDAO = require('../model/DAO/genero.js')

const diretorDao = require('../model/DAO/diretor.js')
const atorDao = require('../model/DAO/ator.js')
const ator = require('./controller_ator.js')

//Função para validar e inserir um novo filme
const setInserirNovoFilme = async function (dadosFilme, contentType) {
    try {


        if (String(contentType).toLowerCase() == 'application/json') {



            let novoFilmeJson = {}

            if (dadosFilme.nome == '' || dadosFilme.nome == undefined || dadosFilme.nome == null || dadosFilme.nome.length > 80 ||
                dadosFilme.sinopse == '' || dadosFilme.sinopse == undefined || dadosFilme.sinopse == null || dadosFilme.sinopse.length > 65000 ||
                dadosFilme.duracao == '' || dadosFilme.duracao == undefined || dadosFilme.duracao == null || dadosFilme.duracao.length > 8 ||
                dadosFilme.data_lancamento == '' || dadosFilme.data_lancamento == undefined || dadosFilme.data_lancamento == null || dadosFilme.data_lancamento.length != 10 ||
                dadosFilme.foto_capa == '' || dadosFilme.foto_capa == undefined || dadosFilme.foto_capa == null || dadosFilme.foto_capa.length > 200 ||
                dadosFilme.valor_unitario.length > 6||
                dadosFilme.id_classificacao == '' || dadosFilme.id_classificacao == undefined || dadosFilme.id_classificacao == null || isNaN(dadosFilme.id_classificacao )

            ) {

                return message.ERROR_REQUIRED_FIELDS //400


            } else {

                let validateStatus = false
                // VAlidação da data de relançamento, já que ela não obrigatória no BD
                if (dadosFilme.data_relancamento != null &&
                    dadosFilme.data_relancamento != '' &&
                    dadosFilme.data_relancamento != undefined

                ) {

                    //validação para verificar se a data esta com a qntidade de digitos corretos

                    if (dadosFilme.data_relancamento.length != 10) {

                        return message.ERROR_REQUIRED_FIELDS //400

                    } else {

                        validateStatus = true

                    }
                } else {
                    validateStatus = true
                }
                //Validação para verificar se a variavel booleana é verdadeira 
                if (validateStatus) {


                    //Encaminha os dados do Filme parao DAO inserir no BD 
                    let novoFilme = await filmeDAO.insertFilme(dadosFilme)

                    if (novoFilme) {
                        let ultimoID = await filmeDAO.selectUltimoId()
                        dadosFilme.id = Number(ultimoID[0].id)
                    }
                    //Validação para verificar se o DAO inseriu os dados no BD
                    if (novoFilme) {

                        //Cria o JSON de retorno dos dados (201)
                        novoFilmeJson.filme = dadosFilme
                        novoFilmeJson.status = message.SUCESS_CREATED_ITEM.status
                        novoFilmeJson.status_code = message.SUCESS_CREATED_ITEM.status_code
                        novoFilmeJson.message = message.SUCESS_CREATED_ITEM.message

                        return novoFilmeJson //201


                    } else {

                        return message.ERROR_INTERNAL_SERVER_DB//500

                    }
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE//415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER //500 erro na controller
    }
}


//Funçaõ para validar e atualizar um filme
const setAtualizarFilme = async function (dadosFilme, contentType, id) {
    let idFilme = id

    if (idFilme == '' || idFilme == undefined || isNaN(idFilme)) {
        return message.ERROR_INVALID_ID; //400
    } else {
        let filmeId = await filmeDAO.selectByIdFilme(idFilme);
        let verificarId = filmeId.length
        if (verificarId > 0) {
        
            try {


                if (String(contentType).toLowerCase() == 'application/json') {



                    let updateFilmeJson = {}

                    if (dadosFilme.nome == '' || dadosFilme.nome == undefined || dadosFilme.nome == null || dadosFilme.nome.length > 80 ||
                        dadosFilme.sinopse == '' || dadosFilme.sinopse == undefined || dadosFilme.sinopse == null || dadosFilme.sinopse.length > 65000 ||
                        dadosFilme.duracao == '' || dadosFilme.duracao == undefined || dadosFilme.duracao == null || dadosFilme.duracao.length > 8 ||
                        dadosFilme.data_lancamento == '' || dadosFilme.data_lancamento == undefined || dadosFilme.data_lancamento == null || dadosFilme.data_lancamento.length != 10 ||
                        dadosFilme.foto_capa == '' || dadosFilme.foto_capa == undefined || dadosFilme.foto_capa == null || dadosFilme.foto_capa.length > 200 ||
                        dadosFilme.valor_unitario.length > 6||
                        dadosFilme.id_classificacao == '' || dadosFilme.id_classificacao == undefined || dadosFilme.id_classificacao == null || isNaN(dadosFilme.id_classificacao )


                    ) {

                        return message.ERROR_REQUIRED_FIELDS //400


                    } else {

                        let validateStatus = false
                        // VAlidação da data de relançamento, já que ela não obrigatória no BD
                        if (dadosFilme.data_relancamento != null &&
                            dadosFilme.data_relancamento != '' &&
                            dadosFilme.data_relancamento != undefined

                        ) {

                            //validação para verificar se a data esta com a qntidade de digitos corretos

                            if (dadosFilme.data_relancamento.length != 10) {

                                return message.ERROR_REQUIRED_FIELDS //400

                            } else {

                                validateStatus = true

                            }
                        } else {
                            validateStatus = true
                        }
                        //Validação para verificar se a variavel booleana é verdadeira 
                        if (validateStatus) {


                            //Encaminha os dados do Filme parao DAO inserir no BD 
                            let filmeAtualizado = await filmeDAO.updateFilme(dadosFilme,id)

                            //Validação para verificar se o DAO inseriu os dados no BD
                            if (filmeAtualizado) {

                                //Cria o JSON de retorno dos dados (201)
                                updateFilmeJson.filme = dadosFilme
                                updateFilmeJson.status = message.SUCESS_UPDATED_ITEM.status
                                updateFilmeJson.status_code = message.SUCESS_UPDATED_ITEM.status_code
                                updateFilmeJson.message = message.SUCESS_UPDATED_ITEM.message

                                return updateFilmeJson

                            } else {

                                return message.ERROR_INTERNAL_SERVER_DB//500

                            }
                        }
                    }
                } else {
                    return message.ERROR_CONTENT_TYPE//415
                }
            } catch (error) {
                return message.ERROR_INTERNAL_SERVER //500 erro na controller
            }
       
        } else {
            return message.ERROR_NOT_FOUND_ID
        }
    }
    }

    //Funçaõ para excluir um filme
 const setExcluirFilme = async function (id) {

        try {
            let idFilme = id

            if (idFilme == '' || idFilme == undefined || isNaN(idFilme)) {
                return message.ERROR_INVALID_ID; //400
            } else {
                let dadosFilme = await filmeDAO.selectByIdFilme(idFilme);
                let verificarId = dadosFilme.length
                if (verificarId > 0) {
                    dadosFilme = await filmeDAO.deleteFilme(idFilme);
                    console.log(dadosFilme)
                    return message.SUCESS_DELETED_ITEM
                } else {
                    return message.ERROR_NOT_FOUND_ID
                }
            }
        } catch {
            return message.ERROR_INTERNAL_SERVER_DB
        }

    }

    //função para retornar todos os filmes
    const getListarFilmes = async function () {

        // Cri o objeto JSON
        let filmesJSON = {};

        //Chama a funcão do DAO para retornar os dados da tabela de filmes
        let dadosFilmes = await filmeDAO.selectAllFilmes();

        // Validação para verificar s existem dados 
        if (dadosFilmes) {

            if (dadosFilmes.length > 0) {
                
                for (let filme of dadosFilmes){
                    let classificacaoFilme = await classificacaoDAO.selectByIdClassificacao(filme.id_classificacao)
                    delete filme.id_classificacao
                    filme.classificacao = classificacaoFilme
                }
                for (let filme of dadosFilmes){
                    let generoFilme = await generoDAO.selectGeneroFilmeById(filme.id)
                    if(generoFilme.length > 0)
                        filme.genero = generoFilme
                }

                for (let filme of dadosFilmes){
                    let atorFilme = await atorDao.selectAtorByIdFilme(filme.id)
                    if(atorFilme.length > 0)
                        filme.Atores = atorFilme
                }
                for (let filme of dadosFilmes){
                    let diretorFilme = await diretorDao.selectDiretorByIdFilme(filme.id)
                    if(diretorFilme.length > 0)
                        filme.diretores = diretorFilme
                }


                // Cria o JSON para devolver para o APP
                filmesJSON.filmes = dadosFilmes;
                filmesJSON.quantidade = dadosFilmes.length;
                filmesJSON.status_code = 200;
                return filmesJSON;
            } else {
                return message.ERROR_NOT_FOUND
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DB;
        }

    }

    const getBuscarFilmeNome = async (nome) => {
        // Cria o objeto JSON

        let nomeFilme = nome
        let filmesJSON = {};

        if (nomeFilme == '' || nomeFilme == undefined) {
            return message.ERROR_INVALID_ID
        } else {
            //Chama a funcão do DAO para retornar os dados da tabela de filmes
            let dadosFilmes = await filmeDAO.selectByNome(nome)


            if (dadosFilmes) {
                if (dadosFilmes.length > 0) {
                    filmesJSON.filme = dadosFilmes;
                    filmesJSON.status_code = 200;

                    // console.log(filmesJSON)

                    return filmesJSON;
                } else {
                    return message.ERROR_NOT_FOUND;
                }
            } else {
                return message.ERROR_INTERNAL_SERVER_DB
            }

        }
    }

    //Função para buscar um filme pelo ID
    const getBuscarFilme = async function (id) {

        //Recebe o ID do filme
        let idFilme = id;
        //Cria o objeto JSON
        let filmesJSON = {};

        //Validação para vereficar se o ID é valido (vazio, indefinido ou não númerico)
        if (idFilme == '' || idFilme == undefined || isNaN(idFilme)) {
            return message.ERROR_INVALID_ID; //400
        } else {

            //Encaminha o ID para o DAO buscar no Banco de Dados 
            let dadosFilme = await filmeDAO.selectByIdFilme(idFilme);

            //Verifica se o DAO retornou dados
            if (dadosFilme) {

                //Validação para vereficar a quantidade de itens retornados
                if (dadosFilme.length > 0) {

                    for (let filme of dadosFilme){
                        let classificacaoFilme = await classificacaoDAO.selectByIdClassificacao(filme.id_classificacao)
                        delete filme.id_classificacao
                        filme.classificacao = classificacaoFilme
                    }
                    for (let filme of dadosFilme){
                        let generoFilme = await generoDAO.selectGeneroFilmeById(filme.id)
                        if(generoFilme.length > 0)
                            filme.genero = generoFilme
                    }
                    for (let filme of dadosFilme){
                        let atorFilme = await atorDao.selectAtorByIdFilme(filme.id)
                        if(atorFilme.length > 0)
                            filme.Atores = atorFilme
                    }
                    for (let filme of dadosFilme){
                        let diretorFilme = await diretorDao.selectDiretorByIdFilme(filme.id)
                        if(diretorFilme.length > 0)
                            filme.diretores = diretorFilme
                    }
    

                    //Cria o JSON para retorno
                    filmesJSON.filme = dadosFilme;
                    filmesJSON.status_code = 200;

                    return filmesJSON;

                } else {
                    return message.ERROR_NOT_FOUND; //404
                }

            } else {
                return message.ERROR_INTERNAL_SERVER_DB; //500
            }
        }

    }

    module.exports = {
        setInserirNovoFilme,
        setAtualizarFilme,
        setExcluirFilme,
        getListarFilmes,
        getBuscarFilmeNome,
        getBuscarFilme
    }