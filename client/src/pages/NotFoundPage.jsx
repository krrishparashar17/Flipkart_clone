import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>404 - Page Not Found</h1>
      <Link to="/">Go to Home</Link>
    </div>
  );
}

export default NotFoundPage;