import React, { useState } from "react";
import "./TipPage.css";
import Sirio1 from "../../assets/Sirio1.png";
import Sirio2 from "../../assets/Sirio2.png";
import Sirio3 from "../../assets/Sirio3.png";
import Arrow from "../../assets/Arrow.png";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Link } from "react-router-dom";

function TipPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentSwiperInstance, setCurrentSwiperInstance] = useState();
  const TipPageImages = [Sirio1, Sirio2, Sirio3];

  return (
    <div id="TipPageContainer">
      <img
        id="TipPageImg"
        src={TipPageImages[currentSlide]}
        alt="Imagem 3d do sirio"
      />
      <h1 id="TipPageTitle">Dicas!</h1>
      {/* Carrousel aqui embaixo */}
      <div className="SwiperContainer">
        <Swiper
          style={{
            "--swiper-pagination-color": "var(--main-green-color)",
            "--swiper-pagination-bullet-size": "16px",
          }}
          className="Swiper"
          modules={[Pagination]}
          spaceBetween={10}
          slidesPerView={1}
          pagination
          onSwiper={(swiper) => {
            setCurrentSwiperInstance(swiper);
          }}
          onSlideChange={() => {
            setCurrentSlide(currentSwiperInstance.activeIndex);
          }}
        >
          <SwiperSlide className="SwiperSlide">
            <div className="TipPageSliderContainer">
              <p className="TipPageSliderContent">
                O Dr. Sirio é extremamente inteligente e pode conversar com você
                sobre diversos assuntos, mas ainda é apenas uma inteligência
                artificial, podendo cometer alguns erros e demorar para
                responder perguntas complexas!
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="TipPageSliderContainer">
              <p className="TipPageSliderContent">
                O Dr. Sirio <strong>não substitui um profissional</strong> ele
                apenas presta um suporte imediato em um momento de necessidade,
                onde o encontro presencial com um é dificultado, quando você
                quer saber mais sobre o assunto ou quando você só precisa falar
                com alguém!
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="TipPageSliderContainer">
              <p className="TipPageSliderContent">
                Aproveite o auxílio do Dr. Sirio sempre que precisar, porém
                recomendamos os psicólogos e psiquiatras do{" "}
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
                . Um hospital preparado para você e para o futuro!
              </p>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="tipPageButton">
        {currentSlide === 2 ? (
          <Link to="SirioGPT">
            <button className="startChatButton">Começar conversa!</button>
          </Link>
        ) : (
          <img
            onClick={() => {
              currentSwiperInstance.slideNext();
            }}
            id="SwipeButton"
            src={Arrow}
          />
        )}
      </div>
    </div>
  );
}

export default TipPage;
