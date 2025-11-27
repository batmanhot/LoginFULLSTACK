import React, { useEffect, useState } from "react";
import axios from "axios";

const PERMISSIONS = [
    "manage_users",
    "assign_roles",
    "view_audit_logs",
    "access_dashboard"
];

export default function RolesTable() {
    const [roles, setRoles] = useState([]);
    const [newRole, setNewRole] = useState("");
    const [editingRole, setEditingRole] = useState(null);
    const [selectedPermissions, setSelectedPermissions] = useState([]);

    useEffect(() => {
        axios.get("/api/roles").then(res => setRoles(res.data));
    }, []);

    const addRole = async () => {
        const res = await axios.post("/api/roles", { name: newRole, permissions: [] });
        setRoles([...roles, res.data]);
        setNewRole("");
    };

    const deleteRole = async (id) => {
        await axios.delete(`/api/roles/${id}`);
        setRoles(roles.filter(r => r._id !== id));
    };

    const startEditing = (role) => {
        setEditingRole(role._id);
        setSelectedPermissions(role.permissions || []);
    };

    const togglePermission = (perm) => {
        if (selectedPermissions.includes(perm)) {
            setSelectedPermissions(selectedPermissions.filter(p => p !== perm));
        } else {
            setSelectedPermissions([...selectedPermissions, perm]);
        }
    };

    const savePermissions = async () => {
        const res = await axios.patch(`/api/roles/${editingRole}/permissions`, {
            permissions: selectedPermissions
        });
        setRoles(roles.map(r => r._id === editingRole ? res.data : r));
        setEditingRole(null);
        setSelectedPermissions([]);
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-6">Gestión de Roles</h1>

            {/* Crear nuevo rol */}
            <div className="flex mb-4">
                <input
                    type="text"
                    value={newRole}
                    onChange={e => setNewRole(e.target.value)}
                    placeholder="Nombre del rol"
                    className="border rounded px-3 py-2 mr-2"
                />
                <button
                    onClick={addRole}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Crear Rol
                </button>
            </div>

            {/* Tabla de roles */}
            <table className="w-full border-collapse bg-white shadow rounded">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="p-2 border">Nombre</th>
                        <th className="p-2 border">Permisos</th>
                        <th className="p-2 border">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {roles.map(role => (
                        <tr key={role._id}>
                            <td className="p-2 border">{role.name}</td>
                            <td className="p-2 border">
                                {role.permissions.length > 0 ? role.permissions.join(", ") : "—"}
                            </td>
                            <td className="p-2 border">
                                <button
                                    onClick={() => startEditing(role)}
                                    className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                                >
                                    Editar Permisos
                                </button>
                                <button
                                    onClick={() => deleteRole(role._id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded"
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal de edición de permisos */}
            {editingRole && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded shadow-lg w-96">
                        <h2 className="text-lg font-semibold mb-4">Editar Permisos</h2>
                        <div className="space-y-2">
                            {PERMISSIONS.map(perm => (
                                <label key={perm} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={selectedPermissions.includes(perm)}
                                        onChange={() => togglePermission(perm)}
                                        className="mr-2"
                                    />
                                    {perm}
                                </label>
                            ))}
                        </div>
                        <div className="mt-4 flex justify-end space-x-2">
                            <button
                                onClick={() => setEditingRole(null)}
                                className="bg-gray-400 text-white px-3 py-1 rounded"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={savePermissions}
                                className="bg-green-500 text-white px-3 py-1 rounded"
                            >
                                Guardar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}