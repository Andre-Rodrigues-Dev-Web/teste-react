import { FaEnvelope, FaLinkedin } from "react-icons/fa6";
import { Surface } from "../../../../Components/Surface/Surface";
import { UnderlineLink } from "../../../../Components/UnderlineLink/UnderlineLink";
import "./Contact.css";
export const Contact = () => {
  return (
    <Surface padding={2} color="base" className="portfolio-section">
      <div className="contact">
        <span className="contact__description">
          Entre em contato comigo via e-mail ou LinkedIn!
        </span>
        <div className="contact__info">
          <UnderlineLink
            className="contact__link"
            href="mailto:gabrielvaleriano18@outlook.com"
          >
            <FaEnvelope color="var(--theme-yellow)" />
            gabrielvaleriano18@outlook.com
          </UnderlineLink>

          <UnderlineLink
            className="contact__link"
            href="https://www.linkedin.com/in/gabriel-valeriano-gomes-43a21a209/"
          >
            <FaLinkedin color="var(--theme-blue)" /> LinkedIn
          </UnderlineLink>
        </div>
      </div>
    </Surface>
  );
};
