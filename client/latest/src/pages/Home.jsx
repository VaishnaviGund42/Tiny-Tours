import LoadingSpinner from "../components/LoadingSpinner";
import TourCard from "../components/TourCard";

export default function Home({
  tours,
  favorites,
  loading,
  error,
  search,
  onSearchChange,
  onToggleFavorite,
  onDeleteTour,
  isLoggedIn,
}) {
  const filteredTours = tours.filter((tour) => {
    const terms = `${tour.title} ${tour.description}`.toLowerCase();
    return terms.includes(search.toLowerCase());
  });

  return (
    <section className="page-section">
      <div className="page-header">
        <div>
          <h1>Explore Tiny Tours</h1>
          <p>Browse curated trips, save your favorites, and book your next adventure.</p>
        </div>
        <input
          className="search-input"
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search tours by title or description"
        />
      </div>

      {loading && <LoadingSpinner />}
      {error && <p className="status-message status-message--error">{error}</p>}
      {!loading && !error && filteredTours.length === 0 && (
        <p className="status-message">No matching tours found.</p>
      )}

      <div className="tour-grid">
        {filteredTours.map((tour) => (
          <TourCard
            key={tour._id || tour.id}
            tour={tour}
            isFavorite={favorites.some((item) => item._id === tour._id)}
            onToggleFavorite={onToggleFavorite}
            onDelete={isLoggedIn ? onDeleteTour : null}
          />
        ))}
      </div>
    </section>
  );
}
