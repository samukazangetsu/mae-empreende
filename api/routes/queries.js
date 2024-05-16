export const queries = {
  INSERIR_USUARIO: `
  INSERT INTO Usuarios (nome, email, senha, telefone, cpf, endereco_id)
  VALUES (?, ?, ?, ?, ?, ?)
`,

  ATUALIZAR_USUARIO: `
UPDATE Usuarios
SET nome = ?, email = ?, telefone = ?, cpf = ?, endereco_id = ?
WHERE id = ?
`,

  CHECAR_USUARIO: 'SELECT * FROM usuarios WHERE id = ?',

  INSERIR_ENDERECO: `
  INSERT INTO Enderecos (bairro, cep, logradouro, numero, complemento, cidade, estado)
  VALUES (?, ?, ?, ?, ?, ?, ?)
`,

  ATUALIZAR_ENDERECO: `
UPDATE Enderecos
SET bairro = ?, cep = ?, logradouro = ?, numero = ?, complemento = ?, cidade = ?, estado = ?
WHERE endereco_id = ?
`,

  LISTAR_USUARIO: `
  SELECT nome, email, telefone, cpf FROM usuarios ORDER BY nome
`,

  LISTAR_USUARIO_POR_ID: `
  SELECT nome, email, telefone, cpf FROM usuarios WHERE id = ?;
`,

  LISTAR_ENDERECO_POR_ID: `
  SELECT bairro, cep, logradouro, numero, complemento, cidade, estado FROM enderecos WHERE endereco_id = ?;
`,

  EXCLUIR_USUARIO: `
  DELETE FROM usuarios WHERE id = ?;
`,

  INSERIR_PRODUTO: `
  INSERT INTO Produtos (nome, imagem, preco, idUsuario, tamanho, cor, tempoUso, genero)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`,

  ATUALIZAR_PRODUTO: `
  UPDATE Produtos
  SET nome = ?, imagem = ?, preco = ?, idUsuario = ?, tamanho = ?, cor = ?, tempoUso = ?, genero = ?
  WHERE id = ?
`,

  LISTAR_PRODUTO_POR_ID: `
  SELECT nome, imagem, preco, idUsuario, tamanho, cor, tempoUso, genero FROM Produtos WHERE id = ?;
`,

};

