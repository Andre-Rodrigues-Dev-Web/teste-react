import type { PropsWithChildren } from "react";
import { Link, type To } from "react-router";
import "./UnderlineLink.css";
interface LinkProps {
  route?: false;
  href?: string;
}
interface RouterLinkProps {
  route: true;
  to: To;
}

export const UnderlineLink = (
  props: PropsWithChildren<LinkProps | RouterLinkProps>,
) => {
  return props.route ? (
    <Link to={props.to} className="underline-link">
      {props.children}
    </Link>
  ) : (
    <a href={props.href} className="underline-link">
      {props.children}
    </a>
  );
};
