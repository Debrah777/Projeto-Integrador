const form = document.getElementById("formUsuario");
const tabela = document.getElementById("tabelaUsuarios");
const mensagem = document.getElementById("mensagem");

let usuarios = [];

form.addEventListener("submit", function(event){

    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const endereco = document.getElementById("endereco").value;
    const perfil = document.getElementById("perfil").value;

    // VALIDAÇÕES

    if(nome === "" || email === "" || endereco === "" || perfil === ""){
        mensagem.innerHTML = "Preencha todos os campos.";
        mensagem.style.color = "red";
        return;
    }

    if(!email.includes("@")){
        mensagem.innerHTML = "E-mail inválido.";
        mensagem.style.color = "red";
        return;
    }

    // VERIFICAR E-MAIL DUPLICADO

    const emailExiste = usuarios.find(usuario => usuario.email === email);

    if(emailExiste){
        mensagem.innerHTML = "Erro: e-mail já cadastrado.";
        mensagem.style.color = "red";
        return;
    }

    // CADASTRO

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

function atualizarTabela(){

    tabela.innerHTML = "";

    usuarios.forEach((usuario, index) => {

        tabela.innerHTML += `
            <tr>
                <td>${usuario.nome}</td>
                <td>${usuario.email}</td>
                <td>${usuario.endereco}</td>
                <td>${usuario.perfil}</td>

                <td>

                    <button class="editar" onclick="editarUsuario(${index})">
                        Editar
                    </button>

                    <button class="excluir" onclick="excluirUsuario(${index})">
                        Excluir
                    </button>

                </td>

            </tr>
        `;

    });

}

function excluirUsuario(index){

    usuarios.splice(index,1);

    mensagem.innerHTML = "Usuário removido com sucesso.";
    mensagem.style.color = "green";

    atualizarTabela();

}

function editarUsuario(index){

    const usuario = usuarios[index];

    document.getElementById("nome").value = usuario.nome;
    document.getElementById("email").value = usuario.email;
    document.getElementById("endereco").value = usuario.endereco;
    document.getElementById("perfil").value = usuario.perfil;

    usuarios.splice(index,1);

    atualizarTabela();

    mensagem.innerHTML = "Edite os dados e clique em cadastrar novamente.";
    mensagem.style.color = "blue";

}