import { FaAddressCard, FaArrowDown, FaCode } from "react-icons/fa6";
import { About } from "./Sections/About/About";
import { TechStack } from "./Sections/TechStack/TechStack";
import { Projects } from "./Sections/Projects/Projects";
import { Contact } from "./Sections/Contact/Contact";
import { Hero } from "./Sections/Hero/Hero";
import "./Portfolio.css";

export const Portfolio = () => {
  return (
    <div className="portfolio">
      <main className="portfolio__content">
        <Hero />
        <div className="portfolio__section-button">
          <FaArrowDown />
          <h2> Sobre mim</h2>
        </div>
        <About />
        <TechStack />
        <div className="portfolio__section-button">
          <FaCode />
          <h2> Projetos</h2>
        </div>
        <Projects />
        <div className="portfolio__section-button">
          <FaAddressCard />
          <h2> Contato</h2>
        </div>
        <Contact />
      </main>
    </div>
  );
};
