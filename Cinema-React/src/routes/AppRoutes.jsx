import react from "react"; 
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min"

//importing components
import Home from "../pages/Home";
import FilmePage from "../pages/CadastroFilmes"
import SalaPage from "../pages/CadastroSalas"
import SessaoPage from "../pages/CadastroSessoes"
import IngressoPage from "../pages/Ingressos"
import SessaoViewPage from "../pages/Sessoes"

export  function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cadastro-filmes" element={<FilmePage />} />
      <Route path="/cadastro-salas" element={<SalaPage />} />
      <Route path="/cadastro-sessoes" element={<SessaoPage />} />
      <Route path="/venda-ingressos" element={<IngressoPage />} />
      <Route path="/sessoes" element={<SessaoViewPage />} />
      <Route path="*" element={<Home />} />       
    </Routes>
  );
}