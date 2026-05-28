const form = document.getElementById("formUsuario");

const tabela = document.getElementById("tabelaUsuarios");

const API = "http://localhost:3000";

/*
========================
LISTAR USUÁRIOS
========================
*/

window.addEventListener("DOMContentLoaded", () => {

    listarUsuarios();

});

/*
========================
CADASTRAR
========================
*/

form.addEventListener("submit", async (event) => {

    event.preventDefault();

    const nome =
        document.getElementById("nome").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const endereco =
        document.getElementById("endereco").value.trim();

    const perfil =
        document.getElementById("perfil").value;

    /*
    ========================
    VALIDAÇÕES
    ========================
    */

    if(
        nome === "" ||
        email === "" ||
        endereco === "" ||
        perfil === ""
    ){
        return;
    }

    if(
        !email.includes("@") ||
        !email.endsWith("gmail.com")
    ){
        return;
    }

    /*
    ========================
    ENVIAR
    ========================
    */

    try{

        await fetch(

            `${API}/usuarios`,

            {

                method: "POST",

                headers: {

                    "Content-Type":
                        "application/json"

                },

                body: JSON.stringify({

                    nome,
                    email,
                    endereco,
                    perfil

                })

            }

        );

        form.reset();

        listarUsuarios();

    }

    catch(erro){

        console.log(erro);

    }

});

/*
========================
LISTAR
========================
*/

async function listarUsuarios(){

    try{

        const resposta = await fetch(

            `${API}/usuarios`

        );

        const usuarios = await resposta.json();

        tabela.innerHTML = "";

        if(usuarios.length === 0){

            tabela.innerHTML = `

                <tr>

                    <td colspan="5">

                        Nenhum usuário cadastrado.

                    </td>

                </tr>

            `;

            return;
        }

        usuarios.forEach((usuario) => {

            tabela.innerHTML += `

                <tr>

                    <td>${usuario.nome}</td>

                    <td>${usuario.contato}</td>

                    <td>${usuario.endereco}</td>

                    <td>${usuario.perfil}</td>

                    <td>

                        <button
                            class="editar"
                            onclick="editarUsuario(
                                ${usuario.id_usuario},
                                '${usuario.nome}',
                                '${usuario.contato}',
                                '${usuario.endereco}',
                                '${usuario.perfil}'
                            )"
                        >

                            Editar

                        </button>

                        <button
                            class="excluir"
                            onclick="excluirUsuario(
                                ${usuario.id_usuario}
                            )"
                        >

                            Excluir

                        </button>

                    </td>

                </tr>

            `;
        });

    }

    catch(erro){

        console.log(erro);

    }

}

/*
========================
EXCLUIR
========================
*/

async function excluirUsuario(id){

    try{

        await fetch(

            `${API}/usuarios/${id}`,

            {

                method: "DELETE"

            }

        );

        listarUsuarios();

    }

    catch(erro){

        console.log(erro);

    }

}

/*
========================
EDITAR
========================
*/

function editarUsuario(

    id,
    nome,
    contato,
    endereco,
    perfil

){

    document.getElementById("nome").value =
        nome;

    document.getElementById("email").value =
        contato;

    document.getElementById("endereco").value =
        endereco;

    document.getElementById("perfil").value =
        perfil;

    excluirUsuario(id);

}