import { Link } from "react-router-dom";

export default function AccountNavigation() {
  return (
    <div id="wd-account-navigation" className="mt-3 p-3">
      <Link to="/Kambaz/Account/Signin" className="text-dark d-block mb-3">
        Signin
      </Link>
      <Link to="/Kambaz/Account/Signup" className="text-danger d-block mb-3">
        Signup
      </Link>
      <Link to="/Kambaz/Account/Profile" className="text-danger d-block">
        Profile
      </Link>
    </div>
  );
}
