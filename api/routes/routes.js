import express from 'express';
import bodyParser from 'body-parser';
import { openDb } from '../../db/config/configDB.js';
import app from '../app.js';
import { queries } from './queries.js';


const router = express.Router();

router.use(bodyParser.json());
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const root = 'web';

router.get("/", function (req, res) {
    res.redirect('/cadastro');
});

router.get("/cadastro", function (req, res) {
    console.log('Rota cadastro acessada')
    res.sendFile('/cadastro/cadastro.html', { root: root });
});

router.get("/sucesso-cadastro", async function (req, res) {
    console.log('Rota sucesso cadastro acessada');
    res.sendFile('/cadastro/sucesso_cadastro.html', { root: root });
});

router.get("/perfil", function (req, res) {
    console.log('Rota perfil acessada');
    res.set('Accept', 'application/json');
    if (app.locals.userID === undefined) {
        return res.redirect("/cadastro");
    }
    res.sendFile('/perfil/perfil.html', { root: root });
});


// ----------------------------------------------------------------
// Métodos para tabela 'Usuários'
// ----------------------------------------------------------------


//metodo ok
router.post('/usuario', async (req, res) => {
    console.log(req.body);
    try {
        const { email, cpf, senha, } = req.body;
        const nome = req.body['firstname'] + ' ' + req.body['lastname'];
        const db = await openDb();
        const userID = (await db.run(queries.INSERIR_USUARIO, [nome, email, senha, null, cpf])).lastID;
        app.locals.userID = userID;
        console.log(`Usuário inserido com sucesso`);
        res.redirect('/sucesso-cadastro');
    } catch (error) {
        console.error(error.message);
        res.status(500).send(`Erro ao inserir usuário: ${error.message}`);
    }
});

router.get('/usuario', async (req, res) => {
    const id = app.locals.userID;
    if (id !== undefined) {
        const db = await openDb();
        await db.get(queries.LISTAR_USUARIO_POR_ID, [id])
            .then((result) => {
                if (result) {
                    res.json(result);
                } else {
                    res.status(404).send("Usuário não encontrado.");
                }
            }).catch((err) => {
                console.error("Erro ao consultar o banco de dados:", err);
                res.status(500).send("Erro interno do servidor.");
            });
    } else {
        const erro = "Usuário não encontrado.";
        console.log(erro);
        res.status(404).send(erro);
    }
});

router.put('/usuario', async (req, res) => {
    const id = app.locals.userID;
    const { nome, email, telefone, cpf, endereco_id } = req.body;
    try {
        console.log(`ID do Usuário a ser atualizado: ${id}`);
        console.log(`Novos dados do Usuário:`, req.body);

        const db = await openDb();
        await db.run(queries.ATUALIZAR_USUARIO, [nome, email, telefone, cpf, endereco_id, id]);

        console.log(`Usuário atualizado com sucesso.`);
        res.status(200).json({ message: 'Usuário atualizado com sucesso.' });
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
});

// ---------------------------------------------------------------------------------------
// Métodos para tabela 'Endereco'
// ---------------------------------------------------------------------------------------

//metodo ok
router.post('/endereco', async (req, res) => {
    
});

// metodo ok
router.put('/endereco', async (req, res) => {
    const { bairro, cep, logradouro, numero, complemento, cidade, estado } = req.body;
    const id = app.locals.enderecoID;
    const db = await openDb();
    if(id === undefined){
        try {
            const enderecoID = (await db.run(queries.INSERIR_ENDERECO, [bairro, cep, logradouro, numero, complemento, cidade, estado])).lastID;
            var usuario = await db.get(queries.LISTAR_USUARIO_POR_ID, app.locals.userID);
            await db.run(queries.ATUALIZAR_USUARIO, [usuario.nome, usuario.email, usuario.telefone, usuario.cpf, enderecoID, usuario.id]);
            app.locals.enderecoID = enderecoID;
            console.log(`Endereço inserido com sucesso`);
            res.status(201).send(`Endereço inserido com sucesso`);
        } catch (error) {
            console.error(error.message);
            res.status(500).send(`Erro ao inserir endereço: ${error.message}`);
        }
    } else {
        try {
            console.log(`Novos dados do Endereco:`, req.body);
            await db.run(queries.ATUALIZAR_ENDERECO, [bairro, cep, logradouro, numero, complemento, cidade, estado, id]);
    
            console.log(`Endereço atualizado com sucesso.`);
            res.status(200).json({ message: 'Endereço atualizado com sucesso.' });
        } catch (error) {
            console.error('Erro ao atualizar endereço:', error);
            res.status(500).json({ error: 'Erro interno do servidor.' });
        }
    }   
});

router.get('/endereco', async (req, res) => {
    const enderecoID = app.locals.enderecoID;
    if (enderecoID !== undefined) {
        const db = await openDb();
        await db.get(queries.LISTAR_ENDERECO_POR_ID, [enderecoID])
            .then((result) => {
                if (result) {
                    res.json(result);
                } else {
                    res.status(404).send("Endereço não encontrado.");
                }
            }).catch((err) => {
                console.error("Erro ao consultar o banco de dados:", err);
                res.status(500).send("Erro interno do servidor.");
            });
    } else {
        const erro = "Endereço não encontrado.";
        console.log(erro);
        res.status(404).send(erro);
    }
});

export default router;