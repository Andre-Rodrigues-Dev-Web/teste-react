import { Surface } from "../../../../Components/Surface/Surface";
import "./Hero.css";
export const Hero = () => {
  return (
    <div className="hero">
      <Surface
        padding={2}
        shadow
        color="base"
        center
        className="hero__surface"
        doubleRadius
      >
        <div className="hero__body">
          <div className="hero__content">
            <div className="hero__text">
              <h1 className="hero__name">Gabriel Valeriano Gomes</h1>
              <span className="hero__description">
                Desenvolvedor de software
              </span>
            </div>
            <img
              src="/photo.jpg"
              className="hero__img"
              alt="Foto de Gabriel Valeriano Gomes"
            />
          </div>
        </div>
      </Surface>
    </div>
  );
};
