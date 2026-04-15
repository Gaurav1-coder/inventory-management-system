const express = require("express");
const { MongoDBconfig } = require('./libs/mongoconfig');
const { Server } = require("socket.io");
const http = require("http");
const cors = require('cors');
const cookieParser = require("cookie-parser");
const authrouter = require('./Routers/authRouther');
const productrouter = require('./Routers/ProductRouter');
const orderrouter = require('./Routers/orderRouter');
const categoryrouter = require("./Routers/categoryRouter");
const notificationrouter = require("./Routers/notificationRouters");
const activityrouter = require("./Routers/activityRouter");
const inventoryrouter = require('./Routers/inventoryRouter');
const salesrouter = require('./Routers/salesRouter');
const supplierrouter = require('./Routers/supplierrouter');
const stocktransactionrouter = require('./Routers/stocktransactionrouter');
const analyticsrouter = require('./Routers/analyticsRouter');

require("dotenv").config();
const PORT = process.env.PORT || 5005;

const app = express();
const server = http.createServer(app);

// CORS configuration: better to allow all origins during development or explicitly list production URLs
const allowedOrigins = [
  "https://inventory-management-system-kf9v-jk9a25oks.vercel.app", // Production frontend
  "http://localhost:3000" // Example for local development
];

// Configure CORS to allow specific origins
app.use(cors({
  origin: (origin, callback) => {
    // If no origin (like mobile or curl requests), allow
    if (!origin) return callback(null, true);
    
    const isAllowed = allowedOrigins.includes(origin) || 
                     (origin.startsWith('https://inventory-management-system') && origin.endsWith('.vercel.app'));

    if (isAllowed) {
      return callback(null, true);
    }
    return callback(new Error('CORS policy does not allow access from this origin'), false);
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true, // This allows cookies to be sent with requests
}));

const io = new Server(server, {
  cors: {
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      const isAllowed = allowedOrigins.includes(origin) || 
                       (origin.startsWith('https://inventory-management-system') && origin.endsWith('.vercel.app'));
      if (isAllowed) {
        return callback(null, true);
      }
      return callback(new Error('CORS policy does not allow access from this origin'), false);
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  },
});

// Socket.IO connection handling
io.on("connection", (socket) => {
  console.log("A user connected");

  // Join a private room for the user (use userId here if it's a real user)
  socket.on("join", (userId) => {
    if (userId) {
      socket.join(userId.toString());
      console.log(`User ${userId} joined their private room`);
    }
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// Middleware for parsing JSON and URL-encoded data
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());
app.set("io", io);

// Health Check Route
app.get("/", (req, res) => {
  res.send("Inventory Management System Backend is running...");
});


app.use('/api/users', authrouter); 
app.use('/api/product', productrouter);
app.use('/api/orders', orderrouter);
app.use('/api/categories', categoryrouter);
app.use('/api/notifications', notificationrouter);
app.use('/api/activity-logs', activityrouter(app)); // Pass app here for activity logs
app.use('/api/inventory', inventoryrouter);
app.use('/api/sales', salesrouter);
app.use('/api/suppliers', supplierrouter);
app.use("/api/stock-transactions", stocktransactionrouter);
app.use("/api/analytics", analyticsrouter);

// Starting the server
server.listen(PORT, () => {
  MongoDBconfig(); // Make sure MongoDB is correctly connected
  console.log(`The server is running at port ${PORT}`);
});

module.exports = { io, server };