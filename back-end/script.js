const form = document.getElementById("formUsuario");

const tabela = document.getElementById("tabelaUsuarios");

const mensagem = document.getElementById("mensagem");

let usuarios = [];

// CADASTRAR

form.addEventListener("submit", function(event){

    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();

    const email = document.getElementById("email").value.trim();

    const endereco = document.getElementById("endereco").value.trim();

    const perfil = document.getElementById("perfil").value;

    // VALIDAÇÕES

    if(
        nome === "" ||
        email === "" ||
        endereco === "" ||
        perfil === ""
    ){

        mensagem.innerHTML = "Preencha todos os campos.";

        mensagem.style.color = "red";

        return;
    }

    if(!email.includes("@")){

        mensagem.innerHTML = "E-mail inválido.";

        mensagem.style.color = "red";

        return;
    }

    // VERIFICAR EMAIL DUPLICADO

    const emailExiste = usuarios.find(
        usuario => usuario.email === email
    );

    if(emailExiste){

        mensagem.innerHTML = "E-mail já cadastrado.";

        mensagem.style.color = "red";

        return;
    }

    // OBJETO

    const usuario = {

        nome,
        email,
        endereco,
        perfil

    };

    usuarios.push(usuario);

    mensagem.innerHTML = "Usuário cadastrado com sucesso.";

    mensagem.style.color = "green";

    atualizarTabela();

    form.reset();

});

// ATUALIZAR TABELA

function atualizarTabela(){

    tabela.innerHTML = "";

    // SEM USUÁRIOS

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

    // PREENCHER TABELA

    usuarios.forEach((usuario, index) => {

        tabela.innerHTML += `

            <tr>

                <td>${usuario.nome}</td>

                <td>${usuario.email}</td>

                <td>${usuario.endereco}</td>

                <td>${usuario.perfil}</td>

                <td>

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

                </td>

            </tr>

        `;
    });
}

// EXCLUIR

function excluirUsuario(index){

    usuarios.splice(index, 1);

    mensagem.innerHTML = "Usuário removido.";

    mensagem.style.color = "green";

    atualizarTabela();
}

// EDITAR

function editarUsuario(index){

    const usuario = usuarios[index];

    document.getElementById("nome").value = usuario.nome;

    document.getElementById("email").value = usuario.email;

    document.getElementById("endereco").value = usuario.endereco;

    document.getElementById("perfil").value = usuario.perfil;

    usuarios.splice(index, 1);

    atualizarTabela();

    mensagem.innerHTML =
        "Edite os dados e clique em cadastrar.";

    mensagem.style.color = "#2196F3";
}