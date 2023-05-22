create database loja;
use loja;
show tables;

CREATE TABLE cidade (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(50)
);

CREATE TABLE clientes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(100),
  altura DOUBLE,
  nascimento DATE,
  cidade_id INT,
  FOREIGN KEY (cidade_id) REFERENCES cidade(id)
);

CREATE TABLE pedidos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  horario DATETIME,
  endereco VARCHAR(200),
  cliente_id INT,
  FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);

CREATE TABLE pedido_produto (
  pedido_id INT,
  produto_id INT,
  preco DOUBLE,
  quantidade DOUBLE,
  FOREIGN KEY (pedido_id) REFERENCES pedidos(id),
  FOREIGN KEY (produto_id) REFERENCES produtos(id),
  PRIMARY KEY (pedido_id, produto_id)
);

CREATE TABLE produtos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(100),
  preco DOUBLE,
  quantidade DOUBLE,
  categoria_id INT,
  FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);

CREATE TABLE categorias (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(100)
);
