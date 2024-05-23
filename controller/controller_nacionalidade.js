/************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, consistência de dados das  requisicões da API de Nacionalidade
 * Data: 25/04
 * Autor: Julia Mendes
 * Versão: 1.0
************************************************************************************************************/

const message = require('../modulo/config.js')

const nacionalidadeDAO = require('../model/DAO/nacionalidade.js')

const getListarNacionalidade = async function (){

    try{

    let nacionalidadeJSON = {}

    let dadosNacionalidade = await nacionalidadeDAO.selectAllNacionalidades()


    if (dadosNacionalidade){

        if(dadosNacionalidade.length > 0 ){
            nacionalidadeJSON.nacionalidades = dadosNacionalidade
            nacionalidadeJSON.quantidade = dadosNacionalidade.length
            nacionalidadeJSON.status_code = 200
            

            return nacionalidadeJSON

        }else{
            return message.ERROR_NOT_FOUND
        }
    }else{
        return message.ERROR_INTERNAL_SERVER_DB
    }
    
}catch(error){
    return message.ERROR_INTERNAL_SERVER
}
    
}


 const getBuscarNacionalidadeById = async function (id){

    let idNacionalidade = id 

    let nacionalidadeJSON = {}

    if (idNacionalidade == '' || idNacionalidade == undefined || isNaN(idNacionalidade)) {
        return message.ERROR_INVALID_ID; //400
    } else {

        //Encaminha o ID para o DAO buscar no Banco de Dados 
        let dadosNacionalidade= await nacionalidadeDAO.selectByIdNacionalidade(idNacionalidade);

        //Verifica se o DAO retornou dados
        if (dadosNacionalidade) {

            //Validação para vereficar a quantidade de itens retornados
            if (dadosNacionalidade.length > 0) {

                //Cria o JSON para retorno
                nacionalidadeJSON.nacionalidade = dadosNacionalidade;
                nacionalidadeJSON.status_code = 200;

                return nacionalidadeJSON

            } else {
                return message.ERROR_NOT_FOUND; //404
            }

        } else {
            return message.ERROR_INTERNAL_SERVER_DB; //500
        }
    }

 }

 module.exports ={
    getBuscarNacionalidadeById,
    getListarNacionalidade
 }
