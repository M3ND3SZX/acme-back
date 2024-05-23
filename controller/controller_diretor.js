/************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, consistência de dados das  requisicões da API de diretores
 * Data: 25/04
 * Autor: Julia Mendes
 * Versão: 1.0
 * 
************************************************************************************************************/

//Import do arquivo de configuração do projeto
const message = require('../modulo/config.js')

//Import do arquivo DAO que fará a comunicação com o Banco de Dados
const diretorDAO = require('../model/DAO/diretor.js')
const nacionalidadeDAO = require ('../model/DAO/nacionalidade.js')
const sexoDAO = require ('../model/DAO/sexo.js')


const setInserirNovoDiretor = async function (dadosDiretor, contentType) {
    try {


        if (String(contentType).toLowerCase() == 'application/json') {



            let novoDiretorJson = {}

            if (
                dadosDiretor.nome == '' || dadosDiretor.nome == undefined || dadosDiretor.nome == null || dadosDiretor.nome.length > 100 ||
                dadosDiretor.data_nascimento == '' || dadosDiretor.data_nascimento == undefined || dadosDiretor.data_nascimento == null || dadosDiretor.data_nascimento.length != 10 ||
                dadosDiretor.biografia == '' || dadosDiretor.biografia == undefined || dadosDiretor.biografia == null || dadosDiretor.biografia>65000 ||
                dadosDiretor.img == '' || dadosDiretor.img == undefined || dadosDiretor.img == null || dadosDiretor.img.length > 200 ||
                dadosDiretor.sexo_id ==''     ||dadosDiretor.sexo_id == undefined         ||dadosDiretor.sexo_id ==null || isNaN(dadosDiretor.sexo_id)
            ) {
           

                return message.ERROR_REQUIRED_FIELDS //400


            } else {

                let validateStatus = false

                if (
                    dadosDiretor.data_falecimento != null &&
                    dadosDiretor.data_falecimento != '' &&
                    dadosDiretor.data_falecimento != undefined

                ) {

                    //validação para verificar se a data esta com a qntidade de digitos corretos

                    if (dadosDiretor.data_falecimento.length != 10) {

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
                    let novoDiretor = await diretorDAO.insertDiretor(dadosDiretor)

                    if (novoDiretor) {
                        let ultimoID = await diretorDAO.selectUltimoIdDiretor()
                        dadosDiretor.id = Number(ultimoID[0].id)
                    }
                    //Validação para verificar se o DAO inseriu os dados no BD
                    if (novoDiretor) {

                        //Cria o JSON de retorno dos dados (201)
                        novoDiretorJson.diretor = dadosDiretor
                        novoDiretorJson.status = message.SUCESS_CREATED_ITEM.status
                        novoDiretorJson.status_code = message.SUCESS_CREATED_ITEM.status_code
                        novoDiretorJson.message = message.SUCESS_CREATED_ITEM.message

                        return novoDiretorJson //201


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

const setAtualizarDiretor = async function (id, contentType, dadosDiretor) {
     let idDiretor = id


    if (idDiretor == '' || idDiretor == undefined || isNaN(idDiretor)) {
        return message.ERROR_INVALID_ID; //400
    } else {
        let diretorId = await diretorDAO.selectDiretorByID(idDiretor);
        let verificarId = diretorId.length
        if (verificarId > 0) {
        
            try {


                if (String(contentType).toLowerCase() == 'application/json') {



                    let updateDiretorJson = {}

                    if (
                        dadosDiretor.nome == '' || dadosDiretor.nome == undefined || dadosDiretor.nome == null || dadosDiretor.nome.length > 100 ||
                        dadosDiretor.data_nascimento == '' || dadosDiretor.data_nascimento == undefined || dadosDiretor.data_nascimento == null || 
                        dadosDiretor.data_nascimento.length != 10 ||
                        dadosDiretor.biografia == '' || dadosDiretor.biografia == undefined || dadosDiretor.biografia == null || dadosDiretor.biografia>65000 ||
                        dadosDiretor.img == '' || dadosDiretor.img == undefined || dadosDiretor.img == null || dadosDiretor.img.length > 200 ||
                        dadosDiretor.sexo_id == ''     || dadosDiretor.sexo_id==undefined         || dadosDiretor.sexo_id ==null || isNaN(dadosDiretor.sexo_id)

                    ) {

                        return message.ERROR_REQUIRED_FIELDS //400


                    } else {

                        let validateStatus = false
                        // VAlidação da data de relançamento, já que ela não obrigatória no BD
                        if (
                            dadosDiretor.data_falecimento != null &&
                            dadosDiretor.data_falecimento != '' &&
                            dadosDiretor.data_falecimento != undefined
    
                        ) {

                            //validação para verificar se a data esta com a qntidade de digitos corretos

                            if (dadosDiretor.data_falecimento.length != 10) {

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
                
                            let diretorAtualizado = await diretorDAO.updateDiretor(dadosDiretor,id)

                            //Validação para verificar se o DAO inseriu os dados no BD
                            if (diretorAtualizado) {
                                //Cria o JSON de retorno dos dados (201)
                                updateDiretorJson.diretor = dadosDiretor
                                updateDiretorJson.status = message.SUCESS_UPDATED_ITEM.status
                                updateDiretorJson.status_code = message.SUCESS_UPDATED_ITEM.status_code
                                updateDiretorJson.message = message.SUCESS_UPDATED_ITEM.message

                               
                                return updateDiretorJson
                                

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

const setExcluirDiretor= async function (id) {


        try {
            let idDiretor = id

            if (idDiretor == '' || idDiretor == undefined || isNaN(idDiretor)) {
                return message.ERROR_INVALID_ID; //400
            } else {
                let dadosDiretor = await diretorDAO.selectDiretorByID(idDiretor);
                let verificarId = dadosDiretor.length
                if (verificarId > 0) {
                    dadosDiretor = await diretorDAO.deleteDiretor(idDiretor);
                    if(dadosDiretor){
                    let deletarNacionalidade = await diretorDAO.deleteNacionaidadeDiretor(idDiretor)
                   
                }

                 return message.SUCESS_DELETED_ITEM
                    
                   
                } else {
                    return message.ERROR_NOT_FOUND_ID
                }
            }
        } catch {
            return message.ERROR_INTERNAL_SERVER_DB
        }

    }

const getListarDiretores = async function (){
        try {

            // Cri o objeto JSON
            let diretoresJSON = {};
            //Chama a funcão do DAO para retornar os dados da tabela de atores
            let dadosDiretores = await diretorDAO.selectAllDiretores();
                if (dadosDiretores) {
                    
                    if(dadosDiretores.length > 0){
                        for (let diretor of dadosDiretores){
                            let sexoDiretor = await sexoDAO.selectByIdSexo(diretor.sexo_id)
                            delete diretor.sexo_id
                            diretor.sexo = sexoDiretor
                        }
                        for (let diretor of dadosDiretores){
                            let nacionalidadeDiretor = await nacionalidadeDAO.selectNacionalidadeDiretorById(diretor.id)
                            if(nacionalidadeDiretor.length > 0)
                                diretor.nacionalidade = nacionalidadeDiretor
                        }
                        diretoresJSON.diretor = dadosDiretores
                        diretoresJSON.quantidade = dadosDiretores.length
                        diretoresJSON.status_code = 200
                        return diretoresJSON
                    } else 
                    return message.ERROR_NOT_FOUND
                } else 
                    return message.ERROR_INTERNAL_SERVER_DB
        } catch (error) {
            return message.ERROR_INTERNAL_SERVER;
        }
    }

const getBuscarDiretorId = async function (id){

        try{
    
        
        // Recebe o id do filme
        let idDiretor = id;
        //Cria o objeto JSON
        let diretorJSON = {};
    
        //tratamento do ID para verificar se o ID é válido(vazio, indefinido ou não numerico)
        if(idDiretor == '' || idDiretor == undefined || isNaN(idDiretor)){
            return message.ERROR_INVALID_ID //400
        } else {
    
            // encaminha o id para o DAO buscar no banco de dados 
            let dadosDiretor = await diretorDAO.selectDiretorByID(idDiretor)
    
            // verifca se o DAO retornou dados 
            if(dadosDiretor){
    
                // Validação para verificar a quantidade de itens retornados
                    if(dadosDiretor.length > 0){
                        for (let diretor of dadosDiretor){
                            let sexoDiretor = await sexoDAO.selectByIdSexo(diretor.sexo_id)
                            delete diretor.sexo_id
                            diretor.sexo = sexoDiretor
                        }
                        for (let diretor of dadosDiretor){
                            let nacionalidadeDiretor = await nacionalidadeDAO.selectNacionalidadeDiretorById(diretor.id)

                                diretor.nacionalidade = nacionalidadeDiretor
                            
                        }
                        diretorJSON.diretor = dadosDiretor
                        diretorJSON.quantidade = dadosDiretor.length
                        diretorJSON.status_code = 200
                        return diretorJSON
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
setInserirNovoDiretor,
setAtualizarDiretor,
setExcluirDiretor,
getListarDiretores,
getBuscarDiretorId


}