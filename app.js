const express = require('express');
const cors = require('cors');
const path = require("path");
const bodyParser = require('body-parser');
const authRoutes = require("./routes/auth");
const profileRoutes = require('./routes/profile'); // Import profile routes

const { sequelize } = require('./models'); // Import your models

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({
  origin: "http://localhost:3000", // React development server address
}));

// Middleware to serve static files (uploads)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes); // Mount profile routes under /profile

// Fetch all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Start the server
app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
  await sequelize.sync({ force: false }); // Sync database
  console.log('Database synced');
});