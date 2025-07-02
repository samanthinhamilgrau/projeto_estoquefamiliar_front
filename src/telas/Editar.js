import React from 'react';

export default function Editar({
  produto,
  setProduto,
  quantidade,
  setQuantidade,
  tipoMovimento,
  setTipoMovimento,
  enviarMovimento,
  produtosFixos   // 👈 novo!
}) {
  return (
    <div>
      <select value={produto} onChange={(e) => setProduto(e.target.value)}>
        <option value="">Selecione um produto</option>
        {produtosFixos.map((prod, index) => (
          <option key={index} value={prod}>{prod}</option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Quantidade"
        value={quantidade}
        onChange={(e) => setQuantidade(e.target.value)}
      />

      <select value={tipoMovimento} onChange={(e) => setTipoMovimento(e.target.value)}>
        <option value="entrada">Entrada</option>
        <option value="saida">Saída</option>
      </select>

      <button onClick={enviarMovimento}>Registrar</button>
    </div>
  );
}
