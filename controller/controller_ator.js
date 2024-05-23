/************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, consistência de dados das  requisicões da API de atores
 * Data: 25/04
 * Autor: Julia Mendes
 * Versão: 1.0
 * 
************************************************************************************************************/

//Import do arquivo de configuração do projeto
const message = require('../modulo/config.js')

//Import do arquivo DAO que fará a comunicação com o Banco de Dados
const atorDao = require('../model/DAO/ator.js')
const nacionalidadeDAO = require ('../model/DAO/nacionalidade.js')
const sexoDAO = require ('../model/DAO/sexo.js')


const setInserirNovoAtor = async function (dadosAtor, contentType) {
    try {


        if (String(contentType).toLowerCase() == 'application/json') {



            let novoAtorJson = {}

            if (
                dadosAtor.nome == '' || dadosAtor.nome == undefined || dadosAtor.nome == null || dadosAtor.nome.length > 100 ||
                dadosAtor.data_nascimento == '' || dadosAtor.data_nascimento == undefined || dadosAtor.data_nascimento == null || dadosAtor.data_nascimento.length != 10 ||
                dadosAtor.biografia == '' || dadosAtor.biografia == undefined || dadosAtor.biografia == null || dadosAtor.biografia>65000 ||
                dadosAtor.img == '' || dadosAtor.img == undefined || dadosAtor.img == null || dadosAtor.img.length > 200 ||
                dadosAtor.sexo_id ==''     ||dadosAtor.sexo_id == undefined         ||dadosAtor.sexo_id ==null || isNaN(dadosAtor.sexo_id)
            ) {
           

                return message.ERROR_REQUIRED_FIELDS //400


            } else {

                let validateStatus = false

                if (
                    dadosAtor.data_falecimento != null &&
                    dadosAtor.data_falecimento != '' &&
                    dadosAtor.data_falecimento != undefined 
                    &&
                    dadosAtor.nome_artistico != null &&
                    dadosAtor.nome_artistico != '' &&
                    dadosAtor.nome_artistico != undefined
                    

                ) {

                    //validação para verificar se a data esta com a qntidade de digitos corretos

                    if (dadosAtor.data_falecimento.length != 10 || dadosAtor.nome_artistico.length > 100 ) {

                        return message.ERROR_REQUIRED_FIELDS //400

                    } else {

                        validateStatus = true

                    }
                } else {
                    validateStatus = true
                }
                //Validação para verificar se a variavel booleana é verdadeira 
                if (validateStatus = true) {


                    //Encaminha os dados do Filme parao DAO inserir no BD 
                    let novoAtor = await atorDao.insertAtor(dadosAtor)

                    if (novoAtor) {
                        let ultimoID = await atorDao.selectUltimoIdAtor()
                        dadosAtor.id = Number(ultimoID[0].id)
                    }
                    //Validação para verificar se o DAO inseriu os dados no BD
                    if (novoAtor) {

                        //Cria o JSON de retorno dos dados (201)
                        novoAtorJson.ator = dadosAtor
                        novoAtorJson.status = message.SUCESS_CREATED_ITEM.status
                        novoAtorJson.status_code = message.SUCESS_CREATED_ITEM.status_code
                        novoAtorJson.message = message.SUCESS_CREATED_ITEM.message

                        return novoAtorJson //201


                    } else  {
                     

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

const setAtualizarator = async function (id, contentType, dadosAtor) {
     let idAtor = id


    if (idAtor == '' || idAtor == undefined || isNaN(idAtor)) {
        return message.ERROR_INVALID_ID; //400
    } else {
        let ator_id = await atorDao.selectAtorById(idAtor);
        let verificarId = ator_id.length
        if (verificarId > 0) {
        
            try {


                if (String(contentType).toLowerCase() == 'application/json') {



                    let updateAtorJSON = {}

                    if (
                        dadosAtor.nome == '' || dadosAtor.nome == undefined || dadosAtor.nome == null || dadosAtor.nome.length > 100 ||
                        dadosAtor.data_nascimento == '' || dadosAtor.data_nascimento == undefined || dadosAtor.data_nascimento == null || 
                        dadosAtor.data_nascimento.length != 10 ||
                        dadosAtor.biografia == '' || dadosAtor.biografia == undefined || dadosAtor.biografia == null || dadosAtor.biografia>65000 ||
                        dadosAtor.img == '' || dadosAtor.img == undefined || dadosAtor.img == null || dadosAtor.img.length > 200 ||
                        dadosAtor.sexo_id == ''     || dadosAtor.sexo_id==undefined         || dadosAtor.sexo_id ==null || isNaN(dadosAtor.sexo_id)

                    ) {

                        return message.ERROR_REQUIRED_FIELDS //400


                    } else {

                        let validateStatus = false
                        // VAlidação da data de relançamento, já que ela não obrigatória no BD
                        if (
                            dadosAtor.data_falecimento != null &&
                        dadosAtor.data_falecimento != '' &&
                        dadosAtor.data_falecimento != undefined 
                        &&
                        dadosAtor.nome_artistico != null &&
                        dadosAtor.nome_artistico != '' &&
                        dadosAtor.nome_artistico != undefined
    
                        ) {

                            //validação para verificar se a data esta com a qntidade de digitos corretos

                            if (dadosAtor.data_falecimento.length != 10 || dadosAtor.nome_artistico.length > 100) {

                                return message.ERROR_REQUIRED_FIELDS //400

                            } else {

                                validateStatus = true

                            }
                        } else {
                            validateStatus = true
                        }
                        //Validação para verificar se a variavel booleana é verdadeira 
                        if (validateStatus) {

                            
                    //Encaminha os dados
                
                            let atorAtualizado = await atorDao.updateAtor(dadosAtor,id)

                            //Validação para verificar se o DAO inseriu os dados no BD
                            if (atorAtualizado) {
                                //Cria o JSON de retorno dos dados (201)
                                updateAtorJSON.ator = dadosAtor
                                updateAtorJSON.status = message.SUCESS_UPDATED_ITEM.status
                                updateAtorJSON.status_code = message.SUCESS_UPDATED_ITEM.status_code
                                updateAtorJSON.message = message.SUCESS_UPDATED_ITEM.message

                               
                                return updateAtorJSON
                                

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

const setExcluirator= async function (id) {


        try {
            let idAtor = id

            if (idAtor == '' || idAtor == undefined || isNaN(idAtor)) {
                return message.ERROR_INVALID_ID; //400
            } else {
                let dadosAtor = await atorDao.selectAtorById(idAtor);
                let verificarId = dadosAtor.length
                if (verificarId > 0) {
                    dadosAtor = await atorDao.deleteAtor(idAtor);
                  

                 return message.SUCESS_DELETED_ITEM
                    
                   
                } else {
                    return message.ERROR_NOT_FOUND_ID
                }
            }
        } catch {
            return message.ERROR_INTERNAL_SERVER_DB
        }

    }

const getListaratores = async function (){
        try {

            // Cri o objeto JSON
            let atoresJSON = {};
            //Chama a funcão do DAO para retornar os dados da tabela de atores
            let dadosAtores = await atorDao.selectAllAtores();
                if (dadosAtores) {
                    
                    if(dadosAtores.length > 0){
                        for (let ator of dadosAtores){
                            let sexoator = await sexoDAO.selectByIdSexo(ator.sexo_id)
                            delete ator.sexo_id
                            ator.sexo = sexoator
                        }
                        for (let ator of dadosAtores){
                            let nacionalidadeAtor = await nacionalidadeDAO.selectNacionalidadeAtorByid(ator.id)
                            if(nacionalidadeAtor.length > 0)
                                ator.nacionalidade = nacionalidadeAtor
                        }
                        atoresJSON.ator = dadosAtores
                        atoresJSON.quantidade = dadosAtores.length
                        atoresJSON.status_code = 200
                        return atoresJSON

                    } else 
                    return message.ERROR_NOT_FOUND
                } else 
                    return message.ERROR_INTERNAL_SERVER_DB
        } catch (error) {
            return message.ERROR_INTERNAL_SERVER;
        }
    }

const getBuscarAtorById = async function (id){

        try{
    
        
        // Recebe o id do filme
        let idAtor = id;
        //Cria o objeto JSON
        let atorJSON = {};
    
        //tratamento do ID para verificar se o ID é válido(vazio, indefinido ou não numerico)
        if(idAtor == '' || idAtor == undefined || isNaN(idAtor)){
            return message.ERROR_INVALID_ID //400
        } else {
    
            // encaminha o id para o DAO buscar no banco de dados 
            let dadosAtor = await atorDao.selectAtorById(idAtor)
    
            // verifca se o DAO retornou dados 
            if(dadosAtor){
    
                // Validação para verificar a quantidade de itens retornados
                    if(dadosAtor.length > 0){
                        for (let ator of dadosAtor){
                            let sexoator = await sexoDAO.selectByIdSexo(ator.sexo_id)
                            delete ator.sexo_id
                            ator.sexo = sexoator
                        }
                        for (let ator of dadosAtor){
                            let nacionalidadeAtor = await nacionalidadeDAO.selectNacionalidadeAtorByid(ator.id)

                                ator.nacionalidade = nacionalidadeAtor
                            
                        }
                        atorJSON.ator = dadosAtor
                        atorJSON.quantidade = dadosAtor.length
                        atorJSON.status_code = 200
                        return atorJSON
                    } else 
                    return message.ERROR_NOT_FOUND
                } else 
                    return message.ERROR_INTERNAL_SERVER_DB
        } 
        }catch (error) {
            return message.ERROR_INTERNAL_SERVER;
        }
    }

    const getBuscarAtorByIdFilme = async function (id){

        try{
    
        
        // Recebe o id do filme
        let idFilme = id;
        //Cria o objeto JSON
        let atorJSON = {};
    
        //tratamento do ID para verificar se o ID é válido(vazio, indefinido ou não numerico)
        if(idFilme == '' || idFilme == undefined || isNaN(idFilme)){
            return message.ERROR_INVALID_ID //400
        } else {
    
            // encaminha o id para o DAO buscar no banco de dados 
            let dadosAtor = await atorDao.selectAtorByIdFilme(idFilme)
    
            // verifca se o DAO retornou dados 
            if(dadosAtor){
    
                // Validação para verificar a quantidade de itens retornados
                    if(dadosAtor.length > 0){
                        for (let ator of dadosAtor){
                            let sexoator = await sexoDAO.selectByIdSexo(ator.sexo_id)
                            delete ator.sexo_id
                            ator.sexo = sexoator
                        }
                        for (let ator of dadosAtor){
                            let nacionalidadeAtor = await nacionalidadeDAO.selectNacionalidadeAtorByid(ator.id)

                                ator.nacionalidade = nacionalidadeAtor
                            
                        }
                        atorJSON.ator = dadosAtor
                        atorJSON.quantidade = dadosAtor.length
                        atorJSON.status_code = 200
                        return atorJSON
                    } else 
                    return message.ERROR_NOT_FOUND
                } else 
                    return message.ERROR_INTERNAL_SERVER_DB
        } 
        }catch (error) {
            return message.ERROR_INTERNAL_SERVER;
        }
    }






module.exports = {
setInserirNovoAtor,
setAtualizarator,
setExcluirator,
getListaratores,
getBuscarAtorById,
getBuscarAtorByIdFilme
}