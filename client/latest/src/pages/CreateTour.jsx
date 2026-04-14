import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateTour({ onCreateTour, isLoggedIn }) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  if (!isLoggedIn) {
    navigate("/login");
    return null;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("description", description);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    const created = await onCreateTour(formData);
    if (created) {
      setSuccess("Tour added successfully.");
      setTitle("");
      setPrice("");
      setDescription("");
      setImageFile(null);
      setTimeout(() => navigate("/"), 1200);
    } else {
      setError("Unable to create the tour. Please try again.");
    }

    setLoading(false);
  };

  return (
    <section className="form-section">
      <div className="form-panel">
        <h2>Create a New Tour</h2>
        <p>Fill in the details for your next Tiny Tour listing.</p>
        <form onSubmit={handleSubmit}>
          <label>
            Title
            <input value={title} onChange={(event) => setTitle(event.target.value)} type="text" required />
          </label>
          <label>
            Price
            <input
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              type="number"
              min="0"
              step="0.01"
              required
            />
          </label>
          <label>
            Description
            <textarea value={description} onChange={(event) => setDescription(event.target.value)} rows="5" required />
          </label>
          <label>
            Upload Image
            <input
              type="file"
              accept="image/*"
              onChange={(event) => setImageFile(event.target.files?.[0] || null)}
              required
            />
          </label>
          <button className="button button--primary" disabled={loading} type="submit">
            {loading ? "Creating…" : "Create Tour"}
          </button>
          {error && <p className="status-message status-message--error">{error}</p>}
          {success && <p className="status-message status-message--success">{success}</p>}
        </form>
      </div>
    </section>
  );
}
