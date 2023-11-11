import criarTabelaUsuarios from "../../db/controller/usuarios.js";
import criarTabelaEnderecos from "../../db/controller/enderecos.js";

export async function criarTabelas() {
    await criarTabelaEnderecos();
    await criarTabelaUsuarios();
}

