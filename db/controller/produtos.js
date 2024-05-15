import { openDb } from "../config/configDB.js";

export default async function criarTabelaProdutos() {
    openDb().then(db => {
        db.exec(`CREATE TABLE IF NOT EXISTS Produtos (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            nome TEXT, 
            imagem TEXT, 
            preco REAL,
            idUsuario INTEGER,
            tamanho TEXT,
            cor TEXT,
            tempoUso TEXT,
            genero TEXT,
            FOREIGN KEY (idUsuario) REFERENCES Usuarios (id)
            )`
        );
        console.log('Tabela de produtos criada');
    });
}