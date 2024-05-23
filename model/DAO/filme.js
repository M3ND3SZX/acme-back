
/************************************************************************************************************
 * Objetivo: Arquivo responsavel pelo acesso ao Banco de dados MySQL, aqui faremos o CRUD na tabela filmes
 * Data: 01/02
 * Autor: Julia Mendes
 * Versão: 1.0
 * 
************************************************************************************************************/

//Import da biblioteca do prisma client para manipular scripst SQL
const { PrismaClient } = require( '@prisma/client' );

//Instancia da classe PrismaClient
const prisma = new PrismaClient();

//Função para inserir um filme no BD
const insertFilme = async function(dadosFilme){
   

    let sql 

    try{
        if(dadosFilme.data_relancamento !="" && 
        dadosFilme.data_relancamento != null &&
        dadosFilme.data_relancamento != undefined
        ){

    sql = `insert into tbl_filme ( 
                            nome, 
                            sinopse, 
                            duracao, 
                            data_lancamento,
                            data_relancamento, 
                            foto_capa, 
                            valor_unitario,
                            id_classificacao
                            ) values (
                                replace("${dadosFilme.nome}","'","#"),
                                replace("${dadosFilme.sinopse}", "'", "#"),
                                '${dadosFilme.duracao}',
                                '${dadosFilme.data_lancamento}',
                                '${dadosFilme.data_relancamento}',
                                '${dadosFilme.foto_capa}',
                                '${dadosFilme.valor_unitario}',
                                '${dadosFilme.id_classificacao}'
                            )`
        }else{
            sql = `insert into tbl_filme ( 
                nome, 
                sinopse, 
                duracao, 
                data_lancamento,
                data_relancamento, 
                foto_capa, 
                valor_unitario,
                id_classificacao
                ) values (
                    replace("${dadosFilme.nome}","'","#"),
                    replace("${dadosFilme.sinopse}", "'", "#"),
                    '${dadosFilme.duracao}',
                    '${dadosFilme.data_lancamento}',
                    null,
                    '${dadosFilme.foto_capa}',
                    '${dadosFilme.valor_unitario}',
                    '${dadosFilme.id_classificacao}'
                )`

        }
//$executeRawUnsafe() - serve para executar scripts sem retorno de dados (select, update e delete)
//$queryRawUnsafe() - serve para executar scripts sem retorno de dados(select)
        let rsFilme = await prisma.$executeRawUnsafe(sql)


        if(rsFilme)
            return true
        else
            return false

    } catch(error) {
        return false
    }
}
//Função para atualizar um filme no BD
const updateFilme = async function(dadosFilme, id){
    
    let sql

            try{
         
             if( dadosFilme.data_relancamento != '' &&
                 dadosFilme.data_relancamento != null &&
                 dadosFilme.data_relancamento!= undefined
                 ){
             
                     sql = `update tbl_filme set
                         nome = replace("${dadosFilme.nome}","'","#"),
                         sinopse = replace("${dadosFilme.sinopse}", "'", "#"),
                         duracao = '${dadosFilme.duracao}', 
                         data_lancamento = '${dadosFilme.data_lancamento}', 
                         data_relancamento = '${dadosFilme.data_relancamento}', 
                         foto_capa = '${dadosFilme.foto_capa}', 
                         valor_unitario = '${dadosFilme.valor_unitario}',
                         id_classificacao = '${dadosFilme.id_classificacao}'
                         where tbl_filme.id = ${id}
                         `;
                       
                 }else{
                     sql = `update tbl_filme set
                        nome = replace("${dadosFilme.nome}","'","#"),
                         sinopse =  replace("${dadosFilme.sinopse}", "'", "#"),
                         duracao = '${dadosFilme.duracao}', 
                         data_lancamento = '${dadosFilme.data_lancamento}', 
                         data_relancamento = null, 
                         foto_capa = '${dadosFilme.foto_capa}', 
                         valor_unitario = '${dadosFilme.valor_unitario}',
                         id_classificacao = '${dadosFilme.id_classificacao}'
                         where tbl_filme.id = ${id}
                         `;
                 }
                 
         
            let rsFilme = await prisma.$executeRawUnsafe(sql);
         
                 if(rsFilme)
             return true;
          else
             return false;
         
         }catch  (error) {
             
            return false;
             }
         
         }
      
        
    

//Funçãp para excluir um filme no BD
const deleteFilme = async function(id){
    try {

        let sql = `delete from tbl_filme where id = ${id}`
    
        let rsFilme = await prisma.$executeRawUnsafe(sql);
        console.log(rsFilme)   
        
        if(rsFilme)
        return true
        
       
      } catch (error) {
         
        return false
        }
}

//Funçao para listar todos os filmes do BD
const selectAllFilmes = async function(){

    //Script SQL para Banca de dados
    let sql = 'select * from tbl_filme';

    //.$queryRawUnsafe(sql) -> sempre usar
    //.$queryRawU('select * from tbl_filmes')
    // await = esperar o "resultado"

    //Executa o script SQL no Banco de Dados e recebe o retorno dos dados
    let rsFilmes = await prisma.$queryRawUnsafe(sql);

    //Validação para retornar os dados
    if( rsFilmes.length > 0) 
       return rsFilmes;
    else
       return false;

}

const selectByNome = async function (nome){
 
    try {

    let sql = `select * from tbl_filme where nome LIKE "%${nome}%"`
    let rsFilmes = await prisma.$queryRawUnsafe(sql);

        return rsFilmes;
    } catch (error) {
        return false
    }
    
}

//Função para buscar um filme no BD filtrando pelo ID
const selectByIdFilme = async function(id){

    try {

    //Script SQL para filtrar pelo ID
    let sql = `select * from tbl_filme where id =  ${id}`

    //Executar o SQL no Banco de Dados
    let rsFilme = await prisma.$queryRawUnsafe(sql);

   return rsFilme;
   
  } catch (error) {
        return false
    }
}

const selectUltimoId = async function (){
     try{
        let sql = `select cast(last_insert_id()as DECIMAL) as id from tbl_filme limit 1;`

        let rsFilme = await prisma.$queryRawUnsafe(sql);
        return rsFilme

        
     } catch (error) {
        return false
    }
}






module.exports = {
    insertFilme,
    updateFilme,
    deleteFilme,
    selectAllFilmes,
    selectByNome,
    selectByIdFilme,
    selectUltimoId
}


