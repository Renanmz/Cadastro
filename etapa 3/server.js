const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');  // Certifique-se de que o CORS está instalado e importado
const app = express();
const port = 3000;

// Habilitar o CORS
app.use(cors());  // Isso permite que qualquer origem (domínio/porta) acesse o servidor

app.use(express.json());
app.use(express.static('public'));

// Caminho para o arquivo db.json na pasta backend
const dbPath = path.join(__dirname, 'backend', 'db.json');

// Rota para salvar os dados no db.json
app.post('/salvar-dados', (req, res) => {
    console.log('Recebendo dados para salvar:', req.body);
    const novoDado = req.body;

    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler db.json:', err);
            return res.status(500).send('Erro ao ler o banco de dados.');
        }

        let dados = JSON.parse(data);
        dados.push(novoDado);

        fs.writeFile(dbPath, JSON.stringify(dados, null, 2), 'utf8', (err) => {
            if (err) {
                console.error('Erro ao salvar dados:', err);
                return res.status(500).send('Erro ao salvar os dados.');
            }

            res.status(200).json({ message: 'Dados salvos com sucesso!' });
        });
    });
});

// Rota para obter todos os dados
app.get('/dados', (req, res) => {
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao ler o banco de dados.' });
        }

        try {
            // Tenta parsear o conteúdo do arquivo db.json
            const dados = JSON.parse(data);

            // Envia os dados do banco para o front-end
            res.json(dados);
        } catch (e) {
            return res.status(500).json({ error: 'Erro ao processar os dados do banco de dados.' });
        }
    });
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
