/************************************************************************************************************
 * Objetivo: Arquivo responsavel pelo acesso ao Banco de dados MySQL, aqui faremos o CRUD na tabela ATOR
 * 
 * Data: 02/05
 * Autor: Julia Mendes
 * Versão: 1.0
 * 
************************************************************************************************************/

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();


const insertAtor = async function(dadosAtor){
   

    let sql 

    try{
        if(dadosAtor.data_falecimento !="" && 
        dadosAtor.data_falecimento != null &&
        dadosAtor.data_falecimento != undefined
         &&
        dadosAtor.nome_artistico !="" && 
        dadosAtor.nome_artistico != null &&
        dadosAtor.nome_artistico != undefined

        
        ){

    sql = `insert into tbl_ator( 
                            nome, 
                            nome_artistico, 
                            data_nascimento,
                            data_falecimento, 
                            biografia, 
                            img, 
                            sexo_id
                            ) values (
                                replace("${dadosAtor.nome}","'","#"),
                                replace("${dadosAtor.nome_artistico}","'","#"),
                                '${dadosAtor.data_nascimento}',
                                '${dadosAtor.data_falecimento}',
                                '${dadosAtor.biografia}',
                                '${dadosAtor.img}',
                                '${dadosAtor.sexo_id}'
                            )`
        }else if (
        dadosAtor.data_falecimento !="" && 
        dadosAtor.data_falecimento != null &&
        dadosAtor.data_falecimento != undefined
         &&
        dadosAtor.nome_artistico == null
        ){
            sql = `insert into tbl_ator( 
                nome, 
                nome_artistico, 
                data_nascimento,
                data_falecimento, 
                biografia, 
                img, 
                sexo_id
                ) values (
                    replace("${dadosAtor.nome}","'","#"),
                    null,
                    '${dadosAtor.data_nascimento}',
                    '${dadosAtor.data_falecimento}',
                    '${dadosAtor.biografia}',
                    '${dadosAtor.img}',
                    '${dadosAtor.sexo_id}'
                )`

        } else if (
        dadosAtor.nome_artistico !="" && 
        dadosAtor.nome_artistico != null &&
        dadosAtor.nome_artistico != undefined
         &&
        dadosAtor.data_falecimento == null
        ){
            sql = `insert into tbl_ator( 
                nome, 
                nome_artistico, 
                data_nascimento,
                data_falecimento, 
                biografia, 
                img, 
                sexo_id
                ) values (
                    replace("${dadosAtor.nome}","'","#"),
                    replace("${dadosAtor.nome_artistico}","'","#"),
                    '${dadosAtor.data_nascimento}',
                     null,
                    '${dadosAtor.biografia}',
                    '${dadosAtor.img}',
                    '${dadosAtor.sexo_id}'
                )`

        }else{

            sql = `insert into tbl_ator( 
                nome, 
                nome_artistico, 
                data_nascimento,
                data_falecimento, 
                biografia, 
                img, 
                sexo_id
                ) values (
                    replace("${dadosAtor.nome}","'","#"),
                    null,
                    '${dadosAtor.data_nascimento}',
                     null,
                    '${dadosAtor.biografia}',
                    '${dadosAtor.img}',
                    '${dadosAtor.sexo_id}'
                )`

        }


        let rsAtor = await prisma.$executeRawUnsafe(sql)

        if(rsAtor){
            return true
        }else
            return false

    } catch(error) {
        return false
    }
}


const updateAtor = async function(dadosAtor, id){
    
    let sql

            try{

                if(dadosAtor.data_falecimento !="" && 
                dadosAtor.data_falecimento != null &&
                dadosAtor.data_falecimento != undefined
                 &&
                dadosAtor.nome_artistico !="" && 
                dadosAtor.nome_artistico != null &&
                dadosAtor.nome_artistico != undefined
        
                
                ){
        
            sql = `update tbl_ator set
            nome = replace("${dadosAtor.nome}","'","#"),
            nome_artistico = replace("${dadosAtor.nome_artistico}","'","#"),
            data_nascimento = '${dadosAtor.data_nascimento}',
            data_falecimento = '${dadosAtor.data_falecimento}', 
            biografia = '${dadosAtor.biografia}',
            img = '${dadosAtor.img}',
            sexo_id = '${dadosAtor.sexo_id}'
            where tbl_ator.id = ${id}
            `;

            
               
           } else if (
                dadosAtor.nome_artistico !="" && 
                dadosAtor.nome_artistico != null &&
                dadosAtor.nome_artistico != undefined
                 &&
                dadosAtor.data_falecimento == null
            ){
                    sql = `update tbl_ator set
                    nome = replace("${dadosAtor.nome}","'","#"),
                    nnome_artistico = replace("${dadosAtor.nome_artistico}","'","#"),
                    data_nascimento = '${dadosAtor.data_nascimento}',
                    data_falecimento = null, 
                    biografia = '${dadosAtor.biografia}',
                    img = '${dadosAtor.img}',
                    sexo_id = '${dadosAtor.sexo_id}'
                    where tbl_ator.id = ${id}
                    ` 
                }else if ( 
                dadosAtor.data_falecimento !="" && 
                dadosAtor.data_falecimento != null &&
                dadosAtor.data_falecimento != undefined
                 &&
                dadosAtor.nome_artistico == null
                ){
                    sql = `update tbl_ator set
                    nome = replace("${dadosAtor.nome}","'","#"),
                    nome_artistico = null,
                    data_nascimento = '${dadosAtor.data_nascimento}',
                    data_falecimento = '${dadosAtor.data_falecimento}', 
                    biografia = '${dadosAtor.biografia}',
                    img = '${dadosAtor.img}',
                    sexo_id = '${dadosAtor.sexo_id}'
                    where tbl_ator.id = ${id}
                    `;
                    
                }else{

                    sql = `update tbl_ator set
                    nome = replace("${dadosAtor.nome}","'","#"),
                    nome_artistico = null,
                    data_nascimento = '${dadosAtor.data_nascimento}',
                    data_falecimento = null, 
                    biografia = '${dadosAtor.biografia}',
                    img = '${dadosAtor.img}',
                    sexo_id = '${dadosAtor.sexo_id}'
                    where tbl_ator.id = ${id}
                    `;


                }
    
         
            let rsAtor = await prisma.$executeRawUnsafe(sql);
            
         
            if(rsAtor){
            
             return true;
            }else
             return false;
         
         }catch  (error) {
             
            return false;
             }
         
         }


    const selectAllAtores = async function (){
        let sql = 'select * from tbl_ator';
    
        //Executa o script SQL no Banco de Dados e recebe o retorno dos dados
        let rsAtor = await prisma.$queryRawUnsafe(sql);
    
        //Validação para retornar os dados
        if( rsAtor.length > 0) 
           return rsAtor;
        else
           return false;

    }

    const selectAtorById = async function (id){
        try {

            let sql = `select * from tbl_ator where id =  ${id}`
        
            //Executar o SQL no Banco de Dados
            let rsAtor = await prisma.$queryRawUnsafe(sql);
        
           return rsAtor;
           
          } catch (error) {
                return false
            }

    }


    const deleteAtor = async function (id){
        try {

            let sql = `delete from tbl_ator where id = ${id}`
        
            let rsAtor = await prisma.$executeRawUnsafe(sql);
              
            
            if (rsAtor)
            return true
            
           
          } catch (error) {
             
            return false
            }

    }      

    const deleteNacionalidadeAtor = async function (id){
        try {

            let sql = `delete from tbl_nacionalidade_ator where ator_id = ${id}`
        
            let rsAtor = await prisma.$executeRawUnsafe(sql);
              
            
            if (rsAtor)
            return true
            
           
          } catch (error) {
             
            return false
            }


    }
        

    const selectUltimoIdAtor = async function (){
        try{
           let sql = `select cast(last_insert_id()as DECIMAL) as id from tbl_ator limit 1;`
   
           let rsAtor = await prisma.$queryRawUnsafe(sql);
           return rsAtor
   
           
        } catch (error) {
           return false
       }
   }


   const selectAtorByIdFilme = async function (id){
    try{
       let sql = `    SELECT
       ta.nome, ta.nome_artistico, ta.data_nascimento, ta.data_falecimento, ta.biografia, ta.img, ta.sexo_id
   FROM
       tbl_ator AS ta
   JOIN
       tbl_filme_ator AS tfa ON tfa.ator_id = ta.id
   JOIN
       tbl_filme AS tf ON tf.id = tfa.filme_id
   WHERE
       tf.id = ${id};`

       let rsDiretor = await prisma.$queryRawUnsafe(sql);
       return rsDiretor

       
    } catch (error) {
       return false
   }
}

module.exports ={
    insertAtor,
    updateAtor,
    selectAllAtores,
    selectAtorById,
    deleteAtor,
    deleteNacionalidadeAtor,
    selectUltimoIdAtor,
    selectAtorByIdFilme

}

