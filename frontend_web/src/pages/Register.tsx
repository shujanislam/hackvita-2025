import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    phone: "",
    grade: "",
    password: "",
    confirmPassword: ""
  });

  const navigate = useNavigate();

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (registerData.password !== registerData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/v1/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(registerData),
          credentials: "include",
        }
      );

      const data = await response.json();
      if (data.success) {
        await navigate("/");
        window.location.reload();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 md:p-8 max-w-4xl w-full flex flex-col md:flex-row">
        {/* Left Image Section */}
        <div className="md:w-1/2 flex justify-center items-center mb-6 md:mb-0">
          <img
            src="https://thumbs.dreamstime.com/b/cute-pink-brain-character-dumbbell-mental-health-concept-training-exercise-vector-illustration-flat-style-191722654.jpg"
            alt="Register"
            className="w-60 h-60 md:w-80 md:h-80 object-cover rounded-lg"
          />
        </div>

        {/* Right Form Section */}
        <div className="md:w-1/2 p-4">
          <h1 className="text-2xl font-bold text-center mb-6">Welcome to Guest</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Name"
              value={registerData.name}
              onChange={(e) =>
                setRegisterData({ ...registerData, name: e.target.value })
              }
              required
              className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-400 outline-none"
            />

            <input
              type="email"
              placeholder="Email"
              value={registerData.email}
              onChange={(e) =>
                setRegisterData({ ...registerData, email: e.target.value })
              }
              required
              className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-400 outline-none"
            />

            <input
              type="tel"
              placeholder="Phone Number"
              value={registerData.phone}
              onChange={(e) =>
                setRegisterData({ ...registerData, phone: e.target.value })
              }
              required
              className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-400 outline-none"
            />

            <input
              type="text"
              placeholder="Grade/Standard (e.g., B.Tech in CSE)"
              value={registerData.grade}
              onChange={(e) =>
                setRegisterData({ ...registerData, grade: e.target.value })
              }
              required
              className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-400 outline-none"
            />

            <input
              type="password"
              placeholder="Password"
              value={registerData.password}
              onChange={(e) =>
                setRegisterData({ ...registerData, password: e.target.value })
              }
              required
              className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-400 outline-none"
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={registerData.confirmPassword}
              onChange={(e) =>
                setRegisterData({ ...registerData, confirmPassword: e.target.value })
              }
              required
              className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-400 outline-none"
            />

            <div className="text-center">
              <p>
                Already have an account?{" "}
                <a href="/user/login" className="text-blue-500 hover:underline">
                  Sign In
                </a>
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition duration-200"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
