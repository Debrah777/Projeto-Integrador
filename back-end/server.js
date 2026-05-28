const express = require("express");

const mysql = require("mysql2");

const cors = require("cors");

const app = express();

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

        console.log("Erro ao conectar.");

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

        (erro, resultado) => {

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
SERVIDOR
========================================
*/

app.listen(3000, () => {

    console.log("Servidor rodando.");

});