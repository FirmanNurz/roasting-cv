import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <nav>
        <ul
          style={{
            listStyleType: "none",
            display: "flex",
            justifyContent: "space-around",
            backgroundColor: "#7e6805",
            padding: 10,
          }}
        >
          <li>
            <Link to="/" style={{ color: "white", textDecoration: "none", padding: 10 }}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/upload" style={{ color: "white", textDecoration: "none", padding: 10 }}>
              Upload CV
            </Link>
          </li>
          <li>
            <Link to="/analysis" style={{ color: "white", textDecoration: "none", padding: 10 }}>
              Analysis Result
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
