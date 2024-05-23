/************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, consistência de dados das  requisicões da API de Sexo
 * Data: 25/04
 * Autor: Julia Mendes
 * Versão: 1.0
************************************************************************************************************/

const message = require('../modulo/config.js')

const sexoDAO = require('../model/DAO/sexo.js')

const getListarSexo = async function (){

    try{

    let sexoJSON = {}

    let dadosSexo = await sexoDAO.selectAllSexos()


    if (dadosSexo){

        if(dadosSexo.length > 0 ){
            sexoJSON.sexos = dadosSexo
            sexoJSON.quantidade = dadosSexo.length
           sexoJSON.status_code = 200
            

            return sexoJSON

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


 const getBuscarSexoById = async function (id){

    let idSexo = id 

    let sexoJSON = {}

    if (idSexo == '' || idSexo == undefined || isNaN(idSexo)) {
        return message.ERROR_INVALID_ID; //400
    } else {

        //Encaminha o ID para o DAO buscar no Banco de Dados 
        let dadosSexo = await sexoDAO.selectByIdSexo(idSexo)

        //Verifica se o DAO retornou dados
        if (dadosSexo) {

            //Validação para vereficar a quantidade de itens retornados
            if (dadosSexo.length > 0) {

                //Cria o JSON para retorno
                sexoJSON.sexos = dadosSexo;
                sexoJSON.status_code = 200;

                return sexoJSON

            } else {
                return message.ERROR_NOT_FOUND; //404
            }

        } else {
            return message.ERROR_INTERNAL_SERVER_DB; //500
        }
    }

 }

 module.exports ={
    getBuscarSexoById,
    getListarSexo
 }
