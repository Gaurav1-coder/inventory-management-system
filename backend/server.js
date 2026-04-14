const express = require("express");
const { MongoDBconfig } = require('./libs/mongoconfig');
const { Server } = require("socket.io");
const http = require("http");
const cors = require('cors');
const cookieParser = require("cookie-parser");
const authrouter = require('./Routers/authRouther');
const productrouter = require('./Routers/ProductRouter');
const orderrouter = require('./Routers/orderRouter');
const categoryrouter = require("./Routers/categoryRouter")
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

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "http://127.0.0.1:3000",
  "http://127.0.0.1:5173"
];

app.use(cors({
  origin: true, // For development, allow all origins.
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true,
}));

const io = new Server(server, {
  cors: {
    origin: true, // For development, allow all origins.
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  },
});



io.on("connection", (socket) => {
  console.log("A user connected");

  // Join a private room for the user
  socket.on("join", (userId) => {
    if (userId) {
      socket.join(userId.toString());
      console.log(`User ${userId} joined their private room`);
    }
  });
 
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
})




app.use(express.json({limit: "10mb"}));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.set("io", io);
app.use(cookieParser());

// Aligning backend routes with frontend expectations
app.use('/api/users', authrouter); // Frontend uses /api/users
app.use('/api/product', productrouter);
app.use('/api/orders', orderrouter); // Frontend uses /api/orders
app.use('/api/categories', categoryrouter); // Frontend uses /api/categories
app.use('/api/notifications', notificationrouter); // Frontend uses /api/notifications
app.use('/api/activity-logs', activityrouter(app)); // Frontend uses /api/activity-logs
app.use('/api/inventory', inventoryrouter);
app.use('/api/sales', salesrouter);
app.use('/api/suppliers', supplierrouter); // Frontend uses /api/suppliers
app.use("/api/stock-transactions", stocktransactionrouter); // Frontend uses /api/stock-transactions
app.use("/api/analytics", analyticsrouter); // Dashboard analytics route




server.listen(PORT, () => {
  MongoDBconfig();
  console.log(`The server is running at port ${PORT}`);
});



module.exports = { io, server};