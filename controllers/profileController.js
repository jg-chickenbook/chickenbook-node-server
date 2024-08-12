const Profile = require("../models/profileModel");

const getAllProfiles = async (req, res) => {
	try {
		const allProfiles = await Profile.find({});
		res.status(200).json(allProfiles);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message });
	}
};

const getProfileById = async (req, res) => {
	try {
		const { id } = req.params;
		const profile = await Profile.findById(id);
		res.status(200).json(profile);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message });
	}
};

const createProfile = async (req, res) => {
	try {
		const profile = await Profile.create(req.body);
		res.status(200).json(profile);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message });
	}
};

const updateProfile = async (req, res) => {
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
};

const deleteProfile = async (req, res) => {
	try {
		const { id } = req.params;
		const profile = await Profile.findByIdAndDelete(id);
		if (!profile) {
			res.status(404).json({ message: `Profile with id ${id} not found` });
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

module.exports = {
	getAllProfiles,
	getProfileById,
	createProfile,
	updateProfile,
	deleteProfile,
};
