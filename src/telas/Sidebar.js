// sidebar.js
import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import "../App.css";

export default function Sidebar({ telaAtual, setTelaAtual }) {
  const [isOpen, setIsOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  const menuItems = [
    { name: "Lista", icon: "material-symbols:list" },
    { name: "Editar", icon: "mdi:pencil" },
    { name: "Historico", icon: "mdi:history" },
    { name: "Usuario", icon: "mdi:account" },
  ];

  useEffect(() => {
    document.body.className = darkMode ? "dark" : "";
  }, [darkMode]);

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <button className="toggle-btn" onClick={toggleSidebar}>
        <Icon icon="material-symbols:menu" width="24" height="24" />
      </button>

      {menuItems.map((item) => (
        <div
          key={item.name}
          className={`menu-item ${telaAtual === item.name ? "active" : ""}`}
          onClick={() => setTelaAtual(item.name)}
        >
          <span className="icon">
            <Icon icon={item.icon} width="20" height="20" />
          </span>
          {isOpen && <span className="label">{item.name}</span>}
        </div>
      ))}

      <div className="menu-item" onClick={toggleDarkMode}>
        <span className="icon">
          <Icon
            icon={darkMode ? "mdi:weather-sunny" : "mdi:weather-night"}
            width="20"
            height="20"
          />
        </span>
        {isOpen && <span className="label">Modo</span>}
      </div>

      <div className="menu-item sair">
        <Icon icon="mdi:logout" width="20" height="20" />
        {isOpen && <span className="label">Sair</span>}
      </div>
    </div>
  );
}
