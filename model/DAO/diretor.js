/************************************************************************************************************
 * Objetivo: Arquivo responsavel pelo acesso ao Banco de dados MySQL, aqui faremos o CRUD na tabela DIRETOR
 * 
 * Data: 11/04
 * Autor: Julia Mendes
 * Versão: 1.0
 * 
************************************************************************************************************/

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();


const insertDiretor = async function(dadosDiretor){
   

    let sql 

    try{
        if(dadosDiretor.data_falecimento !="" && 
        dadosDiretor.data_falecimento != null &&
        dadosDiretor.data_falecimento != undefined
        ){

    sql = `insert into tbl_diretor( 
                            nome,  
                            data_nascimento,
                            data_falecimento, 
                            biografia,
                            img,
                            sexo_id
                            ) values (
                                replace("${dadosDiretor.nome}","'","#"),
                                '${dadosDiretor.data_nascimento}',
                                '${dadosDiretor.data_falecimento}',
                                '${dadosDiretor.biografia}',
                                '${dadosDiretor.img}',
                                '${dadosDiretor.sexo_id}'
                            )`
        }else{
            sql = `insert into tbl_diretor( 
                            nome,  
                            data_nascimento, 
                            data_falecimento, 
                            biografia,
                            img,
                            sexo_id
                            ) values (
                                replace("${dadosDiretor.nome}","'","#"),
                                '${dadosDiretor.data_nascimento}',
                                null,
                                '${dadosDiretor.biografia}',
                                '${dadosDiretor.img}',
                                '${dadosDiretor.sexo_id}'
                )`

        }


        let rsDiretor = await prisma.$executeRawUnsafe(sql)

        if(rsDiretor){
            return true
        }else
            return false

    } catch(error) {
        return false
    }
}


const updateDiretor = async function(dadosDiretor, id){
    
    let sql

            try{
         
             if( dadosDiretor.data_falecimento !="" && 
             dadosDiretor.data_falecimento != null &&
             dadosDiretor.data_falecimento != undefined
                 ){
             
                     sql = `update tbl_diretor set
                         nome = replace("${dadosDiretor.nome}","'","#"),
                         data_nascimento = '${dadosDiretor.data_nascimento}',
                         data_falecimento = '${dadosDiretor.data_falecimento}', 
                         biografia = '${dadosDiretor.biografia}',
                         img = '${dadosDiretor.img}',
                         sexo_id = '${dadosDiretor.sexo_id}'
                         where tbl_diretor.id = ${id}
                         `;
                       
                 }else{
                     sql = `update tbl_diretor set
                     nome = replace("${dadosDiretor.nome}","'","#"),
                     data_nascimento = '${dadosDiretor.data_nascimento}',
                     data_falecimento = null , 
                     biografia = '${dadosDiretor.biografia}',
                     img = '${dadosDiretor.img}',
                     sexo_id = '${dadosDiretor.sexo_id}'
                     where tbl_diretor.id = ${id}
                         `;
                 }
                 
         
            let rsDiretor = await prisma.$executeRawUnsafe(sql);
            
         
            if(rsDiretor){
            
             return true;
            }else
             return false;
         
         }catch  (error) {
             
            return false;
             }
         
         }


    const selectAllDiretores = async function (){
        let sql = 'select * from tbl_diretor';
    
        //Executa o script SQL no Banco de Dados e recebe o retorno dos dados
        let rsDiretor = await prisma.$queryRawUnsafe(sql);
    
        //Validação para retornar os dados
        if( rsDiretor.length > 0) 
           return rsDiretor;
        else
           return false;

    }

    const selectDiretorByID = async function (id){
        try {

            let sql = `select * from tbl_diretor where id =  ${id}`
        
            //Executar o SQL no Banco de Dados
            let rsDiretor = await prisma.$queryRawUnsafe(sql);
        
           return rsDiretor;
           
          } catch (error) {
                return false
            }

    }


    const deleteDiretor = async function (id){
        try {

            let sql = `delete from tbl_diretor where id = ${id}`
        
            let rsDiretor = await prisma.$executeRawUnsafe(sql);
              
            
            if(rsDiretor)
            return true
            
           
          } catch (error) {
             
            return false
            }

    }      

    const deleteNacionaidadeDiretor = async function (id){
        try {

            let sql = `delete from tbl_nacionalidade_diretor where diretor_id = ${id}`
        
            let rsDiretor = await prisma.$executeRawUnsafe(sql);
              
            
            if(rsDiretor)
            return true
            
           
          } catch (error) {
             
            return false
            }


    }
        

    const selectUltimoIdDiretor = async function (){
        try{
           let sql = `select cast(last_insert_id()as DECIMAL) as id from tbl_diretor limit 1;`
   
           let rsDiretor = await prisma.$queryRawUnsafe(sql);
           return rsDiretor
   
           
        } catch (error) {
           return false
       }
   }


   const selectDiretorByIdFilme = async function (id){
    try{
       let sql = ` SELECT
       td.id,
       td.nome,
       td.data_nascimento,
       td.data_falecimento,
       td.biografia,
       td.img,
       td.sexo_id
   FROM
       tbl_diretor AS td
   JOIN
       tbl_filme_diretor AS tfd ON tfd.diretor_id = td.id
   JOIN
       tbl_filme AS tf ON tf.id = tfd.filme_id
   WHERE
       tf.id = ${id};`

       let rsDiretor = await prisma.$queryRawUnsafe(sql);
       return rsDiretor

       
    } catch (error) {
       return false
   }
}




module.exports ={
    insertDiretor,
    updateDiretor,
    selectAllDiretores,
    selectDiretorByID,
    deleteDiretor,
    deleteNacionaidadeDiretor,
    selectUltimoIdDiretor,
    selectDiretorByIdFilme

}

