/************************************************************************************************************
 * Objetivo: Arquivo responsavel pelo acesso ao Banco de dados MySQL, aqui faremos o GET na tabela Sexo
 * Data: 25/04
 * Autor: Julia Mendes
 * Versão: 1.0
 * 
************************************************************************************************************/

//Import da biblioteca do prisma client para manipular scripst SQL
const { PrismaClient } = require( '@prisma/client' );


//Instancia da classe PrismaClient
const prisma = new PrismaClient();


const selectAllSexos = async function (){

    let sql = 'select sigla, nome  from tbl_sexo'    
    let rsSexo = await prisma.$queryRawUnsafe(sql)

    console.log(rsSexo);


  if( rsSexo.length > 0) 
      return rsSexo;
   else
      return false;

}

const selectByIdSexo = async function (id){
    
    try{
        let sql = `select sigla, nome from tbl_sexo where id = ${id}`

        let rsSexo = await prisma.$queryRawUnsafe(sql)

        return rsSexo
       

    } catch (error){
        return false
    }

}


module.exports = {
    selectAllSexos,
    selectByIdSexo
}