import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";
import clsx from "clsx";

const getNavLinks = (props) => {
  return clsx(css.link, props.isActive && css.active);
};

export default function Navigation() {
  return (
    <div className={css.navigation}>
      <NavLink to="/" className={getNavLinks}>
        Home
      </NavLink>
      <NavLink to="/movies" className={getNavLinks}>
        Movies
      </NavLink>
    </div>
  );
}
