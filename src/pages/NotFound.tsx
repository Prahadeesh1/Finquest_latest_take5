import { useLocation } from "react-router-dom";
import { useEffect } from "react";

/**
 * NotFound Component
 * Displays a 404 error page for non-existent routes.
 * It also logs the attempted path for debugging and monitoring purposes.
 */
const NotFound = () => {
  const location = useLocation(); // Gets the current location object, including the pathname.
  // Logs a 404 error to the console whenever a user tries to access a route that doesn't exist.
  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);// Dependency array ensures this effect runs only when the pathname changes.

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
        <a href="/" className="text-blue-500 hover:text-blue-700 underline">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
