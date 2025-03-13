import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AccountNavigation() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const links = currentUser ? ["Profile"] : ["Signin", "Signup"];
  const { pathname } = useLocation();

  return (
    <div className="list-group">
      {links.map((link) => (
        <Link
          key={link}
          to={`/Kambaz/Account/${link}`}
          className={`list-group-item ${pathname.includes(link) ? "active" : ""}`}>
          {link}
        </Link>
      ))}
    </div>
  );
}
