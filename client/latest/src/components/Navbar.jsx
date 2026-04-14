import { Link } from "react-router-dom";

export default function Navbar({ isLoggedIn, onLogout, theme, onToggleTheme }) {
  return (
    <header className="topbar">
      <div className="brand">
        <Link to="/">Tiny Tours</Link>
      </div>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/favorites">Favorites</Link>
        {isLoggedIn && <Link to="/create">Create Tour</Link>}
      </nav>
      <div className="nav-actions">
        <button className="theme-toggle" onClick={onToggleTheme} aria-label="Toggle dark mode">
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
        {isLoggedIn ? (
          <button className="button button--ghost" onClick={onLogout}>
            Logout
          </button>
        ) : (
          <>
            <Link className="button button--ghost" to="/login">
              Login
            </Link>
            <Link className="button button--primary" to="/signup">
              Signup
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
