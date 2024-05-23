create database db_acme_filmes_turma_ba;
use db_acme_filmes_turma_ba;

create table tbl_classificacao (
id int not null auto_increment primary key,
sigla varchar(2) not null,
simbolo varchar(200) not null,
caracteristicas  varchar(150) not null,
classificacao varchar(100) not null,
unique key (id)
);
insert into tbl_classificacao(
            sigla,
            simbolo,
            caracteristicas,
            classificacao
        )values(
            'L',
            'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/DJCTQ_-_L.svg/480px-DJCTQ_-_L.svg.png',
            'Não expõe crianças a conteúdos potencialmente prejudiciais',
            'Livre'
        );
        
        select * from tbl_classificacao where  classificacao LIKE "Li%";
        
        insert into tbl_classificacao(
            sigla,
            simbolo,
            caracteristicas,
            classificacao
        )values(
            'ssssL',
            'teste.comsssm',
            'Não expõe crianças a conteúdos potencialmente prejudiciaissss',
            'Livressss'
            );
            
		update tbl_classificacao set
        sigla =  'la',
        simbolo =  'lalalalalalal',
        caracteristicas =  'lalalalalalal',
        classificacao =  'lalalalalala'
        where tbl_classificacao.id = 1 ;
        
        update tbl_classificacao set
        sigla =  'L1',
        simbolo =  'https://logodownload.org/wp-content/uploads/2017/07/classificacao-livre-logo.png',
        caracteristicas =  'Não expõe crianças a conteúdos potencialmente prejudiciaissss',
        classificacao =  'Lalalala'
        where tbl_classificacao.id = 3;
            
          
          select * from tbl_classificacao;

create table tbl_filme (
id int not null auto_increment primary key,
nome varchar(80) not null,
sinopse text not null,
duracao time not null,
data_lancamento date not null,
data_relancamento date,
foto_capa varchar(200) not null,
valor_unitario float not null,
id_classificacao integer not null,
/*FK -onde vem - para onde vai*/
constraint FK_CLASSIFICACAO_FILME
foreign key (id_classificacao) 
references tbl_classificacao (id),

unique key (id),
unique index(id)
);

alter table tbl_filme 
    modify column duracao time not null;

create table tbl_sexo (
id int primary key not null auto_increment,
sigla varchar(1),
nome varchar(15),
unique key (id)
);

select * from tbl_sexo;


insert into tbl_sexo (sigla, nome) 
values
( 'F', 'feminino' ),
( 'M', 'masculino' );

create table tbl_nacionalidade (
id int not null primary key auto_increment,
nacionalidade varchar(50), 
unique key (id)
);
 rename table nacionalidade to tbl_nacionalidade;
insert into tbl_nacionalidade(nacionalidade)
 values
 ('brasileiro'),
 ('americano'),
 ('italiano'),
 ('espanhol'),
 ('portugues'),
 ('canadense');

create table tbl_genero (
id int primary key not null auto_increment,
genero varchar(45) not null,
unique key (id)
);

update tbl_genero set
            genero =  'Romance'
            where tbl_genero.id = 1;

alter table tbl_genero
	modify column genero varchar (45) not null;


create table tbl_ator (
id int not null auto_increment primary key,
nome varchar(100) not null,
nome_artistico varchar(100),
data_nascimento date not null,
data_falecimento date ,
biografia text ,
img varchar(200) not null,
sexo_id int not null, 

constraint FK_SEXO_ATOR 
foreign key (sexo_id) 
references tbl_sexo (id),

unique key (id),
unique index (id)
);

alter table tbl_ator 
	modify column img varchar(200) not null;
    
select * from tbl_filme;
insert into tbl_ator (nome, nome_artistico, data_nascimento, data_falecimento, biografia, img, sexo_id)values
(
'Wagner Moura',
null,
'1990-05-10',
null,
null,
'https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcQDaf7oW7Rbk2kd25GNoFAa1l26Hdy8611z0KJou0CzyFG77qamKfsoJUHL5X46aUrChNLJD0HIMbP0LKw',
2
);

create table tbl_diretor (
id int primary key not null auto_increment,
nome varchar (100) not null,
data_nascimento date not null,
data_falecimento date,
biografia text not null,
img varchar(200) not null,
sexo_id int not null,

constraint FX_SEXO_DIRETOR
foreign key (sexo_id) references tbl_sexo(id),

unique key (id),
unique index (id)

);

select * from tbl_diretor;

insert into tbl_diretor (nome, data_nascimento, data_falecimento, biografia, img, sexo_id)values
(
'Ricardo',
'2006-12-21',
null,
'lalalalalalallalala',
'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
2
);

update tbl_filme set
                     nome = replace("${dadosDiretor.nome}","'","#"),
                     data_nascimento = '${dadosDiretor.data_nascimento}',
                     data_falecimento = null , 
                     biografia = '${dadosDiretor.biografia}',
                     img = '${dadosDiretor.img}',
                     sexo_id = '${dadosDiretor.sexo_id}'
                     where tbl_diretor.id = id;

alter table tbl_diretor 
	change column data_nacimento data_nascimento date not null;
    
    select tn.nacionalidade from tbl_nacionalidade  as tn join tbl_diretor as td join tbl_nacionalidade_diretor as tnd on tnd.diretor_id = td.id 
        and  tn.id = tnd.nacionalidade_id where td.id = 6;
        
        select tn.nacionalidade from tbl_nacionalidade as tn join tbl_ator as ta join tbl_nacionalidade_ator as tna
         on tna.ator_id = ta.id and  tn.id = tna.nacionalidade_id where ta.id = 2;
         
         
		insert into tbl_filme ( nome, sinopse, duracao, data_lancamento, data_relancamento, foto_capa, valor_unitario, id_classificacao
                            ) values (
                                replace("${dadosFilme.nome}","'","#"),
                                replace("${dadosFilme.sinopse}", "'", "#"),
                                '${dadosFilme.duracao}',
                                '${dadosFilme.data_lancamento}',
                                '${dadosFilme.data_relancamento}',
                                '${dadosFilme.foto_capa}',
                                '${dadosFilme.valor_unitario}',
                                '${dadosFilme.id_classificacao}'
                            );
         
         
         select * from tbl_nacionalidade_diretor;

create table tbl_filme_diretor(
id int primary key not null auto_increment,
filme_id int not null,
diretor_id int not null,

constraint FK_FILME_FILMEDIRETOR
foreign key (filme_id) references tbl_filme(id),

constraint FK_DIRETOR_FILMEDIRETOR
foreign key (diretor_id) references tbl_diretor(id),

unique key (id),
unique index(id)

);

create table tbl_filme_ator(
id int primary key not null auto_increment,
filme_id int not null,
ator_id int not null,

constraint FK_FILME_FILMEATOR
foreign key (filme_id) references tbl_filme(id),

constraint FK_ATOR_FILMEATOR
foreign key (ator_id) references tbl_ator(id),


unique key (id),
unique index (id)
);


create table tbl_nacionalidade_diretor(
id int primary key not null auto_increment,
nacionalidade_id int not null,
diretor_id int not null,

constraint FK_NACIONALIDADE_NACIONALIDADEDIRETOR
foreign key (nacionalidade_id) references tbl_nacionalidade(id),


constraint FK_DIRETOR_NACIONALIDADEDIRETOR
foreign key (diretor_id) references tbl_diretor(id),

unique key (id),
unique index(id)

);

insert into tbl_nacionalidade_diretor (nacionalidade_id, diretor_id) values (
2,6
);

select tn.nacionalidade from tbl_diretor  as td join tbl_nacionalidade as tn join tbl_nacionalidade_diretor as tnd on tnd.diretor_id = td.id 
and  tn.id = tnd.nacionalidade_id where td.id = 6;



/* trás todos os atores com a nacionalidade pesquisada*/
SELECT tbl_ator.nome
FROM tbl_ator
JOIN tbl_nacionalidade_ator ON tbl_ator.id = tbl_nacionalidade_ator.ator_id
JOIN tbl_nacionalidade ON tbl_nacionalidade_ator.nacionalidade_id = tbl_nacionalidade.id
WHERE tbl_nacionalidade.nacionalidade = 'brasileiro';


select tn.nacionalidade from tbl_nacionalidade as tn join tbl_ator as ta join tbl_nacionalidade_ator as tna
         on tna.ator_id = ta.id and  tn.id = tna.nacionalidade_id where ta.nome = 'Wagner Moura';



        
create table tbl_nacionalidade_ator(
id int primary key not null auto_increment,
nacionalidade_id int not null,
ator_id int not null,

constraint FK_NACIONALIDADE_NACIONALIDADEATOR
foreign key (nacionalidade_id) references tbl_nacionalidade(id),


constraint FK_ATOR_NACIONALIDADEATOR
foreign key (ator_id) references tbl_ator(id),

unique key (id),
unique index(id)

);

insert into tbl_nacionalidade_ator(nacionalidade_id, ator_id)values(1,2);



create table tbl_filme_genero(
id int primary key not null auto_increment,
genero_id int not null,
filme_id int not null,

constraint FK_GENERO_FILMEGENERO
foreign key (genero_id) references tbl_genero (id),

constraint FK_FILME_FILMEGENERO
foreign key (filme_id) references tbl_filme(id),

unique key (id),
unique index (id)

);

select tg.id,genero from tbl_genero as tg join tbl_filme as tf join tbl_filme_genero as tfg
         on tfg.filme_id = tf.id and  tg.id = tfg.genero_id where tf.id = 1;
         
         select tn.nacionalidade from tbl_nacionalidade as tn join tbl_ator as ta join tbl_nacionalidade_ator as tna
         on tna.ator_id = ta.id and  tn.id = tna.nacionalidade_id where ta.nome = 'Wagner Moura';


show tables;



/*

ALTER TABLE 

-adicionar coluna 
alter table tbl_filme 
	add column nomeDaColuna text not null;
    
-deletar a coluna e todos os dados presentes nela    
alter table tbl_filme
	drop column nomeDaColuna;

-modifica a estrutura de uma coluna (era varchar (80) virou varchar(100)
alter table tbl_filme
	modify column sinopse varchar (100) not null;
    
-modifica a estrutura de uma coluna (deixar de ser not null)
- só troca o tipo de dados
alter table tbl_filme
	modify column sinopse varchar (100);
  
-Permite renomear a coluna e alterar os tipos de dados 
-troca o nome e o tipo de dados
alter table tbl_filme 
	change column sinopse sinopse_filme varchar(100);


-Retira a constraint de uma tabela 
alter table tbl_filme_ator
	drop foreign key FK_FILME_FILMEATOR;
-Quebandro a relação eu posso apagar a tabela filme 

alter table tbl_filme_ator
	add constraint FK_FILME_FILMEATOR
    foreign key (id_filme)
    references tbl_filme(id);
    
-mostra todos os nomes das constraint presentes no banco

    select * from information_schema.table_contraints 
    where constraint_schema = 'nome do banco de dados'

-renomeia o nome da tabela
    rename table nacionalidade to tbl_nacionalidade;
    
*/



