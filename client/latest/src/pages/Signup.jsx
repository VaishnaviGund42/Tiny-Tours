import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup({ onSignup }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const created = await onSignup({ name, email, password });
    if (created) {
      setSuccess("Signup successful! Redirecting to login…");
      setTimeout(() => navigate("/login"), 900);
    } else {
      setError("Signup failed. Please try again with valid information.");
    }

    setLoading(false);
  };

  return (
    <section className="form-section">
      <div className="form-panel">
        <h2>Create an Account</h2>
        <p>Sign up and start saving tours you love.</p>
        <form onSubmit={handleSubmit}>
          <label>
            Name
            <input value={name} onChange={(event) => setName(event.target.value)} type="text" required />
          </label>
          <label>
            Email
            <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" required />
          </label>
          <label>
            Password
            <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" required minLength="6" />
          </label>
          <button className="button button--primary" disabled={loading} type="submit">
            {loading ? "Signing up…" : "Signup"}
          </button>
          {error && <p className="status-message status-message--error">{error}</p>}
          {success && <p className="status-message status-message--success">{success}</p>}
        </form>
      </div>
    </section>
  );
}
