/************************************************************************************************************
 * Objetivo: Arquivo responsavel pelo acesso ao Banco de dados MySQL, aqui faremos o CRUD na tabela genero
 * 
 * Data: 11/04
 * Autor: Julia Mendes
 * Versão: 1.0
 * 
************************************************************************************************************/

const { PrismaClient } = require( '@prisma/client' );

const prisma = new PrismaClient();

const insertGenero = async function (dadosGenero){
    try{

    
        let sql 
     
            sql = `insert into tbl_genero(
                genero
            )values(
                '${dadosGenero.genero}'
            )`
    
        
    
            let rsGenero = await prisma.$executeRawUnsafe(sql)
            if(rsGenero)
            return true
        }catch(error){
            return false
        }
            
}

const selectAllGeneros = async function (){
    
    let sql = 'select * from tbl_genero'    
    let rsGenero = await prisma.$queryRawUnsafe(sql)


  if( rsGenero.length > 0) 
      return rsGenero;
   else
      return false;
}

const updateGenero = async function (id, dadosGenero) {

    try{
        let sql 
    
        sql = `update tbl_genero set
            genero =  '${dadosGenero.genero}'
            where tbl_genero.id = ${id}
       `
       
    
        let rsGenero = await prisma.$executeRawUnsafe(sql)
    
    
         if (rsGenero)
         return true
         else
         return false 
    }catch(error){
        return false
    }

}

const deleteGenero = async function (id){

    try {
   
       let sql = `delete from tbl_genero  where id = ${id}`

       console.log(sql);
   
       let rsGenero = await prisma.$executeRawUnsafe(sql);  
      
       if(rsGenero)
       return true
      
     } catch (error) {
        
       return false
       }
   
}

const selectUltimoIdGenero = async function (){
    try{
       let sql = `select cast(last_insert_id()as DECIMAL) as id from tbl_genero limit 1;`

       let rsGenero = await prisma.$queryRawUnsafe(sql)

       return rsGenero

       
    } catch (error) {
       return false
   }
}

const selectByIdGenero = async function (id){
    try{
        let sql = `select * from tbl_genero where id = ${id}`

        let rsGenero = await prisma.$queryRawUnsafe(sql)

        return rsGenero
       

    } catch (error){
        return false
    }

}

const selectGeneroByNome = async function (nome){
    try{
        let sql = `select * from tbl_genero where nome LIKE "%${nome}%"`

        let rsGenero= await prisma.$queryRawUnsafe(sql)

        if(rsGenero)
        return true
    }catch(error){
        return false
    }
}

const selectGeneroFilmeById = async function (id){

    try{
        let sql = `select tg.id,genero from tbl_genero as tg join tbl_filme as tf join tbl_filme_genero as tfg
        on tfg.filme_id = tf.id and  tg.id = tfg.genero_id where tf.id  = ${id}`

        let rsFilme = await prisma.$queryRawUnsafe(sql)

        return rsFilme

    }catch(error){

        return false

    }
}


module.exports = {
    insertGenero,
    selectAllGeneros,
    updateGenero,
    deleteGenero,
    selectUltimoIdGenero,
    selectByIdGenero,
    selectGeneroByNome,
    selectGeneroFilmeById
}