const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

const PORT = 5000;
const FILE = "./requests.json";

// ========================================
// MIDDLEWARE
// ========================================

app.use(cors());
app.use(express.json());

// ========================================
// HELPER FUNCTIONS
// ========================================

function readRequests() {
  try {
    const data = fs.readFileSync(FILE, "utf8");

    if (!data.trim()) {
      return [];
    }

    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

function saveRequests(requests) {
  fs.writeFileSync(
    FILE,
    JSON.stringify(requests, null, 2)
  );
}

// ========================================
// HOME ROUTE
// ========================================

app.get("/", (req, res) => {
  res.send("Campus Help Desk API is running!");
});

// ========================================
// GET ALL REQUESTS
// GET /api/requests
// ========================================

app.get("/api/requests", (req, res) => {
  const requests = readRequests();

  res.json(requests);
});

// ========================================
// GET ONE REQUEST
// GET /api/requests/:id
// ========================================

app.get("/api/requests/:id", (req, res) => {
  const requests = readRequests();

  const request = requests.find(
    (item) => item.id === req.params.id
  );

  if (!request) {
    return res.status(404).json({
      message: "Request not found",
    });
  }

  res.json(request);
});

// ========================================
// CREATE REQUEST
// POST /api/requests
// ========================================

app.post("/api/requests", (req, res) => {
  const requests = readRequests();

  const {
    name,
    email,
    category,
    description,
    priority,
  } = req.body;

  if (
    !name ||
    !email ||
    !category ||
    !description ||
    !priority
  ) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  const newRequest = {
    id: "REQ" + Date.now().toString().slice(-6),
    name,
    email,
    category,
    description,
    priority,
    status: "Open",
    date: new Date().toLocaleString("en-IN"),
  };

  requests.push(newRequest);

  saveRequests(requests);

  res.status(201).json(newRequest);
});

// ========================================
// UPDATE REQUEST
// PUT /api/requests/:id
// ========================================

app.put("/api/requests/:id", (req, res) => {
  const requests = readRequests();

  const index = requests.findIndex(
    (item) => item.id === req.params.id
  );

  if (index === -1) {
    return res.status(404).json({
      message: "Request not found",
    });
  }

  const oldRequest = requests[index];

  requests[index] = {
    ...oldRequest,
    name: req.body.name,
    email: req.body.email,
    category: req.body.category,
    description: req.body.description,
    priority: req.body.priority,
  };

  saveRequests(requests);

  res.json(requests[index]);
});

// ========================================
// DELETE REQUEST
// DELETE /api/requests/:id
// ========================================

app.delete("/api/requests/:id", (req, res) => {
  const requests = readRequests();

  const filteredRequests = requests.filter(
    (item) => item.id !== req.params.id
  );

  if (filteredRequests.length === requests.length) {
    return res.status(404).json({
      message: "Request not found",
    });
  }

  saveRequests(filteredRequests);

  res.json({
    message: "Request deleted successfully",
  });
});

// ========================================
// START SERVER
// ========================================

app.listen(PORT, () => {
  console.log(
    `Campus Help Desk server running at http://localhost:${PORT}`
  );
});