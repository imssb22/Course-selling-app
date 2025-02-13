import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AppBar = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const fetchUser = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUserEmail(null);
      return;
    }

    fetch("http://localhost:3000/admin/me", {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.username) {
          setUserEmail(data.username);
          setIsLoading(false);
        } else {
          setUserEmail(null);
        }
      })
      .catch(() => setUserEmail(null));
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
        <h1 className="text-2xl font-bold">MyCompany</h1>

        {/* Right: Authentication Buttons */}
        <div className="space-x-4">
          {userEmail ? (
            <>
              <span>{userEmail}</span>
              <button
                onClick={handleLogout}
                className="border border-white px-4 py-2 rounded-lg font-medium hover:bg-white hover:text-blue-600 transition"
              >
                Log Out
              </button>
              <button
                type="button"
                onClick={() => navigate("/courses")}
                className="border border-white px-4 py-2 rounded-lg font-medium hover:bg-white hover:text-blue-600 transition"
              >
                View Courses
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