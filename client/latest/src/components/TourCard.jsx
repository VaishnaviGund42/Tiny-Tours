import { useState } from "react";

const placeholderImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400'%3E%3Crect width='600' height='400' fill='%23d9e2ec'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23626f83' font-family='Arial,sans-serif' font-size='30'%3ENo Image Available%3C/text%3E%3C/svg%3E";

const getImageUrl = (url) => {
  if (!url) return placeholderImage;
  const driveMatch = url.match(/drive\.google\.com\/(?:file\/d\/([a-zA-Z0-9_-]+)|open\?id=([a-zA-Z0-9_-]+)|uc\?id=([a-zA-Z0-9_-]+))/);
  if (driveMatch) {
    const fileId = driveMatch[1] || driveMatch[2] || driveMatch[3];
    return `https://drive.google.com/uc?export=view&id=${fileId}`;
  }
  return url;
};

export default function TourCard({ tour, isFavorite, onToggleFavorite, onDelete }) {
  const [expanded, setExpanded] = useState(false);
  const preview = tour.description?.slice(0, 120) || "No description available.";
  const description = expanded ? tour.description : preview;
  const imageSrc = getImageUrl(tour.image);

  return (
    <article className="tour-card">
      <div className="tour-image-wrapper">
        <img
          className="tour-image"
          src={imageSrc}
          alt={tour.title}
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = placeholderImage;
          }}
        />
      </div>
      <div className="tour-card-content">
        <div className="tour-card-top">
          <h3>{tour.title}</h3>
          <div className="tour-card-actions">
            <button className="favorite-button" onClick={() => onToggleFavorite(tour)}>
              {isFavorite ? "❤️" : "🤍"}
            </button>
            {onDelete && (
              <button className="delete-button" onClick={() => onDelete(tour._id)}>
                🗑️
              </button>
            )}
          </div>
        </div>
        <p className="tour-price">${tour.price ?? "0.00"}</p>
        <p className="tour-description">
          {description}
          {tour.description?.length > 120 && (
            <button className="read-more" onClick={() => setExpanded((prev) => !prev)}>
              {expanded ? "Show Less" : "Read More"}
            </button>
          )}
        </p>
      </div>
    </article>
  );
}
