/************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, consistência de dados das  requisicões da API de Genero
 * Data: 11/04
 * Autor: Julia Mendes
 * Versão: 1.0
 * //para conversar direto com o banco
************************************************************************************************************/

const message = require('../modulo/config.js')

const generoDAO = require('../model/DAO/genero.js')

const setInserirNovoGenero = async function (dadosGenero, contentType) {
    
    try{
      
        if (String(contentType).toLowerCase() == 'application/json'){
           
            let novoGeneroJSON = {}

            if(
               dadosGenero.genero == '' 
            || dadosGenero.genero == undefined 
            || dadosGenero.genero == null           
            || dadosGenero.genero.length > 45 
            ){
                return message.ERROR_REQUIRED_FIELDS
            } else {
               
                let novoGenero = await generoDAO.insertGenero(dadosGenero)
               
                if (novoGenero){
                
                    let ultimoID = await generoDAO.selectUltimoIdGenero()
                   
                    dadosGenero.id = Number(ultimoID[0].id)
                    
                }
                
                if (novoGenero){
                    novoGeneroJSON.genero = dadosGenero
                    novoGeneroJSON.status = message.SUCESS_CREATED_ITEM.status
                    novoGeneroJSON.status_code = message.SUCESS_CREATED_ITEM.status_code
                    novoGeneroJSON.message = message.SUCESS_CREATED_ITEM.message
                    
                    return novoGeneroJSON //201
                }else {
                    return message.ERROR_INTERNAL_SERVER_DB // 500 
                }
            }
            
        
        }else{
            return message.ERROR_CONTENT_TYPE//415
        }
        
    }catch(error){
        return message.ERROR_INTERNAL_SERVER //500 erro na controller
    }
}

const getListarGenero = async function (){

    try{

    let generoJSON = {}

    let dadosGenero = await generoDAO.selectAllGeneros()


    if (dadosGenero){

        if(dadosGenero.length > 0 ){
            generoJSON.generos = dadosGenero
            generoJSON.quantidade = dadosGenero.length
            generoJSON.status_code = 200
            

            return generoJSON

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

const getBuscarGeneroById = async function (id){
    let idGenero = id 

    let generoJSON = {}

    if (idGenero == '' || idGenero == undefined || isNaN(idGenero)) {
        return message.ERROR_INVALID_ID; //400
    } else {

        //Encaminha o ID para o DAO buscar no Banco de Dados 
        let dadosGenero= await generoDAO.selectByIdGenero(idGenero);
        console.log(dadosGenero);

        //Verifica se o DAO retornou dados
        if (dadosGenero) {

            //Validação para vereficar a quantidade de itens retornados
            if (dadosGenero.length > 0) {

                //Cria o JSON para retorno
                generoJSON.genero = dadosGenero;
                generoJSON.status_code = 200;

                return generoJSON

            } else {
                return message.ERROR_NOT_FOUND; //404
            }

        } else {
            return message.ERROR_INTERNAL_SERVER_DB; //500
        }
    }

}

const setExcluirGenero = async function (id){
    try{
        let idGenero = id 

        if (idGenero == '' || idGenero == undefined || isNaN(idGenero)) {
            return message.ERROR_INVALID_ID; //400
        } else {
            let dadosGenero = await generoDAO.selectByIdGenero(idGenero);
            let verificarId = dadosGenero.length
            if (verificarId > 0) {

                dadosGenero = await generoDAO.deleteGenero(idGenero)
                
                return message.SUCESS_DELETED_ITEM
            } else {
                return message.ERROR_NOT_FOUND_ID
            }
        }
    } catch {
        return message.ERROR_INTERNAL_SERVER_DB
    }

       
    
}

const setAtualizarGenero = async function (id, dadosGenero, contentType){

   
    let idGenero = id



    if (idGenero== '' || idGenero == undefined || isNaN(idGenero)) {
        return message.ERROR_INVALID_ID; 
        }else {
          
            let result = await generoDAO.selectByIdGenero(idGenero);
            let verificarId = result.length
            if (verificarId > 0) {
                
                try{

                    if (String(contentType).toLowerCase() == 'application/json'){

                        let updateGeneroJson = {}

                        if(
                            dadosGenero.genero == '' 
                         || dadosGenero.genero == undefined 
                         || dadosGenero.genero == null           
                         || dadosGenero.genero.length > 45 
                         ){
                            return message.ERROR_REQUIRED_FIELDS
                        } else {

                            let generoAtualizado = await generoDAO.updateGenero(id, dadosGenero)
            
                            
                            if (generoAtualizado){
                               updateGeneroJson.genero = dadosGenero
                               updateGeneroJson.status = message.SUCESS_UPDATED_ITEM.status
                               updateGeneroJson.status_code = message.SUCESS_UPDATED_ITEM.status_code
                               updateGeneroJson.message = message.SUCESS_UPDATED_ITEM.message
                                
                                return updateGeneroJson //201
                            }else {
                                return message.ERROR_INTERNAL_SERVER_DB // 500 
                            }


                        }

                    }else{
                        return message.ERROR_CONTENT_TYPE
                    }
                }catch(error){
                    return message.ERROR_INTERNAL_SERVER
                }
            }else{
                return message.ERROR_NOT_FOUND_ID
            }

        

        }
    
    }

    


    module.exports = {
        setInserirNovoGenero,
        getListarGenero,
        getBuscarGeneroById,
        setExcluirGenero,
        setAtualizarGenero
    
    }