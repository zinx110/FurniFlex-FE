// pages/roles.tsx
"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Role } from "../../../types/Role";

const RolesPage: React.FC = () => {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/Roles`;
    const [roles, setRoles] = useState<Role[]>([]);
    const [newRoleName, setNewRoleName] = useState("");
    const [editingRoleId, setEditingRoleId] = useState<number | null>(null);
    const [editingRoleName, setEditingRoleName] = useState("");

    // Fetch all roles on component mount
    useEffect(() => {
        fetchRoles();
    }, []);

    const fetchRoles = async () => {
        try {
            const response = await axios.get<Role[]>(url);
            setRoles(response.data);
        } catch (error) {
            console.error("Error fetching roles:", error);
        }
    };

    const handleAddRole = async () => {
        if (newRoleName === "") return;

        try {
            await axios.post(url, { Name: newRoleName });
            setNewRoleName("");
            fetchRoles(); // Re-fetch roles after adding a new one
        } catch (error) {
            console.error("Error adding role:", error);
        }
    };

    const handleEditRole = (role: Role) => {
        setEditingRoleId(role.RoleId);
        setEditingRoleName(role.Name);
    };

    const handleSaveEditRole = async () => {
        if (editingRoleId === null || editingRoleName === "") return;

        try {
            await axios.put(`${url}/${editingRoleId}`, {
                Name: editingRoleName,
                RoleId: editingRoleId,
            });
            setEditingRoleId(null);
            setEditingRoleName("");
            fetchRoles(); // Re-fetch roles after editing
        } catch (error) {
            console.error("Error updating role:", error);
        }
    };

    return (
        <div className="container mx-auto py-4">
            <h1 className="text-2xl font-bold mb-4">Roles Management</h1>

            {/* Add new role */}
            <div className="mb-6">
                <h2 className="text-xl mb-2">Add New Role</h2>
                <input
                    type="text"
                    value={newRoleName}
                    onChange={(e) => setNewRoleName(e.target.value)}
                    placeholder="New role name"
                    className="border p-2 mr-2"
                />
                <button
                    onClick={handleAddRole}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Add Role
                </button>
            </div>

            {/* Display all roles */}
            <div>
                <h2 className="text-xl mb-2">Roles List</h2>
                <table className="w-full border-collapse border">
                    <thead>
                        <tr>
                            <th className="border p-2">Role ID</th>
                            <th className="border p-2">Role Name</th>
                            <th className="border p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {roles.map((role) => (
                            <tr key={role.RoleId}>
                                <td className="border p-2">{role.RoleId}</td>
                                <td className="border p-2">
                                    {editingRoleId === role.RoleId ? (
                                        <input
                                            type="text"
                                            value={editingRoleName}
                                            onChange={(e) =>
                                                setEditingRoleName(
                                                    e.target.value
                                                )
                                            }
                                            className="border p-2"
                                        />
                                    ) : (
                                        role.Name
                                    )}
                                </td>
                                <td className="border p-2">
                                    {editingRoleId === role.RoleId ? (
                                        <button
                                            onClick={handleSaveEditRole}
                                            className="bg-green-500 text-white px-4 py-2 rounded"
                                        >
                                            Save
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handleEditRole(role)}
                                            className="bg-yellow-500 text-white px-4 py-2 rounded"
                                        >
                                            Edit
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RolesPage;
