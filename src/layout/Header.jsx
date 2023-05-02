import { NavLinks } from "../components/NavLinks";
import "./Header.css";
const links = [
  { to: "/", label: "Home" },
  { to: "/profile", label: "Profile" },
];

export const Header = () => {
  return (
    <div className="Header">
      <div className="Links">
        {links.map((link) => (
          <NavLinks key={link.to} to={link.to} label={link.label} />
        ))}
      </div>
    </div>
  );
};
