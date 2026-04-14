import TourCard from "../components/TourCard";

export default function Favorites({ favorites, onToggleFavorite, onDeleteTour, isLoggedIn }) {
  return (
    <section className="page-section">
      <div className="page-header">
        <div>
          <h1>Your Favorite Tours</h1>
          <p>Keep track of the places you want to visit next.</p>
        </div>
      </div>

      {favorites.length === 0 ? (
        <p className="status-message">You have no favorites yet. Add a few from the home page.</p>
      ) : (
        <div className="tour-grid">
          {favorites.map((tour) => (
            <TourCard
              key={tour._id || tour.id}
              tour={tour}
              isFavorite={true}
              onToggleFavorite={onToggleFavorite}
              onDelete={isLoggedIn ? onDeleteTour : null}
            />
          ))}
        </div>
      )}
    </section>
  );
}
