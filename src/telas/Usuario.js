export default function Usuario({ loginInfo }) {
  return (
    <div>
      <h3>Perfil do Usuário</h3>
      <p><strong>Nome:</strong> {loginInfo.nome || 'Desconhecido'}</p>
      <p><strong>Email:</strong> {loginInfo.email || 'Sem email'}</p>
      <p><strong>Senha:</strong> {loginInfo.senha ? '********' : 'Não definida'}</p>
    </div>
  );
}
