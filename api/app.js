import { openDb } from '../db/config/configDB.js';
import { criarTabelas } from './controller/criarTabelas.js';
import express from 'express';

const app = express();
app.use(express.json())
const port = 3000;

openDb();
criarTabelas();

app.listen(port, () => {
    console.log(`Node rodando na seguinte porta: ${port}`);
});