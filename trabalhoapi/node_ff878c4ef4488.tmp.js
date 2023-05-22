const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
app.use(bodyParser.json());

// Configurações de conexão com o banco de dados
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'seu_usuario',
  password: 'sua_senha',
  database: 'loja2',
});

// Conecta ao banco de dados
connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conectado ao banco de dados!');
});

// Consulta de produtos disponíveis
app.get('/products', (req, res) => {
  connection.query('SELECT * FROM produtos', (err, results) => {
    if (err) {
      console.error('Erro ao executar a consulta:', err);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }

    res.json(results);
  });
});

// Realização de um pedido
app.post('/orders', (req, res) => {
  const { productId, quantity } = req.body;

  // Verifica se o produto existe
  const product = products.find((p) => p.id === productId);
  if (!product) {
    return res.status(404).json({ error: 'Produto não encontrado.' });
  }

  // Cria um novo pedido
  const order = { productId, quantity };
  orders.push(order);

  res.json(order);
});

// Consulta de pedidos realizados
app.get('/orders', (req, res) => {
  res.json(orders);
});

// Rotas para os administradores

// Criação de um novo produto
app.post('/admin/products', (req, res) => {
  const { name, price } = req.body;

  // Gera um novo ID para o produto
  const id = products.length + 1;

  // Cria o novo produto
  const newProduct = { id, name, price };
  products.push(newProduct);

  res.json(newProduct);
});

// Atualização de um produto existente
app.put('/admin/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const { name, price } = req.body;

  // Verifica se o produto existe
  const product = products.find((p) => p.id === productId);
  if (!product) {
    return res.status(404).json({ error: 'Produto não encontrado.' });
  }

  // Atualiza o produto
  product.name = name;
  product.price = price;

  res.json(product);
});

// Exclusão de um produto existente
app.delete('/admin/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);

  // Verifica se o produto existe
  const productIndex = products.findIndex((p) => p.id === productId);
  if (productIndex === -1) {
    return res.status(404).json({ error: 'Produto não encontrado.' });
  }

  // Remove o produto
  products.splice(productIndex, 1);

  res.sendStatus(204);
});

// Inicie o servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
