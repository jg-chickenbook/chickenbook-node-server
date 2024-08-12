const mongoose = require("mongoose");

const profileSchema = mongoose.Schema(
	{
		name: {
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
		status: {
			type: String,
			required: false,
		},
		skills: {
			type: Array,
			required: false,
		},
		projects: {
			type: [{
				name: String,
				link: String,
			}],
			required: false,
		},
		phone: {
			type: String,
			required: false,
		},
		email: {
			type: String,
			required: false,
		},
		about: {
			type: String,
			required: false,
		},
	},
	{ timestamps: true },
);

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
