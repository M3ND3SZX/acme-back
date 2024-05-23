/************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, consistência de dados das  requisicões da API de Classificação
 * Data: 18/04
 * Autor: Julia Mendes
 * Versão: 1.0
 * //para conversar direto com o banco
************************************************************************************************************/

const message = require('../modulo/config.js')

const classificacaoDAO = require('../model/DAO/classificacao.js')

const setInserirNovaClassificacao = async function (dadosClassificacao, contentType) {
    
    try{
      
        if (String(contentType).toLowerCase() == 'application/json'){
           
            let novaClassificacaoJson = {}

            if(dadosClassificacao.sigla == ''        || dadosClassificacao.sigla == undefined           || dadosClassificacao.sigla == null           || dadosClassificacao.sigla.length > 2      ||
            dadosClassificacao.simbolo == ''         || dadosClassificacao.sigla == undefined           || dadosClassificacao.simbolo == null         || dadosClassificacao.simbolo.length >200          ||
            dadosClassificacao.caracteristicas == '' || dadosClassificacao.caracteristicas == undefined || dadosClassificacao.caracteristicas == null || dadosClassificacao.caracteristicas.length > 150 ||  
            dadosClassificacao.classificacao == ''   || dadosClassificacao.classificacao == undefined   || dadosClassificacao.classificacao === null  || dadosClassificacao.classificacao.length > 100 
            ){
                return message.ERROR_REQUIRED_FIELDS
            } else {
               
                let novaClassificacao = await classificacaoDAO.insertClassificacao(dadosClassificacao)
               
                if (novaClassificacao){
                
                    let ultimoID = await classificacaoDAO.selectUltimoIdClassificacao()
                   
                    dadosClassificacao.id = Number(ultimoID[0].id)
                    
                }
                
                if (novaClassificacao){
                    novaClassificacaoJson.classificacao = dadosClassificacao
                    novaClassificacaoJson.status = message.SUCESS_CREATED_ITEM.status
                    novaClassificacaoJson.status_code = message.SUCESS_CREATED_ITEM.status_code
                    novaClassificacaoJson.message = message.SUCESS_CREATED_ITEM.message
                    
                    return novaClassificacaoJson //201
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

const getListarclassificacao = async function (){

    try{

    let classificacaoJSON = {}

    let dadosClassificacao = await classificacaoDAO.selectAllClassificacoes()

    console.log(dadosClassificacao)

    if (dadosClassificacao){

        if(dadosClassificacao.length > 0 ){
            classificacaoJSON.classificacoes = dadosClassificacao
            classificacaoJSON.quantidade = dadosClassificacao.length
            classificacaoJSON.status_code = 200
            

            return classificacaoJSON

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

const getBuscarClassificacaoById = async function (id){
    let idClassificacao = id 

    let classificacaoJSON = {}

    if (idClassificacao == '' || idClassificacao == undefined || isNaN(idClassificacao)) {
        return message.ERROR_INVALID_ID; //400
    } else {

        //Encaminha o ID para o DAO buscar no Banco de Dados 
        let dadosClassificacao= await classificacaoDAO.selectByIdClassificacao(idFilme);

        //Verifica se o DAO retornou dados
        if (dadosClassificacao) {

            //Validação para vereficar a quantidade de itens retornados
            if (dadosClassificacao.length > 0) {

                //Cria o JSON para retorno
                classificacaoJSON.classificacao = dadosClassificacao;
                classificacaoJSON.status_code = 200;

                return classificacaoJSON;

            } else {
                return message.ERROR_NOT_FOUND; //404
            }

        } else {
            return message.ERROR_INTERNAL_SERVER_DB; //500
        }
    }

}

const setExcluirClassificacao = async function (id){
    try{
        let idClassificacao = id 

        if (idClassificacao == '' || idClassificacao == undefined || isNaN(idClassificacao)) {
            return message.ERROR_INVALID_ID; //400
        } else {
            let dadosClassificacao = await classificacaoDAO.selectByIdClassificacao(idClassificacao);
            let verificarId = dadosClassificacao.length
            if (verificarId > 0) {

                dadosClassificacao = await classificacaoDAO.deleteClassificacao(idClassificacao)
            
                return message.SUCESS_DELETED_ITEM
            } else {
                return message.ERROR_NOT_FOUND_ID
            }
        }
    } catch {
        return message.ERROR_INTERNAL_SERVER_DB
    }

       
    
}

const setAtualizarClassificacao = async function (id, dadosClassificacao, contentType){

   
    let idClassificacao = id

    console.log(idClassificacao);

    if (idClassificacao == '' || idClassificacao == undefined || isNaN(idClassificacao)) {
        
        return message.ERROR_INVALID_ID; 
        }else {
          
            let result = await classificacaoDAO.selectByIdClassificacao(idClassificacao);
            let verificarId = result.length
            if (verificarId > 0) {
                
                try{

                    if (String(contentType).toLowerCase() == 'application/json'){

                        let updateClassificacaoJson = {}

                        if(dadosClassificacao.sigla == ''        || dadosClassificacao.sigla == undefined           || dadosClassificacao.sigla == null           || dadosClassificacao.sigla.length > 2      ||
                        dadosClassificacao.simbolo == ''         || dadosClassificacao.sigla == undefined           || dadosClassificacao.simbolo == null         || dadosClassificacao.simbolo.length >200          ||
                        dadosClassificacao.caracteristicas == '' || dadosClassificacao.caracteristicas == undefined || dadosClassificacao.caracteristicas == null || dadosClassificacao.caracteristicas.length > 150 ||  
                        dadosClassificacao.classificacao == ''   || dadosClassificacao.classificacao == undefined   || dadosClassificacao.classificacao === null  || dadosClassificacao.classificacao.length > 100 
                        ){
                            return message.ERROR_REQUIRED_FIELDS
                        } else {

                            let classificacaoAtualizada = await classificacaoDAO.updateClassificacao(id,dadosClassificacao)
            
                            
                            if (classificacaoAtualizada){
                               updateClassificacaoJson.classificacao = dadosClassificacao
                               updateClassificacaoJson.status = message.SUCESS_CREATED_ITEM.status
                               updateClassificacaoJson.status_code = message.SUCESS_CREATED_ITEM.status_code
                               updateClassificacaoJson.message = message.SUCESS_CREATED_ITEM.message
                                
                                return updateClassificacaoJson //201
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

const getBuscarClassificacaoNome = async(nome) => {
        // Cria o objeto JSON
   
        try{
   
        
        let nomeClassificacao = nome
        let classificacaoJSON = {};
   
       if (nomeClassificacao == '' || nomeClassificacao == undefined){
        console.log(nomeClassificacao);
           return message.ERROR_INVALID_ID
       } else {
            //Chama a funcão do DAO para retornar os dados da tabela de filmes
        let dadosClassificacao = await classificacaoDAO.selectClassificacaoByNome(nomeClassificacao)
   
   
        if(dadosClassificacao){
           if(dadosClassificacao.length > 0){
                   classificacaoJSON.classificacao = dadosClassificacao;
                   classificacaoJSON.status_code = 200;
   
                   // console.log(filmesJSON)
   
                   return classificacaoJSON;
           } else {
               return message.ERROR_NOT_FOUND;
           }
        } else {
           return message.ERROR_INTERNAL_SERVER_DB
        }
   
       }
     } catch (error){
       return message.ERROR_INTERNAL_SERVER
     }
   }





         

module.exports = {
    setInserirNovaClassificacao,
    getListarclassificacao,
    getBuscarClassificacaoById,
    setExcluirClassificacao,
    setAtualizarClassificacao,
    getBuscarClassificacaoNome

}


