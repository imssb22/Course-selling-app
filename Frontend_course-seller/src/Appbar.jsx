import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const AppBar = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUserEmail(null);
      setIsLoading(false);
      return;
    }
    axios
      .get("http://localhost:3000/admin/me", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        if (response.data.username) {
          setUserEmail(response.data.username);
        } else {
          setUserEmail(null);
        }
        setIsLoading(false);
      })
      .catch(() => {
        setUserEmail(null);
        setIsLoading(false);
      });
  };

  // Run on mount and when localStorage token changes
  useEffect(() => {
    fetchUser();
  }, []); // 👈 Dependency ensures re-fetching

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserEmail(null);
    navigate("/signin");
  };

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left: Company Name */}
        <Link to="/">
          <h1 className="text-2xl font-bold">MyCompany</h1>
        </Link>

        {/* Right: Authentication Buttons */}
        <div className="space-x-4">
          {isLoading ? (
            <p>Loading...</p>
          ) : userEmail ? (
            <>
              <button
                type="button"
                onClick={() => navigate("/addcourse")}
                className="border border-white px-4 py-2 rounded-lg font-medium hover:bg-white hover:text-blue-600 transition"
              >
                Add Course
              </button>
              <button
                type="button"
                onClick={() => navigate("/courses")}
                className="border border-white px-4 py-2 rounded-lg font-medium hover:bg-white hover:text-blue-600 transition"
              >
                View Courses
              </button>
              <button
                onClick={handleLogout}
                className="border border-white px-4 py-2 rounded-lg font-medium hover:bg-white hover:text-blue-600 transition"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/signup")}
                className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition"
              >
                Sign Up
              </button>
              <button
                onClick={() => navigate("/signin")}
                className="border border-white px-4 py-2 rounded-lg font-medium hover:bg-white hover:text-blue-600 transition"
              >
                Sign In
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default AppBar;