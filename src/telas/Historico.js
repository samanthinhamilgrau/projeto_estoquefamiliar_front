import React from 'react';

export default function Historico({ movimentos }) {
  return (
    <div>
      <h3>Histórico de Movimentos:</h3>
      <ul>
        {movimentos.map((mov, index) => (
          <li key={index}>
            {mov.tipo === 'entrada' ? '➕' : '➖'} {mov.produto} | {mov.quantidade} unidade(s) |{' '}
            {new Date(mov.data).toLocaleString()} | Usuário: {mov.nome || 'Desconhecido'}
          </li>
        ))}
      </ul>
    </div>
  );
}
