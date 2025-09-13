import "./Project.css";
interface ProjectProps {
  title: string;
  imageSrc?: string;
  description: string;
  link: string;
  altText: string;
}
export const Project = (props: ProjectProps) => {
  return (
    <a href={props.link} className="projects__project">
      <img
        src={props.imageSrc}
        alt={props.altText}
        className="projects__project-image"
      />
      <div className="projects__project-content">
        <h3 className="projects__project-title">{props.title}</h3>
        <div className="projects__project-description">{props.description}</div>
      </div>
    </a>
  );
};
