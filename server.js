const mongodbConfig = require("./mongodbConfig");

const express = require("express");
const mongoose = require("mongoose");
const Profile = require("./models/profileModel");
const app = express();

app.use(express.json());

const databaseConnectionString = mongodbConfig.mongodbConnectionString;

// Routes
app.get("/", (req, res) => {
	res.send("Hello World");
});

app.get("/profiles", async (req, res) => {
	try {
		const allProfiles = await Profile.find({});
		res.status(200).json(allProfiles);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message });
	}
});

app.get("/profiles/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const profile = await Profile.findById(id);
		res.status(200).json(profile);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message });
	}
});

app.post("/profile", async (req, res) => {
	try {
		const profile = await Profile.create(req.body);
		res.status(200).json(profile);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message });
	}
});

app.put("/profiles/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const profile = await Profile.findByIdAndUpdate(id, req.body);
		if (!profile) {
			res.status(404).json({ message: "Profile not found" });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message });
	}
});

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
