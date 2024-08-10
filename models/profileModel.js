const mongoose = require("mongoose");

const profileSchema = mongoose.Schema(
	{
		fullName: {
			type: String,
			required: [true, "Fullname is required"],
		},
		headline: {
			type: String,
			required: true,
			default: "Developer",
		},
		profilePic: {
			type: String,
			required: false,
		},
	},
	{ timestamps: true },
);

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
