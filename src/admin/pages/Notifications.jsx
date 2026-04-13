import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ title: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get("/api/notifications");
      setNotifications(data);
    } catch (error) {
      toast.error("Error fetching notifications");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/notifications", formData);
      toast.success("Notification sent successfully");
      setIsModalOpen(false);
      setFormData({ title: "", message: "" });
      fetchNotifications();
    } catch (error) {
      toast.error("Error sending notification");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await axios.delete(`/api/notifications/${id}`);
        toast.success("Notification deleted");
        fetchNotifications();
      } catch (error) {
        toast.error("Error deleting notification");
      }
    }
  };

  return (
    <div className="notifications-page">
      <div className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="left">
          <h1>Notifications</h1>
        </div>
        <button className="report" onClick={() => setIsModalOpen(true)}>
          <i className="bx bx-bell"></i>
          <span>Create Notification</span>
        </button>
      </div>

      <div className="bottom-data">
        <div className="orders">
          <div className="header">
            <i className="bx bx-list-ul"></i>
            <h3>Recent Notifications</h3>
          </div>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Message</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan="4">Loading...</td></tr>
              ) : Array.isArray(notifications) && notifications.length > 0 ? (
                notifications.map((n) => (
                  <tr key={n._id}>
                    <td>{n.title}</td>
                    <td>{n.message}</td>
                    <td>{new Date(n.date).toLocaleDateString()}</td>
                    <td>
                      <button onClick={() => handleDelete(n._id)} style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}>
                        <i className="bx bx-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="4">No notifications found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div className="modal-content" style={{ background: 'var(--light)', padding: '30px', borderRadius: '10px', width: '400px', color: 'var(--dark)' }}>
            <h2>Create New Notification</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group" style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Title</label>
                <input type="text" name="title" value={formData.title} onChange={handleInputChange} required className="form-input" style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }} />
              </div>
              <div className="form-group" style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Message</label>
                <textarea name="message" value={formData.message} onChange={handleInputChange} required className="form-input" style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}></textarea>
              </div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <button type="submit" className="report" style={{ flex: 1, padding: '12px' }}>Send Notification</button>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{ flex: 1, background: '#eee', color: '#333', border: 'none', padding: '12px', borderRadius: '36px', cursor: 'pointer' }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;
