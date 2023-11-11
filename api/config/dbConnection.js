const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'seu_host',
  user: 'seu_usuario',
  password: 'sua_senha',
  database: 'sua_base_de_dados'
});

connection.connect((err) => {
  if (err) {
    console.error('Erro na conexão do banco', err);
  } else {
    console.log('Conectado com sucesso com o banco');
  }
});

module.exports = connection;
