```javascript id="r1vbwz"
const express = require("express");

const mysql = require("mysql2");

const cors = require("cors");

const app = express();

/*
========================================
CONFIGURAÇÕES
========================================
*/

app.use(cors());

app.use(express.json());

/*
========================================
CONEXÃO MYSQL
========================================
*/

const conexao = mysql.createConnection({

    host: "localhost",

    user: "root",

    password: "",

    database: "rescatto"

});

/*
========================================
TESTAR CONEXÃO
========================================
*/

conexao.connect((erro) => {

    if(erro){

        console.log("Erro ao conectar no MySQL.");

        return;
    }

    console.log("MySQL conectado.");

});

/*
========================================
CADASTRAR USUÁRIO
========================================
*/

app.post("/usuarios", (req, res) => {

    const {

        nome,
        email,
        endereco,
        perfil

    } = req.body;

    /*
    ========================================
    SQL
    ========================================
    */

    const sql = `

        INSERT INTO Usuario
        (
            nome,
            contato,
            endereco,
            perfil
        )

        VALUES (?, ?, ?, ?)

    `;

    conexao.query(

        sql,

        [
            nome,
            email,
            endereco,
            perfil
        ],

        (erro) => {

            if(erro){

                console.log(erro);

                return res.status(500).json({

                    mensagem:
                        "Erro ao cadastrar."

                });

            }

            res.status(200).json({

                mensagem:
                    "Usuário cadastrado."

            });

        }

    );

});

/*
========================================
LISTAR USUÁRIOS
========================================
*/

app.get("/usuarios", (req, res) => {

    const sql = `

        SELECT * FROM Usuario

    `;

    conexao.query(

        sql,

        (erro, resultado) => {

            if(erro){

                console.log(erro);

                return res.status(500).json([]);

            }

            res.status(200).json(resultado);

        }

    );

});

/*
========================================
EXCLUIR USUÁRIO
========================================
*/

app.delete("/usuarios/:id", (req, res) => {

    const id = req.params.id;

    const sql = `

        DELETE FROM Usuario
        WHERE id_usuario = ?

    `;

    conexao.query(

        sql,

        [id],

        (erro) => {

            if(erro){

                console.log(erro);

                return res.status(500).json({

                    mensagem:
                        "Erro ao excluir."

                });

            }

            res.status(200).json({

                mensagem:
                    "Usuário removido."

            });

        }

    );

});

/*
========================================
ATUALIZAR USUÁRIO
========================================
*/

app.put("/usuarios/:id", (req, res) => {

    const id = req.params.id;

    const {

        nome,
        email,
        endereco,
        perfil

    } = req.body;

    const sql = `

        UPDATE Usuario

        SET

            nome = ?,
            contato = ?,
            endereco = ?,
            perfil = ?

        WHERE id_usuario = ?

    `;

    conexao.query(

        sql,

        [
            nome,
            email,
            endereco,
            perfil,
            id
        ],

        (erro) => {

            if(erro){

                console.log(erro);

                return res.status(500).json({

                    mensagem:
                        "Erro ao atualizar."

                });

            }

            res.status(200).json({

                mensagem:
                    "Usuário atualizado."

            });

        }

    );

});

/*
========================================
SERVIDOR
========================================
*/

app.listen(3000, () => {

    console.log("Servidor rodando na porta 3000.");

});