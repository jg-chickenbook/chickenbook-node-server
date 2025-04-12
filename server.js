// Načít dotenv bezpodmínečně na začátku souboru
require('dotenv').config();

// Nyní můžete používat proměnné prostředí
const urlAPI = process.env.MONGODB_URL;

// Logování prostředí pro debugging
console.log('Environment:', process.env.NODE_ENV || 'Not set');

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

const {
	getAllProfiles,
	getProfileById,
	createProfile,
	updateProfile,
	deleteProfile
} = require("./controllers/profileController");

const { getAllUsers, getUserById  } = require("./controllers/userController");

// Middlewares
app.use(cors());
app.use(express.json());

// Ověření konfigurace MongoDB
const mongodbUrl = process.env.MONGODB_URL;
if (!mongodbUrl) {
    console.error('MONGODB_URL není nastaveno! Aplikace nemůže pokračovat.');
    process.exit(1); // Ukončit aplikaci, pokud chybí kritická konfigurace
}

// Routes
app.get("/", async (req, res) => {
  try {
    // Get all collections in the 'members' database
    const membersDb = mongoose.connection.client.db('members');
    const collections = await membersDb.listCollections().toArray();
    const collectionNames = collections.map(collection => collection.name);
    console.log('Collections in members database:', collectionNames);

    // Get data from each collection
    const collectionsData = {};
    for (const collectionName of collectionNames) {
      const collection = membersDb.collection(collectionName);
      collectionsData[collectionName] = await collection.find({}).toArray();
    }

    res.json({
      success: true,
      Data: collectionsData
    });
  } catch (error) {
    console.error('Error fetching collections:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch collections', message: error.message });
  }
});

// Profile routes
app.get("/api/profiles", getAllProfiles);
app.get("/api/profiles/:id", getProfileById);
app.post("/api/profile", createProfile);
app.put("/api/profiles/:id", updateProfile);
app.delete("/api/profiles/:id", deleteProfile);

// Users routes
app.get("/api/users", getAllUsers);
app.get("/api/users/:id", getUserById);


mongoose
	.connect(mongodbUrl)
	.then(() => {
		console.log("Connected to MongoDB");
    const PORT = process.env.PORT || 3000;
		app.listen(PORT, () => {
      console.log(
          `Chickenbook Server app is running on http://localhost:${PORT}/`,
      );
  });
})
	.catch((err) => {
		console.log("Error connecting to MongoDB", err);
	});
