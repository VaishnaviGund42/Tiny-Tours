import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    const success = await onLogin({ email, password });
    if (success) {
      navigate("/");
    } else {
      setError("Login failed. Check your credentials and try again.");
    }

    setLoading(false);
  };

  return (
    <section className="form-section">
      <div className="form-panel">
        <h2>Login</h2>
        <p>Enter your email and password to access Tiny Tours.</p>
        <form onSubmit={handleSubmit}>
          <label>
            Email
            <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" required />
          </label>
          <label>
            Password
            <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" required />
          </label>
          <button className="button button--primary" disabled={loading} type="submit">
            {loading ? "Logging in…" : "Login"}
          </button>
          {error && <p className="status-message status-message--error">{error}</p>}
        </form>
      </div>
    </section>
  );
}
