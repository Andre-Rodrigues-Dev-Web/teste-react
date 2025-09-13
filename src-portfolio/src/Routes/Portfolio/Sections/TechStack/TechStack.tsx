import { FaHandPointDown, FaWrench } from "react-icons/fa6";
import { techStackList } from "./techStackList";
import { TechStackGridItem } from "./TechStackGridItem/TechStackGridItem";
import { Surface } from "../../../../Components/Surface/Surface";
import "./TechStack.css";
export const TechStack = () => {
  return (
    <Surface color="base" padding={2} className="portfolio-section" shadow>
      <div className="tech-stack">
        <h2 className="tech-stack__title">
          <FaWrench /> Tecnologias
        </h2>
        <div className="tech-stack__description">
          Dá uma olhada na minha caixa de ferramentas!
          <div className="hand-icon">
            <FaHandPointDown />
          </div>
        </div>
        <div className="tech-stack__list">
          {techStackList.map((stack) => (
            <div className="tech-stack__list-section" key={stack.title}>
              <h3 className="tech-stack__list-section-title">
                <stack.Icon /> {stack.title}
              </h3>
              <ul className="tech-stack__grid">
                {stack.items.map((item) => (
                  <li key={item.name}>
                    <TechStackGridItem
                      name={item.name}
                      icon={item.svg}
                      adaptive={item.adaptive}
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Surface>
  );
};
