import express from 'express';

const router = express();
router.use(express.json());

const root = 'web';

router.get("/", function(req, res) {
    res.sendFile('/index.html', {root: root});
});

router.get("/cadastro", function(req, res) {
    res.sendFile('/cadastro/cadastro.html', {root: root});
});

export default router;

// consultas sql de exemplo
// const LISTAR_USUARIO = 'SELECT * FROM usuarios WHERE id = ?';
// const INSERIR_USUARIO = 'INSERT INTO usuarios SET ?';
// const ATUALIZAR_USUARIO = 'UPDATE usuarios SET ? WHERE id = ?';
// const EXCLUIR_USUARIO = 'DELETE FROM usuarios WHERE id = ?';


// app.use(bodyParser.json());

// listar todos os usuários
// app.get('/users/:id', (req, res) => {
//   db.query(LISTAR_USUARIO, (err, result) => {
//     if (err) throw err;
//     res.json(result);
//   });
// });

// // inserir um novo usuário
// app.post('/users', (req, res) => {
//   const { username, email } = req.body;
//   db.query(INSERIR_USUARIO, [username, email], (err, result) => {
//     if (err) throw err;
//     res.json({ message: 'Usuário inserido com sucesso', id: result.insertId });
//   });
// });

// // atualizar um usuário
// app.put('/users/:id', (req, res) => {
//   const { username, email } = req.body;
//   const userId = req.params.id;
//   db.query(ATUALIZAR_USUARIO, [username, email, userId], (err, result) => {
//     if (err) throw err;
//     res.json({ message: 'Usuário atualizado com sucesso' });
//   });
// });

// // excluir um usuário
// app.delete('/users/:id', (req, res) => {
//   const userId = req.params.id;
//   db.query(EXCLUIR_USUARIO, userId, (err, result) => {
//     if (err) throw err;
//     res.json({ message: 'Usuário excluído com sucesso' });
//   });
// });


