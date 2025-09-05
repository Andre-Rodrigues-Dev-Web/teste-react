interface TechStackItemProps {
  name: string;
  icon: string;
}
export const TechStackItem = (props: TechStackItemProps) => {
  return (
    <div className="tech-stack-item">
      <img className="icon" src={`/${props.icon}.svg`} />
      <div className="name">{props.name}</div>
    </div>
  );
};
