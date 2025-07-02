import React from 'react';

export default function Lista({ produtosAgrupados, produtosFixos }) {
  return (
    <div>
      <h3>Produtos no Estoque:</h3>
      <ul>
        {produtosFixos.map((produto, index) => (
          <li key={index}>
            <strong>{produto}:</strong> {produtosAgrupados[produto] || 0} unidade(s)
          </li>
        ))}
      </ul>
    </div>
  );
}
