import { Link, useLocation } from "react-router";
import "../styles/error.css";

export default function ErrorRoute() {
  const location = useLocation();
  return (
    <div className="error">
      <div className="error-title">404 - Page Not Found</div>
      <div className="error-desc">
        The path you were looking for ({location.pathname}) could not be found.
      </div>
      <div className="error-desc">
        Return to <Link to="/">Homepage</Link>
      </div>
    </div>
  );
}
