// FRONTEND AUTO: reviewed on 2026-04-14\r\nimport React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get("/api/users/all");
      if (Array.isArray(data)) {
        setUsers(data);
      } else {
        console.error("Users data is not an array:", data);
        setUsers([]);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error(error.response?.data?.message || error.message || "Error fetching users");
      setUsers([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`/api/users/${id}`);
        toast.success("User deleted");
        fetchUsers();
      } catch (error) {
        toast.error(error.response?.data?.message || error.message || "Error deleting user");
      }
    }
  };

  return (
    <div className="users-page">
      <div className="header" style={{ marginBottom: '20px' }}>
        <div className="left">
          <h1>User Management</h1>
        </div>
      </div>

      <div className="bottom-data">
        <div className="orders">
          <div className="header">
            <i className="bx bx-group"></i>
            <h3>All Users</h3>
          </div>
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Bio</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>Loading users...</td>
                </tr>
              ) : Array.isArray(users) && users.length > 0 ? (
                users.map((u) => (
                  <tr key={u?._id || Math.random()}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <img 
                          src={u?.photo || "https://robohash.org/default.png"} 
                          alt={u?.name || "User"} 
                          style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                          onError={(e) => { e.target.src = "https://robohash.org/default.png" }}
                        />
                        <p>{u?.name || "Unnamed User"}</p>
                      </div>
                    </td>
                    <td>{u?.email || "N/A"}</td>
                    <td>{u?.phone || "N/A"}</td>
                    <td>{u?.bio || "N/A"}</td>
                    <td>
                      <button onClick={() => handleDelete(u?._id)} style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer', fontSize: '18px' }}>
                        <i className="bx bx-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>No users found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;

