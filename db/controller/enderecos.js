import { openDb } from "../config/configDB.js";

export default async function criarTabelaEnderecos() {
    openDb().then(db => {
        db.exec(
            `CREATE TABLE IF NOT EXISTS Enderecos (
            endereco_id INTEGER PRIMARY KEY AUTOINCREMENT,
            bairro TEXT,
            cep TEXT,
            logradouro TEXT,
            numero INT,
            complemento TEXT,
            cidade TEXT,
            estado TEXT
            )`
        );
        console.log('Tabela de endereço criada');
    });
}