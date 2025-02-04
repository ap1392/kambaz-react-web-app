import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div className="container mt-3" id="wd-signup-screen">
      <h3>Sign up</h3>
      <input placeholder="username" className="form-control mb-2 wd-username" />
      <input
        placeholder="password"
        type="password"
        className="form-control mb-2 wd-password"
      />
      <input
        placeholder="verify password"
        type="password"
        className="form-control mb-2 wd-password-verify"
      />
      <Link to="/Kambaz/Account/Profile" className="btn btn-primary w-100 mb-2">
        Sign up
      </Link>
      <Link to="/Kambaz/Account/Signin">Sign in</Link>
    </div>
  );
}
