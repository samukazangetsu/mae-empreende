import { openDb } from '../db/config/configDB.js';
import { criarTabelas } from './controller/criarTabelas.js';
import express from 'express';
import router from './routes/routes.js';


const app = express();
app.use(express.json())
const port = 3000;

openDb();
criarTabelas();
app.get('/', router);
app.get('/cadastro', router);

app.listen(port, () => {
    console.log(`Node rodando na seguinte porta: ${port}`);
});