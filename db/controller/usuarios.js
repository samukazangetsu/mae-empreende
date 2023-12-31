import { openDb } from "../config/configDB.js";

export default async function criarTabelaUsuario() {
    openDb().then(db => {
        db.exec(`CREATE TABLE IF NOT EXISTS Usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            nome TEXT, 
            email TEXT, 
            senha TEXT,
            telefone TEXT,
            cpf TEXT,
            endereco_id INTEGER,
            FOREIGN KEY (endereco_id) REFERENCES Enderecos (endereco_id)
            )`
        );
        console.log('Tabela de usuário criada');
    });
}
