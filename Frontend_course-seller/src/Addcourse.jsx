import { useState } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";

function Addcourse() {
  const [formData, setFormData] = useState({ title: "", description: "", image: "" });
  const [message, setMessage] = useState("");
  // const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("You must be logged in to add a course.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/admin/courses", formData, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token,
        },
      });

      const data = response.data;
      if (response.status === 200) {
        setMessage("Course added successfully!");
        setFormData({ title: "", description: "", image: "" }); // Clear form after success
      } else {
        setMessage(data.message || "Failed to add course.");
      }
    } catch (error) {
      console.error("Error adding course:", error);
      setMessage("An error occurred.");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          <h3 className="text-2xl font-bold text-center mb-6">Add a new course</h3>
          {message && <p className="text-center text-red-500">{message}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Description</label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Image Link</label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            >
              ADD
            </button>
          </form>
        </div>
      </div>
      {/* <div>
        <button 
        type="button"
        onClick={() => navigate("/courses")}
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >View Courses </button>
      </div> */}
    </div>
  );
}

export default Addcourse;