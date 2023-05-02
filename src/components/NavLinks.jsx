import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  useLocation,
} from "react-router-dom";
import "../css/NavLinks.css";
export const NavLinks = ({ to, label }) => {
  const { pathname } = useLocation();
  const isActive = pathname === to;

  return (
    <Link
      to={to}
      className={isActive ? "active" : ""}
      style={{ color: isActive ? "white" : "gray" }}
    >
      {label}
    </Link>
  );
};
