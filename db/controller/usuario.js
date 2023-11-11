import { openDb } from "../config/configDB.js";

export default async function createTable() {
    openDb().then(db => {
        db.exec(`CREATE TABLE IF NOT EXISTS Usuario (
            id INTEGER PRIMARY KEY NOT NULL, 
            nome STRING, 
            email STRING, 
            senha STRING,
            telefone STRING,
            cpf STRING,
            endereco INTEGER,
            FOREIGN KEY (endereco) REFERENCES Endereco(id)
            )`
        );
        db.exec(`CREATE TABLE IF NOT EXISTS Endereco (
            id INTEGER PRIMARY KEY NOT NULL,
            bairro STRING,
            cep STRING,
            logradouro STRING,
            numero INTEGER,
            complemento STRING,
            cidade STRING,
            estado STRING
            )`);
        console.log('Tabela criada');
    });
}
