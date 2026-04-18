import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CreateTour from "./pages/CreateTour";
import { createTour as createTourRequest, deleteTour as deleteTourRequest, fetchTours, loginUser, signupUser, setAuthToken } from "./services/api";

function App() {
  const [token, setToken] = useState(localStorage.getItem("tinyToursToken") || "");
  const [tours, setTours] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem("tinyToursFavorites");
    return stored ? JSON.parse(stored) : [];
  });
  const [theme, setTheme] = useState(localStorage.getItem("tinyToursTheme") || "light");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const getErrorMessage = (err, fallback) => {
    const data = err?.response?.data;
    if (typeof data === "string") return data;
    if (data && typeof data.error === "string") return data.error;
    return fallback;
  };

  const [search, setSearch] = useState("");

  useEffect(() => {
    setAuthToken(token);
    if (token) {
      localStorage.setItem("tinyToursToken", token);
    } else {
      localStorage.removeItem("tinyToursToken");
    }
  }, [token]);

  useEffect(() => {
    localStorage.setItem("tinyToursFavorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("tinyToursTheme", theme);
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    const loadTours = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetchTours();
        const toursData = Array.isArray(response.data) ? response.data : [];
        setTours(toursData);
      } catch (fetchError) {
        setError(getErrorMessage(fetchError, "Unable to load tours."));
        setTours([]);
      } finally {
        setLoading(false);
      }
    };

    loadTours();
  }, []);

  const handleLogin = async (credentials) => {
    try {
      const response = await loginUser(credentials);
      if (response?.data?.token) {
        setToken(response.data.token);
        return true;
      }
      setError("Login did not return a token.");
      return false;
    } catch (loginError) {
      setError(getErrorMessage(loginError, "Login failed. Please try again."));
      return false;
    }
  };

  const handleSignup = async (formData) => {
    try {
      await signupUser(formData);
      return true;
    } catch (signupError) {
      setError(getErrorMessage(signupError, "Signup failed. Please try again."));
      return false;
    }
  };

  const handleCreateTour = async (tourData) => {
    try {
      const response = await createTourRequest(tourData);
      setTours((previousTours) => [response.data, ...previousTours]);
      return true;
    } catch (tourError) {
      setError(getErrorMessage(tourError, "Failed to create the tour."));
      return false;
    }
  };

  const handleLogout = () => {
    setToken("");
  };

  const handleDeleteTour = async (tourId) => {
    try {
      await deleteTourRequest(tourId);
      setTours((currentTours) => currentTours.filter((tour) => tour._id !== tourId));
      setFavorites((currentFavorites) => currentFavorites.filter((tour) => tour._id !== tourId));
      return true;
    } catch (deleteError) {
      setError(getErrorMessage(deleteError, "Failed to delete the tour."));
      return false;
    }
  };

  const toggleFavorite = (tour) => {
    setFavorites((currentFavorites) => {
      const exists = currentFavorites.some((item) => item._id === tour._id);
      if (exists) {
        return currentFavorites.filter((item) => item._id !== tour._id);
      }
      return [tour, ...currentFavorites];
    });
  };

  const handleThemeToggle = () => {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  };

  return (
    <BrowserRouter>
      <div className="app-shell">
        <Navbar
          isLoggedIn={Boolean(token)}
          onLogout={handleLogout}
          theme={theme}
          onToggleTheme={handleThemeToggle}
        />
        <main className="page-content">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  tours={tours}
                  favorites={favorites}
                  loading={loading}
                  error={error}
                  search={search}
                  onSearchChange={setSearch}
                  onToggleFavorite={toggleFavorite}
                  onDeleteTour={handleDeleteTour}
                  isLoggedIn={Boolean(token)}
                />
              }
            />
            <Route
              path="/favorites"
              element={
                <Favorites
                  favorites={favorites}
                  onToggleFavorite={toggleFavorite}
                  onDeleteTour={handleDeleteTour}
                  isLoggedIn={Boolean(token)}
                />
              }
            />
            <Route
              path="/login"
              element={token ? <Navigate to="/" replace /> : <Login onLogin={handleLogin} />}
            />
            <Route
              path="/signup"
              element={token ? <Navigate to="/" replace /> : <Signup onSignup={handleSignup} />}
            />
            <Route
              path="/create"
              element={
                token ? (
                  <CreateTour onCreateTour={handleCreateTour} isLoggedIn={Boolean(token)} />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
