import { Link } from "react-router-dom";

export default function Profile() {
  return (
    <div className="container mt-3" id="wd-profile-screen">
      <h3>Profile</h3>
      <input
        defaultValue="alice"
        placeholder="username"
        className="form-control mb-2 wd-username"
      />
      <input
        defaultValue="123"
        placeholder="password"
        type="password"
        className="form-control mb-2 wd-password"
      />
      <input
        defaultValue="Alice"
        placeholder="First Name"
        className="form-control mb-2"
        id="wd-firstname"
      />
      <input
        defaultValue="Wonderland"
        placeholder="Last Name"
        className="form-control mb-2"
        id="wd-lastname"
      />
      <input
        defaultValue="2000-01-01"
        type="date"
        className="form-control mb-2"
        id="wd-dob"
      />
      <input
        defaultValue="alice@wonderland"
        type="email"
        className="form-control mb-2"
        id="wd-email"
      />
      <select defaultValue="FACULTY" className="form-select mb-2" id="wd-role">
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option>
        <option value="STUDENT">Student</option>
      </select>
      <Link to="/Kambaz/Account/Signin" className="btn btn-danger w-100">
        Sign out
      </Link>
    </div>
  );
}
