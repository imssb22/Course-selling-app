// src/components/AuthForm.js
import { useState } from "react";
import { Link } from "react-router-dom";

const AuthForm = ({ type, onSubmit }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h3 className="text-2xl font-bold text-center mb-6">
          {type === "signup" ? "Hi There, Sign Up" : "Welcome Back! Sign In"}
        </h3>
        <form onSubmit={(e) => onSubmit(e, formData)}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            {type === "signup" ? "Sign Up" : "Sign In"}
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          {type === "signup" ? "Already have an account?" : "Don't have an account?"}{" "}
          <Link to={type === "signup" ? "/signin" : "/signup"} className="text-blue-500">
            {type === "signup" ? "Sign In" : "Sign Up"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
