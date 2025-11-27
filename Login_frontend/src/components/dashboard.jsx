import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [message, setMessage] = useState('');

  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    axios.get('http://localhost:4000/api/dashboard', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setMessage(res.data.message))
      .catch(err => setMessage('Acceso denegado'));

    // Cargar métricas
    axios.get("/roles/admin/stats").then(res => setStats(res.data));

    // Cargar usuarios
    //axios.get("/roles/admin/users").then(res => setUsers(res.data));

    // Cargar auditoría
    //axios.get("/roles/admin/audit").then(res => setLogs(res.data));

  }, []);

  const toggleStatus = async (id, status) => {
    await axios.patch(`/roles/admin/users/${id}/status`, { status });
    setUsers(users.map(u => u._id === id ? { ...u, status } : u));
  };

  const changeRole = async (id, role) => {
    await axios.patch(`/roles/admin/users/${id}/role`, { role });
    setUsers(users.map(u => u._id === id ? { ...u, roles: [role] } : u));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Panel de Control</h1>

      {/* Métricas */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Usuarios Activos</h2>
          <p className="text-3xl">{stats.activeUsers}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Usuarios Conectados</h2>
          <p className="text-3xl">{stats.onlineUsers}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Roles</h2>
          <p className="text-3xl">{stats.rolesCount}</p>
        </div>
      </div>

      {/* Tabla de usuarios */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-lg font-semibold mb-4">Usuarios</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Usuario</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Rol</th>
              <th className="p-2 border">Estado</th>
              <th className="p-2 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td className="p-2 border">{user.username}</td>
                <td className="p-2 border">{user.email}</td>
                <td className="p-2 border">
                  <select
                    value={user.roles[0]}
                    onChange={e => changeRole(user._id, e.target.value)}
                    className="border rounded px-2 py-1"
                  >
                    <option value="admin">Admin</option>
                    <option value="editor">Editor</option>
                    <option value="viewer">Viewer</option>
                  </select>
                </td>
                <td className="p-2 border">{user.status}</td>
                <td className="p-2 border">
                  <button
                    onClick={() => toggleStatus(user._id, user.status === "active" ? "inactive" : "active")}
                    className={`px-3 py-1 rounded ${user.status === "active" ? "bg-red-500 text-white" : "bg-green-500 text-white"
                      }`}
                  >
                    {user.status === "active" ? "Desactivar" : "Activar"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Auditoría */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Auditoría</h2>
        <ul>
          {logs.map(log => (
            <li key={log._id} className="border-b py-2">
              <strong>{log.action}</strong> - {log.details} ({new Date(log.timestamp).toLocaleString()})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}