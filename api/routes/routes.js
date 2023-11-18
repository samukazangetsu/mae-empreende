import express from 'express';
import bodyParser from 'body-parser';
import { openDb } from '../../db/config/configDB.js';

const router = express.Router();

router.use(bodyParser.json());
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const root = 'web';

const INSERIR_USUARIO = `
    INSERT INTO Usuarios (nome, email, senha, telefone, cpf, endereco_id)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

const ATUALIZAR_USUARIO = `
  UPDATE Usuarios
  SET nome = ?, email = ?, senha = ?, telefone = ?, cpf = ?, endereco_id = ?
  WHERE id = ?
`;

const CHECAR_USUARIO = 'SELECT * FROM usuarios WHERE id = ?';

const INSERIR_ENDERECO = `
    INSERT INTO Enderecos (bairro, cep, logradouro, numero, complemento, cidade, estado)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  const ATUALIZAR_ENDERECO = `
  UPDATE Enderecos
  SET bairro = ?, cep = ?, logradouro = ?, numero = ?, complemento = ?, cidade = ?, estado = ?
  WHERE endereco_id = ?
`;


router.get("/", function (req, res) {
    res.redirect('/cadastro');
});

router.get("/cadastro", function (req, res) {
    console.log('Rota cadastro acessada')
    res.sendFile('/cadastro/cadastro.html', { root: root });
});

router.get("/sucesso-cadastro", function (req, res) {
    console.log('Rota sucesso cadastro acessada');
    res.sendFile('/cadastro/sucesso_cadastro.html', { root: root });
});

router.get("/perfil/:id", function (req, res) {
    console.log('Rota perfil acessada')
    console.dir(req.params.id);
    res.set('Content-Type', 'text/plain');
    res.set('Accept', 'application/json');
    res.json();
    res.sendFile('/perfil/perfil.html', {root: root});
}); 


// ----------------------------------------------------------------
// Métodos para tabela 'Usuários'
// ----------------------------------------------------------------


//metodo ok
router.post('/usuarios', async (req, res) => {
    try {
        const { nome, email, senha, telefone, cpf, endereco_id } = req.body;
        const db = await openDb();
        await db.run(INSERIR_USUARIO, [nome, email, senha, telefone, cpf, endereco_id]);
        console.log(`Usuário inserido com sucesso`);
        res.status(201).send(`Usuário inserido com sucesso`);
    } catch (error) {
        console.error(error.message);
        res.status(500).send(`Erro ao inserir usuário: ${error.message}`);
    }
});

// metodo ok
router.put('/usuarios/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, email, senha, telefone, cpf, endereco_id } = req.body;
    try {
      console.log(`ID do Usuário a ser atualizado: ${id}`);
      console.log(`Novos dados do Usuário:`, req.body);
  
      const db = await openDb();
      await db.run(ATUALIZAR_USUARIO, [nome, email, senha, telefone, cpf, endereco_id, id]);
  
      console.log(`Usuário atualizado com sucesso.`);
      res.status(200).json({ message: 'Usuário atualizado com sucesso.' });
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  });
  
  

// listar todos os usuários
// app.get('/users/:id', (req, res) => {
//   db.query(LISTAR_USUARIO, (err, result) => {
//     if (err) throw err;
//     res.json(result);
//   });
// });

// excluir um usuário
// app.delete('/users/:id', (req, res) => {
//   const userId = req.params.id;
//   db.query(EXCLUIR_USUARIO, userId, (err, result) => {
//     if (err) throw err;
//     res.json({ message: 'Usuário excluído com sucesso' });
//   });
// });

// ---------------------------------------------------------------------------------------
// Métodos para tabela 'Endereco'
// ---------------------------------------------------------------------------------------

//metodo ok
router.post('/enderecos', async (req, res) => {
    try {
        const { bairro, cep, logradouro, numero, complemento, cidade, estado } = req.body;
        const db = await openDb();
        await db.run(INSERIR_ENDERECO, [bairro, cep, logradouro, numero, complemento, cidade, estado]);
        console.log(`Endereço inserido com sucesso`);
        res.status(201).send(`Endereço inserido com sucesso`);
    } catch (error) {
        console.error(error.message);
        res.status(500).send(`Erro ao inserir endereço: ${error.message}`);
    }
});

// metodo ok
router.put('/enderecos/:id', async (req, res) => {
    const idEndereco = req.params.id;
    const { bairro, cep, logradouro, numero, complemento, cidade, estado } = req.body;

    try {
        console.log(`Novos dados do Endereco:`, req.body);

        const db = await openDb();
        await db.run(ATUALIZAR_ENDERECO, [bairro, cep, logradouro, numero, complemento, cidade, estado, idEndereco]);

        console.log(`Endereço atualizado com sucesso.`);
        res.status(200).json({ message: 'Endereço atualizado com sucesso.' });
    } catch (error) {
        console.error('Erro ao atualizar endereço:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
});

export default router;
