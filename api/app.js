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
app.get('/home', router);
app.get('/cadastro', router);
app.get('/sucesso-cadastro', router);

app.get('/perfil', router);

app.get('/usuario', router);
app.post('/usuario', router);
app.put('/usuario', router);

app.get('/endereco', router);
app.post('/endereco', router);
app.put('/endereco/', router);

app.get('/produto', router);
app.post('/produto', router);
app.put('/produto', router);

app.use('/', router);
app.get('/cadastro-produto', router);
app.post('/cadastro-produto', router);
app.get('/produtos-cadastrados', router);

app.listen(port, () => {
    console.log(`Node rodando na seguinte porta: ${port}`);
});

export default app;