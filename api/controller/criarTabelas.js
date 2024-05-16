import criarTabelaUsuarios from "../../db/controller/usuarios.js";
import criarTabelaEnderecos from "../../db/controller/enderecos.js";
import criarTabelaProdutos from "../../db/controller/produtos.js";

export async function criarTabelas() {
    await criarTabelaEnderecos();
    await criarTabelaUsuarios();
    await criarTabelaProdutos();
}