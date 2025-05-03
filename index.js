const express = require('express');
const cors = require("cors");
const path = require("path");
const http = require("http"); // Added for Socket.IO
const { Server } = require("socket.io"); // Socket.IO import

const { connectDB } = require('./DBconnections'); 

const startRoutes = require("./routes/startRoutes");
const authRoutes = require("./routes/authRoutes");
const chatRoutes = require('./routes/chatRoutes');

const app = express();
const server = http.createServer(app); // 👈 Create server from Express
const io = new Server(server);         // 👈 Create Socket.IO server

const PORT = 8000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("view")); 
app.use(express.static(path.join(__dirname, 'public')));

const session = require("express-session");
app.use(session({
    secret: "yourSecretKey",
    resave: false,
    saveUninitialized: true
}));

// View engine
app.set("views", path.join(__dirname, "view"));
app.set("view engine", "ejs");

// MongoDB connection
connectDB('mongodb://localhost:27017/CampusBazzar')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err.message));

// Routes
app.use('/', startRoutes);
app.use('/auth', authRoutes);
// app.use('/chat', chatRoutes);

// Make io accessible in routes (optional)
app.set("io", io);

// Socket.IO logic
io.on("connection", (socket) => {
    console.log("🟢 User connected");

    socket.on("joinRoom", (roomId) => {
        socket.join(roomId);
        console.log(`Joined room: ${roomId}`);
    });

    socket.on("sendMessage", (data) => {
        io.to(data.roomId).emit("receiveMessage", data);
    });

    socket.on("disconnect", () => {
        console.log("🔴 User disconnected");
    });
});

// Start server with HTTP (not app.listen!)
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
