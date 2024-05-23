/************************************************************************************************************
 * Objetivo: Arquivo responsavel pelo acesso ao Banco de dados MySQL, aqui faremos o GET na tabela Nacionalidade
 * Data: 25/04
 * Autor: Julia Mendes
 * Versão: 1.0
 * 
************************************************************************************************************/

//Import da biblioteca do prisma client para manipular scripst SQL
const { PrismaClient } = require( '@prisma/client' );


//Instancia da classe PrismaClient
const prisma = new PrismaClient();


const selectAllNacionalidades = async function (){

    let sql = 'select * from tbl_nacionalidade'    
    let rsNacionalidade = await prisma.$queryRawUnsafe(sql)


  if( rsNacionalidade.length > 0) 
      return rsNacionalidade;
   else
      return false;

}

const selectByIdNacionalidade = async function (id){
    try{
        let sql = `select * from tbl_nacionalidade where id = ${id}`
        

        let rsNacionalidade = await prisma.$queryRawUnsafe(sql)

        return rsNacionalidade
       

    } catch (error){
        return false
    }

}

const selectNacionalidadeAtorByid = async function (id){

    try{
        let sql = `select tn.nacionalidade from tbl_nacionalidade as tn join tbl_ator as ta join tbl_nacionalidade_ator as tna
         on tna.ator_id = ta.id and  tn.id = tna.nacionalidade_id where ta.id = ${id}`

        let rsNacionalidade = await prisma.$queryRawUnsafe(sql)

        return rsNacionalidade

    }catch(error){

        return false

    }
}

const selectNacionalidadeDiretorById = async function (id){

    try{

        let sql = `select tn.nacionalidade from tbl_diretor  as td join tbl_nacionalidade as tn join tbl_nacionalidade_diretor as tnd on tnd.diretor_id = td.id 
        and  tn.id = tnd.nacionalidade_id where td.id = ${id}`

        let rsNacionalidade = await prisma.$queryRawUnsafe(sql)

        console.log(rsNacionalidade);

        return rsNacionalidade


    }catch(error){
        return false
    }
}






module.exports = {
    selectAllNacionalidades,
    selectByIdNacionalidade,
    selectNacionalidadeAtorByid,
    selectNacionalidadeDiretorById
}