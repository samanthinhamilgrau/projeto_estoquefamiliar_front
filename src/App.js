// App.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../src/App.css';
import Editar from '../src/telas/Editar.js';
import Lista from '../src/telas/Lista.js';
import Historico from '../src/telas/Historico.js';
import Usuario from '../src/telas/Usuario.js';
import Sidebar from '../src/telas/Sidebar.js';

export default function App() {
  const [produto, setProduto] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [tipoMovimento, setTipoMovimento] = useState('entrada');
  const [movimentos, setMovimentos] = useState([]);
  const [telaAtual, setTelaAtual] = useState('Lista');
  const [logado, setLogado] = useState(false);
  const [loginInfo, setLoginInfo] = useState({ nome: '', email: '', senha: '' });

  const produtosFixos = [
  "Absorvente Noturno(Pacotes)",
  "Álcool Gel",
  "Algodão(Pacote)",
  "Ampola Pantene(Unidades)",
  "Babosão Hidratante",
  "Condicionador",
  "Cotonetes(Caixas)",
  "Creme de Pentear",
  "Desodorante Roll on",
  "Desodorante Rexona Clinical",
  "Desodorante Rexona Clinical Pequeno",
  "Gilette(Unidades)",
  "Glad mini spray(Unidades)",
  "Listerine",
  "Lysoform Spray",
  "Papel Toalha tipo pano(Unidade)",
  "Papel Higiênico(pct com 24 uni)",
  "Papel Toalha(Pacote)",
  "Pasta de Dentes Grande",
  "Pasta de Dentes Pequena",
  "Refil de Lenços Umedecidos",
  "Refil de Sabonete liquido",
  "Sabote",
  "Sabonete intimo",
  "Sabonete liquido(Pote)",
  "Shampoo"
];


 const enviarMovimento = async () => {
  if (!produto || !quantidade) {
    alert('Preencha todos os campos!');
    return;
  }

  try {
    await axios.post('http://localhost:5000/movimento', {
      produto,
      quantidade: parseInt(quantidade),
      tipo: tipoMovimento,
      data: new Date().toISOString(),
      nome: loginInfo.nome   // ✅ ADICIONE ISSO
    });
    setProduto('');
    setQuantidade('');
    buscarMovimentos();
  } catch (error) {
    alert('Erro ao registrar movimento');
  }
};

  const buscarMovimentos = async () => {
    try {
      const res = await axios.get('http://localhost:5000/movimentos');
      setMovimentos(res.data);
    } catch (error) {
      console.error('Erro ao buscar movimentos', error);
    }
  };

  useEffect(() => {
    if (logado) buscarMovimentos();
  }, [logado]);

  const produtosAgrupados = movimentos.reduce((acc, movimento) => {
    const { produto, quantidade, tipo } = movimento;
    if (!acc[produto]) acc[produto] = 0;
    acc[produto] += tipo === 'entrada' ? quantidade : -quantidade;
    return acc;
  }, {});

  const renderizarTela = () => {
    switch (telaAtual) {
      case 'Editar':
        return (
          <Editar
            produto={produto}
            setProduto={setProduto}
            quantidade={quantidade}
            setQuantidade={setQuantidade}
            tipoMovimento={tipoMovimento}
            setTipoMovimento={setTipoMovimento}
            enviarMovimento={enviarMovimento}
            produtosFixos={produtosFixos}  // 👉 novo!
          />
        );

      case 'Lista':
        return <Lista produtosAgrupados={produtosAgrupados} produtosFixos={produtosFixos} />;
      case 'Historico':
        return <Historico movimentos={movimentos} />;
      case 'Usuario':
        return <Usuario loginInfo={loginInfo} />;
      default:
        return <Lista produtosAgrupados={produtosAgrupados} />;
    }
  };

  if (!logado) {
    return (
      <div className="login-container">
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Nome"
          value={loginInfo.nome}
          onChange={(e) => setLoginInfo({ ...loginInfo, nome: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={loginInfo.email}
          onChange={(e) => setLoginInfo({ ...loginInfo, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Senha"
          value={loginInfo.senha}
          onChange={(e) => setLoginInfo({ ...loginInfo, senha: e.target.value })}
        />
        <button
          onClick={() => {
            if (loginInfo.nome && loginInfo.email && loginInfo.senha) {
              setLogado(true);
            } else {
              alert('Preencha todos os campos!');
            }
          }}
        >
          Entrar
        </button>
      </div>
    );
  }

  return (
    <div className="app-container">
      <Sidebar telaAtual={telaAtual} setTelaAtual={setTelaAtual} />
      <div className="main-content">
        <h2>Estoque Familiar</h2>
        {renderizarTela()}
      </div>
    </div>
  );
}