import { Link } from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import "bootstrap/dist/css/bootstrap.min.css";

export default function KambazNavigation() {
  const navLinks = [
    {
      id: "wd-dashboard-link",
      label: "Dashboard",
      path: "/Kambaz/Dashboard",
      icon: AiOutlineDashboard,
      iconClass: "fs-1 text-danger",
      textClass: "text-danger",
    },
    {
      id: "wd-course-link",
      label: "Courses",
      path: "/Kambaz/Courses/RS101/Home",
      icon: LiaBookSolid,
      iconClass: "fs-1 text-danger",
      textClass: "text-white",
    },
    {
      id: "wd-calendar-link",
      label: "Calendar",
      path: "/Kambaz/Calendar",
      icon: IoCalendarOutline,
      iconClass: "fs-1 text-white",
      textClass: "text-white",
    },
    {
      id: "wd-inbox-link",
      label: "Inbox",
      path: "/Kambaz/Inbox",
      icon: FaInbox,
      iconClass: "fs-1 text-white",
      textClass: "text-white",
    },
    {
      id: "wd-labs-link",
      label: "Labs",
      path: "/Labs",
      icon: null,
      iconClass: "",
      textClass: "text-white",
    },
  ];

  return (
    <div
      id="wd-kambaz-navigation"
      style={{ width: 120 }}
      className="list-group rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2"
    >
      <a
        id="wd-neu-link"
        href="https://www.northeastern.edu/"
        target="_blank"
        className="list-group-item bg-black border-0 text-center"
      >
        <img src="images/NEU.png" width="75px" alt="Northeastern Logo" />
      </a>

      <Link
        to="/Kambaz/Account"
        id="wd-account-link"
        className="list-group-item text-center border-0 bg-black text-white"
      >
        <FaRegCircleUser className="fs-1 text-white" />
        <br />
        Account
      </Link>

      {navLinks.map((link) => (
        <Link
          key={link.id}
          to={link.path}
          id={link.id}
          className={`list-group-item text-center border-0 bg-black ${link.textClass}`}
        >
          {link.icon && link.icon({ className: link.iconClass })}
          <br />
          {link.label}
        </Link>
      ))}
    </div>
  );
}
