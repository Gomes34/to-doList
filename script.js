// Selecionar elementos do HTML pelo ID
const inputItem = document.querySelector("#nomeItemInput"); // Seleciona o input de item pelo ID
const botaoAdd = document.querySelector("#botaoAdd"); // Seleciona o botão de adicionar pelo ID
const container = document.querySelector("#container"); // Seleciona o container pelo ID
let numeracaoId = 0; // Variável para controlar a numeração do ID dos itens

// Função para adicionar um novo item
function adicionarItem() {
    
    // Verificar se o input tem algo escrito e se não é um número
    let item = inputItem.value;
    if (item == '' || !isNaN(item)){
        exibirMensagemErro(); // Chama a função para exibir a mensagem de erro
        return false; // Interrompe a execução da função
    } else {
        // Criar uma string com o HTML do novo item
        const novoItem = `
            <div class="listaItens" id="${numeracaoId}">
                <div class="iconeCheck">
                    <i id="checkCircle${numeracaoId}" class="checkCircle" onclick="marcarConcluido(${numeracaoId})"></i>
                </div>
                <div class="item">
                    <p>${item}</p>
                </div>
                <div class="botaoDeletar">
                    <input type="button" value="Deletar" onclick="deletarItem(${numeracaoId})">
                </div>
            </div>`;

        // Adicionar o HTML do novo item ao container e aumentar o contador de ID
        container.innerHTML += novoItem;
        numeracaoId++;

        limparInputItem(); // Chama a funcao para limpar a barra de pesquisa e dar foco ao input
    }
}

// Adicionar item quando a tecla Enter for pressionada no input
inputItem.addEventListener("keyup", (event) => {
    if(event.keyCode === 13){
        event.preventDefault();
        botaoAdd.click();
    }
});

// Função para exibir a mensagem de erro
function exibirMensagemErro(){
    botaoAdd.value = 'Você deve preencher o campo acima! (Contendo texto)';
    botaoAdd.style.backgroundColor = 'red';
    setTimeout(() => (
        botaoAdd.value = 'Adicionar',
        botaoAdd.style.backgroundColor = 'rgb(133, 192, 44)'
    ), 2000);
}

// Função para limpar o input de item
function limparInputItem(){
    inputItem.value = "";
    inputItem.focus();
}

// Função para deletar um item
function deletarItem(idItem){
    let deletarItemId = document.getElementById(idItem);
    deletarItemId.remove();
}

// Função para marcar um item como concluído ou não concluído
function marcarConcluido(idItem){
    let item = document.getElementById(idItem);
    let classeItem = item.getAttribute('class');

    if (classeItem == "listaItens"){
        item.classList.add('checkTrueText'); // Adicionar classe para estilo de item concluído
        let circle = document.getElementById("checkCircle" + idItem);
        circle.classList.add('checkTrue'); // Adicionar classe para estilo concluído ao checkCircle
        item.parentNode.appendChild(item); // Mover o item para o final do container (z-index)
    } else {
        let circle = document.getElementById("checkCircle" + idItem);
        let item = document.getElementById(idItem);
        item.classList.remove('checkTrueText'); // Remover classe de estilo de item concluído
        circle.classList.remove('checkTrue'); // Remover classe de estilo de círculo de check concluído
    }
}