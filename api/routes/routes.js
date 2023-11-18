import express from 'express';
import bodyParser from 'body-parser';
import { openDb } from '../../db/config/configDB.js';

const router = express();
router.use(express.json());
router.use(bodyParser.json());

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

const INSERIR_ENDERECO = `
      INSERT INTO Enderecos (bairro, cep, logradouro, numero, complemento, cidade, estado)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

const ATUALIZAR_ENDERECO = `
      UPDATE Enderecos
      SET bairro = ?, cep = ?, logradouro = ?, numero = ?, complemento = ?, cidade = ?, estado = ?
      WHERE endereco_id = ?
    `;

const LISTAR_USUARIO = `
    SELECT nome, email, telefone, cpf FROM usuarios ORDER BY nome
`;

const LISTAR_USUARIO_POR_ID = `
    SELECT nome, email, telefone, cpf FROM usuarios WHERE id = ?;
`;

const EXCLUIR_USUARIO = `
    DELETE FROM usuarios WHERE id = ?;
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

router.put('/usuarios/:id', async (req, res) => {
    try {
        const idUsuario = req.params.id;
        const { nome, email, senha, telefone, cpf, endereco_id } = req.body;
        const db = await openDb();
        await db.run(ATUALIZAR_USUARIO, [nome, email, senha, telefone, cpf, endereco_id, idUsuario]);
        if (this.changes === 0) {
            return res.status(404).send('Usuário não encontrado');
        }
        console.log(`Infos de usuário ${idUsuario} atualizadas`);
        res.status(200).send('Informações do usuário atualizadas com sucesso');
    } catch (error) {
        console.error(error.message);
        res.status(500).send(`Erro ao atualizar usuário: ${error.message}`);
    }
});

router.get('/usuarios', async (req, res) => {
    const db = await openDb();
    await db.all(LISTAR_USUARIO)
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            console.error("Erro ao consultar o banco de dados:", err);
            res.status(500).send("Erro interno do servidor.");
        });
});

router.get('/usuarios/:id', async (req, res) => {
    const userId = req.params.id;

    if (isNaN(userId)) {
        res.status(400).send('Id fornecido é inválido.');
        return;
    }

    const db = await openDb();

    await db.get(LISTAR_USUARIO_POR_ID, [userId])
        .then((result) => {
            if (result) {
                res.json(result);
            } else {
                res.status(404).send("Usuário não encontrado.");
            }
        })
        .catch((err) => {
            console.error("Erro ao consultar o banco de dados:", err);
            res.status(500).send("Erro interno do servidor.");
        })
});

router.delete('/usuarios/:id', async (req, res) => {
    const userId = req.params.id;

    if (isNaN(userId)) {
        res.status(400).send('Id fornecido é inválido.');
        return;
    }

    const db = await openDb();

    await db.run(EXCLUIR_USUARIO, [userId])
        .then((result) => {
            if (result.changes > 0) {
                res.status(200).send("Usuário excluído com sucesso.");
            } else {
                res.status(404).send("Usuário não encontrado.");
            }
        })
        .catch((err) => {
            console.error("Erro na exclusão do usuário:", err);
            res.status(500).send("Erro interno do servidor.");
        })
});


// ---------------------------------------------------------------------------------------
// Métodos para tabela 'Endereco'
// ---------------------------------------------------------------------------------------

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

router.put('/enderecos/:id', async (req, res) => {
    try {
        const idEndereco = req.params.id;
        const { bairro, cep, logradouro, numero, complemento, cidade, estado } = req.body;
        const db = await openDb();
        await db.run(ATUALIZAR_ENDERECO, [bairro, cep, logradouro, numero, complemento, cidade, estado, idEndereco]);
        if (this.changes === 0) {
            return res.status(404).send('Endereço não encontrado');
        }
        console.log(`Informações do endereço com o ID ${idEndereco} atualizadas`);
        res.status(200).send(`Informações do endereço com o ID ${idEndereco} atualizadas`);
    } catch (error) {
        console.error(error.message);
        res.status(500).send(`Erro ao atualizar endereço: ${error.message}`);
    }
});

export default router;

/////////////////////////////////////////////////////////////////////
// exemplo de função para cadastro (inserção de usuário na tabela) //
// 
/////////////////////////////////////////////////////////////////////
/* <script>
        function enviarUsuario() {
            const form = document.getElementById('usuarioForm');
            const formData = new FormData(form);

            fetch('/usuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(Object.fromEntries(formData)),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao cadastrar usuário');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                alert('Usuário cadastrado');
            })
            .catch(error => {
                console.error('Erro:', error);
                alert('Erro ao cadastrar usuário');
            });
        }
</script> */