import type { PropsWithChildren, MouseEventHandler } from "react";
import { Link, type To } from "react-router";
import "./Button.css";
interface BaseButtonProps {
  color: "primary" | "secondary";
  className?: string;
}
interface ButtonProps {
  type: "button" | "submit";
  onClick?: MouseEventHandler<HTMLButtonElement>;
}
interface LinkProps {
  type: "link";
  to: To;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}
export const Button = (
  props: PropsWithChildren<BaseButtonProps & (ButtonProps | LinkProps)>,
) => {
  const className = `button button--${props.color} ${props.className ?? ""}`;

  return props.type === "link" ? (
    <Link className={className} to={props.to} onClick={props.onClick}>
      {props.children}
    </Link>
  ) : (
    <button className={className} type={props.type} onClick={props.onClick}>
      {props.children}
    </button>
  );
};
