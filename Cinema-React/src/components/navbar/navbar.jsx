import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";


function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{width: '100vw'}}>
        <div className="container-fluid ">
          <Link className="navbar-brand" to="/home">
            <strong>🎬 Cinema</strong>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/home">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/cadastro-filmes">
                  Cadastro Filmes
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/cadastro-salas">
                  Cadastro Salas
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/cadastro-sessoes">
                  Cadastro Sessões
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/venda-ingressos">
                  Ingressos
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/sessoes">
                  Sessões
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
