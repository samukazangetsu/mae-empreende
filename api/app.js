import { openDb } from '../db/config/configDB.js';
import { criarTabelas } from './controller/criarTabelas.js';
import express from 'express';
import router from './routes/routes.js';


const app = express();
app.use(express.json())
const port = 3000;
app.use(express.static('public'));
app.use('/css', express.static('node_modules/bootstrap/dist/css'));

openDb();
criarTabelas();
app.get('/', router);
app.get('/cadastro', router);
app.get('/sucesso-cadastro', router);
app.get('/perfil/:id', router);

app.post('/usuarios', router);
app.put('/usuarios/:id', router);
app.get('/usuarios', router);
app.get('/usuarios/:id', router);
app.delete('/usuarios/:id', router);
app.post('/enderecos', router);
app.put('/enderecos/:id', router);

app.listen(port, () => {
    console.log(`Node rodando na seguinte porta: ${port}`);
});