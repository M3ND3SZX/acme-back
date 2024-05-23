/************************************************************************************************************
 * Objetivo: Arquivo responsavel pelo acesso ao Banco de dados MySQL, aqui faremos o CRUD na tabela classificacao
 * Data: 18/04
 * Autor: Julia Mendes
 * Versão: 1.0
 * 
************************************************************************************************************/

//Import da biblioteca do prisma client para manipular scripst SQL
const { PrismaClient } = require( '@prisma/client' );


//Instancia da classe PrismaClient
const prisma = new PrismaClient();

const insertClassificacao = async function (dadosClassificacao){
    try{

    
    let sql 
 
        sql = `insert into tbl_classificacao(
            sigla,
            simbolo,
            caracteristicas,
            classificacao
        )values(
            '${dadosClassificacao.sigla}',
            '${dadosClassificacao.simbolo}',
            '${dadosClassificacao.caracteristicas}',
            '${dadosClassificacao.classificacao}'
        )`

    

        let rsClassificacao = await prisma.$executeRawUnsafe(sql)
        if(rsClassificacao)
        return true
    }catch(error){
        return false
    }
        
       

    
}

const selectAllClassificacoes = async function (){

     let sql = 'select * from tbl_classificacao'    
     let rsClassificacao = await prisma.$queryRawUnsafe(sql)


   if( rsClassificacao.length > 0) 
       return rsClassificacao;
    else
       return false;

}

const updateClassificacao = async function (id,dadosClassificacao){
  try{
    let sql 

    sql = `update tbl_classificacao set
        sigla =  '${dadosClassificacao.sigla}',
        simbolo =  '${dadosClassificacao.simbolo}',
        caracteristicas =  '${dadosClassificacao.caracteristicas}',
        classificacao =  '${dadosClassificacao.classificacao}'
        where tbl_classificacao.id = ${id}
   `


    let rsClassificacao = await prisma.$executeRawUnsafe(sql)


     if (rsClassificacao)
     return true
     else
     return false 
}catch(error){
    
    return false
}
}

 const deleteClassificacao = async function (id){

 try {

    let sql = `delete from tbl_classificacao  where id = ${id}`

    let rsFilmes = await prisma.$executeRawUnsafe(sql);  
    if(rsFilmes)
    return true
   
  } catch (error) {
     
    return false
    }


 }

 const selectUltimoIdClassificacao = async function (){
    try{
       let sql = `select cast(last_insert_id()as DECIMAL) as id from tbl_classificacao limit 1;`

       let rsFilmes = await prisma.$queryRawUnsafe(sql)

       return rsFilmes

       
    } catch (error) {
       return false
   }
}


const selectByIdClassificacao = async function (id){
    try{
        let sql = `select * from tbl_classificacao where id = ${id}`

        let rsClassificacao = await prisma.$queryRawUnsafe(sql)

        return rsClassificacao
       

    } catch (error){
        return false
    }

}

const selectClassificacaoByNome = async function (nome){
    try{
        let sql = `select * from tbl_classificacao where  classificacao LIKE "%${nome}%"`

        let rsFilmes = await prisma.$queryRawUnsafe(sql)

        if(rsFilmes)
        return true
    }catch(error){
        return false
    }
}

module.exports = {
    insertClassificacao,
    updateClassificacao,
    deleteClassificacao,
    selectAllClassificacoes,
    selectUltimoIdClassificacao,
    selectByIdClassificacao,
    selectClassificacaoByNome
}