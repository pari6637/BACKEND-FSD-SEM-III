import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [requests, setRequests] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "",
    description: "",
    priority: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(false);

  const categories = [
    "Electronics",
    "Infrastructure",
    "Cleanliness",
    "Academic",
    "Transport",
    "Mess",
    "Other",
  ];

  // ===============================
  // GET ALL REQUESTS
  // ===============================
  const fetchRequests = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/requests");
      const data = await response.json();
      setRequests(data);
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // ===============================
  // HANDLE INPUT
  // ===============================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // ===============================
  // SUBMIT / UPDATE REQUEST
  // ===============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.category ||
      !formData.description ||
      !formData.priority
    ) {
      alert("Please fill all the fields.");
      return;
    }

    setLoading(true);

    try {
      let response;

      if (editingId) {
        response = await fetch(
          `http://localhost:5000/api/requests/${editingId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
      } else {
        response = await fetch("http://localhost:5000/api/requests", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
      }

      if (!response.ok) {
        throw new Error("Request failed");
      }

      await response.json();

      alert(editingId ? "Request updated successfully!" : "Request submitted!");

      resetForm();
      fetchRequests();
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong.");
    }

    setLoading(false);
  };

  // ===============================
  // EDIT REQUEST
  // ===============================
  const handleEdit = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/requests/${id}`
      );

      const data = await response.json();

      setFormData({
        name: data.name,
        email: data.email,
        category: data.category,
        description: data.description,
        priority: data.priority,
      });

      setEditingId(id);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // ===============================
  // DELETE REQUEST
  // ===============================
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this request?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/requests/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Delete failed");
      }

      fetchRequests();
    } catch (error) {
      console.error("Error deleting request:", error);
      alert("Unable to delete request.");
    }
  };

  // ===============================
  // RESET FORM
  // ===============================
  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      category: "",
      description: "",
      priority: "",
    });

    setEditingId(null);
  };

  // ===============================
  // FILTER REQUESTS
  // ===============================
  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      request.name.toLowerCase().includes(search.toLowerCase()) ||
      request.email.toLowerCase().includes(search.toLowerCase()) ||
      request.category.toLowerCase().includes(search.toLowerCase()) ||
      request.description.toLowerCase().includes(search.toLowerCase()) ||
      request.id.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      activeCategory === "All" ||
      request.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  // ===============================
  // STATISTICS
  // ===============================
  const totalRequests = requests.length;

  const highPriority = requests.filter(
    (request) => request.priority === "High"
  ).length;

  const resolvedRequests = requests.filter(
    (request) => request.status === "Resolved"
  ).length;

  return (
    <div className="app">

      {/* ================= SIDEBAR ================= */}
      <aside className="sidebar">

        <div className="brand">
          <div className="brand-icon">🎓</div>

          <div>
            <h2>Campus</h2>
            <h2 className="brand-highlight">Help Desk</h2>
          </div>
        </div>

        <div className="tagline">
          Report • Track • Get It Solved
        </div>

        <nav className="sidebar-nav">

          <div className="nav-item active">
            <span>🏠</span>
            Home
          </div>

          <div className="nav-item">
            <span>📋</span>
            My Requests
          </div>

          <div className="nav-item">
            <span>💬</span>
            Contact Us
          </div>

        </nav>

        <div className="sidebar-message">
          <span>“</span>
          Small Issues.
          <br />
          Big Solutions.
          <span>”</span>
        </div>

        <div className="sidebar-bottom">
          🌱 Better Campus
          <br />
          <strong>Together.</strong>
        </div>

      </aside>

      {/* ================= MAIN ================= */}
      <main className="main">

        {/* ================= HERO ================= */}
        <section className="hero">

          <div className="hero-content">

            <p className="hero-small">
              YOUR CAMPUS • YOUR VOICE
            </p>

            <h1>
              Campus
              <br />
              <span>Help Desk</span>
            </h1>

            <p>
              Report problems. Track requests.
              <br />
              Make your campus better.
            </p>

          </div>

          <div className="hero-illustration">
            🏫
          </div>

        </section>

        {/* ================= STATS ================= */}
        <section className="stats">

          <div className="stat-card">
            <div className="stat-icon purple">📋</div>
            <div>
              <p>Total Requests</p>
              <h2>{totalRequests}</h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon red">🚨</div>
            <div>
              <p>High Priority</p>
              <h2>{highPriority}</h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon green">✓</div>
            <div>
              <p>Resolved</p>
              <h2>{resolvedRequests}</h2>
            </div>
          </div>

        </section>

        {/* ================= FORM ================= */}
        <section className="form-card">

          <div className="section-heading">

            <div className="heading-icon">
              📣
            </div>

            <div>
              <h2>
                {editingId
                  ? "Update Your Request"
                  : "Submit a New Request"}
              </h2>

              <p>
                Facing an issue? Let us know — we'll help
                you get it resolved.
              </p>
            </div>

          </div>

          <form onSubmit={handleSubmit}>

            <div className="form-grid">

              {/* NAME */}
              <div className="input-group">
                <label>Student Name</label>

                <div className="input-wrapper">
                  <span>👤</span>

                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* EMAIL */}
              <div className="input-group">
                <label>Email</label>

                <div className="input-wrapper">
                  <span>✉️</span>

                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* CATEGORY */}
              <div className="input-group">
                <label>Category</label>

                <div className="input-wrapper">
                  <span>▦</span>

                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    <option value="">
                      Select a category
                    </option>

                    {categories.map((category) => (
                      <option
                        key={category}
                        value={category}
                      >
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* PRIORITY */}
              <div className="input-group">
                <label>Priority</label>

                <div className="input-wrapper">
                  <span>🚩</span>

                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                  >
                    <option value="">
                      Select priority
                    </option>

                    <option value="Low">
                      Low
                    </option>

                    <option value="Medium">
                      Medium
                    </option>

                    <option value="High">
                      High
                    </option>
                  </select>
                </div>
              </div>

            </div>

            {/* DESCRIPTION */}
            <div className="input-group description-group">

              <label>Problem Description</label>

              <div className="textarea-wrapper">
                <span>📄</span>

                <textarea
                  name="description"
                  placeholder="Describe your issue in detail..."
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>

            </div>

            <div className="form-buttons">

              <button
                type="submit"
                className="submit-button"
                disabled={loading}
              >
                {loading
                  ? "Please wait..."
                  : editingId
                  ? "✓ Update Request"
                  : "➤ Submit Request"}
              </button>

              {editingId && (
                <button
                  type="button"
                  className="cancel-button"
                  onClick={resetForm}
                >
                  Cancel
                </button>
              )}

            </div>

          </form>

        </section>

        {/* ================= REQUESTS ================= */}
        <section className="requests-section">

          <div className="requests-header">

            <div>

              <div className="requests-title">
                <span>📋</span>

                <div>
                  <h2>All Requests</h2>
                  <p>
                    View and manage all submitted requests.
                  </p>
                </div>
              </div>

            </div>

            <div className="search-box">
              🔍

              <input
                type="text"
                placeholder="Search by name, category or ID..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />
            </div>

          </div>

          {/* CATEGORY FILTERS */}

          <div className="filters">

            <button
              className={
                activeCategory === "All"
                  ? "filter active"
                  : "filter"
              }
              onClick={() => setActiveCategory("All")}
            >
              All
            </button>

            {categories.map((category) => (
              <button
                key={category}
                className={
                  activeCategory === category
                    ? "filter active"
                    : "filter"
                }
                onClick={() =>
                  setActiveCategory(category)
                }
              >
                {category}
              </button>
            ))}

          </div>

          {/* REQUEST CARDS */}

          <div className="request-list">

            {filteredRequests.length === 0 ? (

              <div className="empty-state">

                <div>📭</div>

                <h3>No requests found</h3>

                <p>
                  Submit a request or change your
                  search/filter.
                </p>

              </div>

            ) : (

              filteredRequests.map((request) => (

                <div
                  className="request-card"
                  key={request.id}
                >

                  <div
                    className={`request-icon ${request.category
                      .toLowerCase()
                      .replace(/\s/g, "-")}`}
                  >
                    {request.category === "Electronics"
                      ? "💻"
                      : request.category === "Infrastructure"
                      ? "🏢"
                      : request.category === "Cleanliness"
                      ? "🧹"
                      : request.category === "Academic"
                      ? "📚"
                      : request.category === "Transport"
                      ? "🚌"
                      : request.category === "Mess"
                      ? "🍽️"
                      : "📌"}
                  </div>

                  <div className="request-info">

                    <div className="request-title-row">

                      <h3>
                        {request.description.length > 40
                          ? request.description.substring(
                              0,
                              40
                            ) + "..."
                          : request.description}
                      </h3>

                      <span
                        className={`priority ${request.priority.toLowerCase()}`}
                      >
                        {request.priority}
                      </span>

                    </div>

                    <p className="request-id">
                      ID: #{request.id}
                    </p>

                    <p className="student-info">
                      Student: <strong>{request.name}</strong>
                      {" • "}
                      {request.email}
                    </p>

                    <span className="category-badge">
                      {request.category}
                    </span>

                    <p className="date">
                      📅 {request.date}
                    </p>

                  </div>

                  <div className="request-description">

                    <p>
                      {request.description}
                    </p>

                  </div>

                  <div className="request-actions">

                    <span
                      className={`status ${request.status
                        .toLowerCase()
                        .replace(/\s/g, "-")}`}
                    >
                      {request.status}
                    </span>

                    <div className="action-buttons">

                      <button
                        className="edit-btn"
                        onClick={() =>
                          handleEdit(request.id)
                        }
                        title="Edit"
                      >
                        ✏️
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() =>
                          handleDelete(request.id)
                        }
                        title="Delete"
                      >
                        🗑️
                      </button>

                    </div>

                  </div>

                </div>

              ))

            )}

          </div>

        </section>

        {/* FOOTER */}

        <footer>
          <p>
            🎓 Campus Help Desk • Making campus life
            better, one request at a time.
          </p>
        </footer>

      </main>

    </div>
  );
}

export default App;