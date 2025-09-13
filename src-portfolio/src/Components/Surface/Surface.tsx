import type { PropsWithChildren } from "react";
import "./Surface.css";

interface SurfaceProps {
  color: "base" | "surface-0";
  padding: 0 | 1 | 2;
  shadow?: boolean;
  className?: string;
  id?: string;
  center?: boolean;
  doubleRadius?: boolean;
}

export const Surface = (props: PropsWithChildren<SurfaceProps>) => {
  return (
    <div
      id={props.id}
      className={`surface surface--${props.color} surface--padding-${props.padding}
        ${props.shadow ? "surface--shadow" : ""} ${props.className ?? ""}
        ${props.center ? "surface--center" : ""} ${props.doubleRadius ? "surface--double-radius" : ""}`}
    >
      {props.children}
    </div>
  );
};
