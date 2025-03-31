import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [name, setName] = useState('');
  const [registerData, setRegisterData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerData),
        credentials: 'include'
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Login successful:', data);
        await navigate('/course');
        const responseLoad = await fetch(`${import.meta.env.VITE_BASE_URL}/recommendation/xyz123`);
        const trendingLoad = await fetch(`${import.meta.env.VITE_BASE_URL}/trending/xyz123`);
        window.location.reload()
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl w-full flex">
        <div className="w-1/2 flex justify-center items-center p-4">
          <img src="https://thumbs.dreamstime.com/b/cute-pink-brain-character-dumbbell-mental-health-concept-training-exercise-vector-illustration-flat-style-191722654.jpg" alt="Login" className="w-60 h-60 md:w-80 md:h-80 object-cover rounded-lg" />
        </div>
        <div className="w-1/2 p-4">
          <h1 className="text-2xl font-bold text-center mb-6">Welcome Back</h1>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                className="w-full p-2 border rounded"
                value={registerData.email}
                onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                className="w-full p-2 border rounded"
                value={registerData.password}
                onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                required
              />
            </div>
            <p className="text-center text-gray-700">Don't have an account? <a href="/user/register" className="text-blue-500">Register</a></p>
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition">Log In</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
