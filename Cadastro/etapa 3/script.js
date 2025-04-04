// Função para capturar os dados do formulário e enviá-los para o servidor
document.getElementById("formulario").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita o comportamento padrão de envio do formulário

    // Captura os dados do formulário
    const nome = document.getElementById("nome").value;
    const idade = document.getElementById("idade").value;
    const fone = document.getElementById("fone").value;

    // Criação de um objeto para armazenar os dados
    const dados = {
        nome: nome,
        idade: idade,
        fone: fone
    };

    // Envia os dados para o servidor
    fetch('http://localhost:3000/salvar-dados', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            alert(data.message);
            preencherTabela();  // Atualiza a tabela após salvar os dados
        } else {
            alert("Erro ao salvar os dados.");
        }
    })
    .catch(error => {
        alert("Erro ao comunicar com o servidor.");
    });

    // Limpa os campos do formulário após submissão
    document.getElementById("formulario").reset();
});

// Função para preencher a tabela com os dados do db.json
function preencherTabela() {
    fetch('http://localhost:3000/dados')  // Certifique-se de que a URL está correta
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao buscar os dados.');
        }
        return response.json();
    })
    .then(dados => {
        const tableBody = document.getElementById("table-body");
        tableBody.innerHTML = ""; // Limpa a tabela antes de adicionar novos dados

        // Adiciona cada linha de dados à tabela
        dados.forEach(dado => {
            const tr = document.createElement("tr");

            const tdNome = document.createElement("td");
            tdNome.textContent = dado.nome;
            tr.appendChild(tdNome);

            const tdIdade = document.createElement("td");
            tdIdade.textContent = dado.idade;
            tr.appendChild(tdIdade);

            const tdFone = document.createElement("td");
            tdFone.textContent = dado.fone;
            tr.appendChild(tdFone);

            // Adiciona a linha à tabela
            tableBody.appendChild(tr);
        });
    })
    .catch(error => {
        console.error("Erro ao carregar os dados da tabela:", error);
        alert('Erro ao carregar os dados da tabela. Verifique o console para mais detalhes.');
    });
}


// Chama a função para preencher a tabela quando a página é carregada
window.onload = preencherTabela;
