import type { PropsWithChildren } from "react";
import { Link, type To } from "react-router";
import "./UnderlineLink.css";
interface UnderlineLinkProps {
  className?: string;
}
interface LinkProps {
  route?: false;
  href?: string;
}
interface RouterLinkProps {
  route: true;
  to: To;
}

export const UnderlineLink = (
  props: PropsWithChildren<UnderlineLinkProps & (LinkProps | RouterLinkProps)>,
) => {
  return props.route ? (
    <Link to={props.to} className={`underline-link ${props.className ?? ""}`}>
      {props.children}
    </Link>
  ) : (
    <a href={props.href} className={`underline-link ${props.className ?? ""}`}>
      {props.children}
    </a>
  );
};
