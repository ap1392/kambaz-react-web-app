import { Link } from "react-router-dom";

export default function Signin() {
  return (
    <div className="container mt-3" id="wd-signin-screen">
      <h3>Sign in</h3>
      <input
        placeholder="username"
        className="form-control mb-2"
        id="wd-username"
      />
      <input
        placeholder="password"
        type="password"
        className="form-control mb-2"
        id="wd-password"
      />
      <Link
        to="/Kambaz/Dashboard"
        className="btn btn-primary w-100 mb-2"
        id="wd-signin-btn"
      >
        Sign in
      </Link>
      <Link to="/Kambaz/Account/Signup" id="wd-signup-link">
        Sign up
      </Link>
    </div>
  );
}
