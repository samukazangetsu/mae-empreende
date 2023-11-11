import { openDb } from "../config/configDB.js";

export default async function createTable() {
    openDb().then(db => {
        db.exec('CREATE TABLE IF NOT EXISTS Usuario (id INTEGER PRIMARY KEY)');
        console.log('Tabela criada');
    });
}
