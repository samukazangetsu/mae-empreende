import { openDb } from "../config/configDB";

export default async function createTable() {
    openDb().then(db => {
        db.exec('CREATE TABLE IF NOT EXISTS Usuario (id INTEGER PRIMARY KEY)');
    });
}
