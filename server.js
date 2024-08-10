const mongodbConfig = require("./mongodbConfig");
const {
	getAllProfiles,
	getProfileById,
	createProfile,
	updateProfile,
} = require("./controllers/profileController");

const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

const databaseConnectionString = mongodbConfig.mongodbConnectionString;

// Routes
app.get("/", (req, res) => {
	res.send("Hello World");
});

// Profile routes
app.get("/profiles", getAllProfiles);
app.get("/profiles/:id", getProfileById);
app.post("/profile", createProfile);
app.put("/profiles/:id", updateProfile);

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
