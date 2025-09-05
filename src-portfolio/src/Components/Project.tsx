interface ProjectProps {
  title: string;
  imageSrc?: string;
  description: string;
  link: string;
}
export const Project = (props: ProjectProps) => {
  return (
    <a href={props.link} className="project-container">
      <img src={props.imageSrc} className="project-image" />
      <div className="project-content">
        <h3 className="project-title">{props.title}</h3>
        <div className="project-description">{props.description}</div>
      </div>
    </a>
  );
};
