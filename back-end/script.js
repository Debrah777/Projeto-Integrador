```javascript
const form = document.getElementById("formUsuario");

const tabela = document.getElementById("tabelaUsuarios");

const mensagem = document.getElementById("mensagem");

/*
========================================
LOCAL STORAGE
========================================
*/

// PEGAR DADOS SALVOS

let usuarios =
    JSON.parse(localStorage.getItem("usuarios")) || [];

// MOSTRAR AO ABRIR A PÁGINA

atualizarTabela();

/*
========================================
CADASTRAR
========================================
*/

form.addEventListener("submit", function(event){

    // EVITA RECARREGAR A PÁGINA

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
    ========================================
    VALIDAÇÕES
    ========================================
    */

    // CAMPOS VAZIOS

    if(
        nome === "" ||
        email === "" ||
        endereco === "" ||
        perfil === ""
    ){

        mensagem.innerHTML =
            "Preencha todos os campos.";

        mensagem.style.color = "red";

        return;
    }

    /*
    ========================================
    EMAIL
    ========================================
    */

    // EMAIL DEVE TER @ E gmail.com

    if(
        !email.includes("@") ||
        !email.endsWith("gmail.com")
    ){

        mensagem.innerHTML =
            "O e-mail deve ser um Gmail válido.";

        mensagem.style.color = "red";

        return;
    }

    /*
    ========================================
    EMAIL DUPLICADO
    ========================================
    */

    const emailExiste = usuarios.find(
        usuario => usuario.email === email
    );

    if(emailExiste){

        mensagem.innerHTML =
            "Erro: e-mail já cadastrado.";

        mensagem.style.color = "red";

        return;
    }

    /*
    ========================================
    OBJETO
    ========================================
    */

    const usuario = {

        nome,
        email,
        endereco,
        perfil

    };

    /*
    ========================================
    SALVAR
    ========================================
    */

    usuarios.push(usuario);

    // SALVAR NO NAVEGADOR

    localStorage.setItem(
        "usuarios",
        JSON.stringify(usuarios)
    );

    /*
    ========================================
    MENSAGEM
    ========================================
    */

    mensagem.innerHTML =
        "Usuário cadastrado com sucesso.";

    mensagem.style.color = "green";

    atualizarTabela();

    form.reset();

});

/*
========================================
ATUALIZAR TABELA
========================================
*/

function atualizarTabela(){

    tabela.innerHTML = "";

    /*
    ========================================
    SEM USUÁRIOS
    ========================================
    */

    if(usuarios.length === 0){

        tabela.innerHTML = `

            <tr class="sem-usuarios">

                <td colspan="5">

                    <div class="vazio">

                        <h3>
                            Nenhum usuário cadastrado.
                        </h3>

                        <p>
                            Cadastre um novo usuário.
                        </p>

                    </div>

                </td>

            </tr>

        `;

        return;
    }

    /*
    ========================================
    MOSTRAR USUÁRIOS
    ========================================
    */

    usuarios.forEach((usuario, index) => {

        tabela.innerHTML += `

            <tr>

                <><td>${usuario.nome}</td><td>${usuario.email}</td><td>${usuario.endereco}</td><td>${usuario.perfil}</td><td>

                    <button
                        class="editar"
                        onclick="editarUsuario(${index})"
                    >

                        Editar

                    </button>

                    <button
                        class="excluir"
                        onclick="excluirUsuario(${index})"
                    >

                        Excluir

                    </button>

                </td></>

            </tr>

        `;
    });
}

/*
========================================
EXCLUIR
========================================
*/

function excluirUsuario(index){

    usuarios.splice(index, 1);

    // ATUALIZAR STORAGE

    localStorage.setItem(
        "usuarios",
        JSON.stringify(usuarios)
    );

    mensagem.innerHTML =
        "Usuário removido.";

    mensagem.style.color = "green";

    atualizarTabela();
}

/*
========================================
EDITAR
========================================
*/

function editarUsuario(index){

    const usuario = usuarios[index];

    document.getElementById("nome").value =
        usuario.nome;

    document.getElementById("email").value =
        usuario.email;

    document.getElementById("endereco").value =
        usuario.endereco;

    document.getElementById("perfil").value =
        usuario.perfil;

    usuarios.splice(index, 1);

    // ATUALIZAR STORAGE

    localStorage.setItem(
        "usuarios",
        JSON.stringify(usuarios)
    );

    atualizarTabela();

    mensagem.innerHTML =
        "Edite os dados e clique em cadastrar.";

    mensagem.style.color = "#2196F3";
}
