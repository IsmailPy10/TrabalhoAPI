const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
app.use(bodyParser.json());

// Configurações de conexão com o banco de dados
const conexao = mysql.createConnection({
  host: 'localhost',
  user: 'Ismail',
  password: 'AVUlm7hX!',
  database: 'loja',
});

// Conecta ao banco de dados
conexao.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conectado ao banco de dados!');
});

// Consulta de produtos disponíveis
app.get('/produtos', (req, res) => {
  conexao.query('SELECT * FROM produtos', (err, resultados) => {
    if (err) {
      console.error('Erro ao executar a consulta:', err);
      return res.status(500).json({ erro: 'Erro interno do servidor.' });
    }

    res.json(resultados);
  });
});

// Realização de um pedido
app.post('/pedidos', (req, res) => {
  const { idProduto, quantidade } = req.body;

  // Verifica se o produto existe
  const produto = produtos.find((p) => p.id === idProduto);
  if (!produto) {
    return res.status(404).json({ erro: 'Produto não encontrado.' });
  }

  // Cria um novo pedido
  const pedido = { idProduto, quantidade };
  pedidos.push(pedido);

  res.json(pedido);
});

// Consulta de pedidos realizados
app.get('/pedidos', (req, res) => {
  res.json(pedidos);
});

// Rotas para os administradores

// Criação de um novo produto
app.post('/admin/produtos', (req, res) => {
  const { nome, preco } = req.body;

  // Gera um novo ID para o produto
  const id = produtos.length + 1;

  // Cria o novo produto
  const novoProduto = { id, nome, preco };
  produtos.push(novoProduto);

  res.json(novoProduto);
});

// Atualização de um produto existente
app.put('/admin/produtos/:id', (req, res) => {
  const idProduto = parseInt(req.params.id);
  const { nome, preco } = req.body;

  // Verifica se o produto existe
  const produto = produtos.find((p) => p.id === idProduto);
  if (!produto) {
    return res.status(404).json({ erro: 'Produto não encontrado.' });
  }

  // Atualiza o produto
  produto.nome = nome;
  produto.preco = preco;

  res.json(produto);
});

// Exclusão de um produto existente
app.delete('/admin/produtos/:id', (req, res) => {
  const idProduto = parseInt(req.params.id);

  // Verifica se o produto existe
  const indiceProduto = produtos.findIndex((p) => p.id === idProduto);
  if (indiceProduto === -1) {
    return res.status(404).json({ erro: 'Produto não encontrado.' });
  }

  // Remove o produto
  produtos.splice(indiceProduto, 1);

  res.sendStatus(204);
});

// Inicie o servidor
const porta = 3000;
app.listen(porta, () => {
  console.log(`Servidor rodando em http://localhost:${porta}`);
});
