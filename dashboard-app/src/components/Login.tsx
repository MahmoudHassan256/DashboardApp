import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username === 'admin' && password === 'password') {
      localStorage.setItem('user', JSON.stringify({ username, role: 'admin' }));
      navigate('/dashboard'); // Navigate to dashboard after login
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-xs p-6 border rounded-md shadow-md bg-white">
        <h2 className="text-2xl mb-4 text-center font-bold">Login</h2>
        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 mb-3 border rounded-md"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-3 border rounded-md"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="w-full p-2 bg-blue-500 text-white rounded-md"
        >
          Log In
        </button>
      </div>
    </div>
  );
};

export default Login;
