const mongodbConfig = require("./mongodbConfig");

const express = require("express");
const mongoose = require("mongoose");
const app = express();

const databaseConnectionString = mongodbConfig.mongodbConnectionString;

// Routes
app.get("/", (req, res) => {
	res.send("Hello World");
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
