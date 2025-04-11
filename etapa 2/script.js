document.addEventListener("DOMContentLoaded", () => {
    // Se o formulário foi enviado
    const form = document.getElementById("formulario");
    form.addEventListener("submit", function (e) {
        e.preventDefault(); // Evita o envio do formulário

        // Captura os dados dos campos
        const nome = document.getElementById("nome").value;
        const idade = document.getElementById("idade").value;
        const fone = document.getElementById("fone").value;

        // Cria um objeto com os dados
        const dados = {
            nome: nome,
            idade: idade,
            fone: fone
        };

        // Armazena os dados no localStorage
        let tabelaData = JSON.parse(localStorage.getItem("tabelaData")) || [];
        tabelaData.push(dados);
        localStorage.setItem("tabelaData", JSON.stringify(tabelaData));
        alert("Dados enviados para tabela");
        // Limpa os campos do formulário
        form.reset();
    });
});


        
