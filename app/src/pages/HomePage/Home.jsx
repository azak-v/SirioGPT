import React, { useState } from "react";
import "./Home.css";
import SirioHomePage from "../../assets/SirioHomePage.png";
import LogoSirio from "../../assets/LogoSirio.png";
import TipPage from "../TipPage/TipPage";

function Home() {
  const pages = [{ id: 0, imgsrc: "link", title: "", content: "" }, "tipPage"];
  const [currentPage, setCurrentPage] = useState("homePage");

  return (
    <div id="pagesContainer">
      {currentPage === "homePage" ? (
        <div className="mainContent">
          <img
            src={SirioHomePage}
            alt="Foto em 3D do Dr.Sirio"
            id="homePageImg"
          />
          <h1 id="pageTitle">Conheça o Sirio!</h1>
          <p id="pageContent">
            O Dr. Sirio é a inteligência virtual psicóloga do{" "}
            <span style={{ color: "var(--main-green-color)" }}>
              <strong>
                <a
                  style={{
                    textDecoration: "none",
                    color: "var(--main-green-color)",
                  }}
                  href="https://alma.hsl.org.br"
                  target="blank"
                >
                  Alma Sírio-Libanês
                </a>
              </strong>
            </span>
            , ele está aqui para te ajudar imediatamente em seus momentos
            difíceis!
          </p>
          <button
            onClick={() => setCurrentPage("tipPage")}
            className="startButton"
          >
            Começar Agora
          </button>
        </div>
      ) : (
        <TipPage />
      )}
      <div className="logo">
        {/* <img id="logoSirio" src={LogoSirio} alt="" /> */}
      </div>
    </div>
  );
}

export default Home;
