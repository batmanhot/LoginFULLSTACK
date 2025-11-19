import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:4000/api/dashboard', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setMessage(res.data.message))
    .catch(err => setMessage('Acceso denegado'));
  }, []);

  return (
    <div className="text-white bg-gray-900 min-h-screen flex items-center justify-center">
      <h1 className="text-2xl">{message}</h1>
    </div>
  );
}