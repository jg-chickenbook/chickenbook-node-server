const mongodbConfig = require("./mongodbConfig");
const {
	getAllProfiles,
	getProfileById,
	createProfile,
	updateProfile,
	deleteProfile
} = require("./controllers/profileController");

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

app.use(cors());
app.use(express.json());

const databaseConnectionString = mongodbConfig.mongodbConnectionString;

// Routes
app.get("/", (req, res) => {
	res.send("Hello World");
});

// Profile routes
app.get("/api/profiles", getAllProfiles);
app.get("/api/profiles/:id", getProfileById);
app.post("/api/profile", createProfile);
app.put("/api/profiles/:id", updateProfile);
app.delete("/api/profiles/:id", deleteProfile);

mongoose
	.connect(databaseConnectionString)
	.then(() => {
		console.log("Connected to MongoDB");
		app.listen(3000, () => {
			console.log(
				"Chickenbook Server app is running on http://localhost:3000/",
			);
		});
	})
	.catch((err) => {
		console.log("Error connecting to MongoDB", err);
	});
