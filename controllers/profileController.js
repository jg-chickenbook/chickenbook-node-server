const Profile = require("../models/profileModel");

const getAllProfiles = async (req, res) => {
  try {
    // Get all profiles from the profiles collection in members database
    const allProfiles = await Profile.find({});
    if (!allProfiles || allProfiles.length === 0) {
      return res.status(200).json({ message: "No profiles found", data: [] });
    }
    res.status(200).json(allProfiles);
  } catch (error) {
    console.log("Error fetching profiles:", error);
    res.status(500).json({ message: error.message });
  }
};

const getProfileById = async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await Profile.findById(id);

    if (!profile) {
      return res.status(404).json({ message: `Profile with id ${id} not found` });
    }

    res.status(200).json(profile);
  } catch (error) {
    console.log("Error fetching profile:", error);
    res.status(500).json({ message: error.message });
  }
};

const createProfile = async (req, res) => {
  try {
    const profile = await Profile.create(req.body);
    res.status(201).json(profile);
  } catch (error) {
    console.log("Error creating profile:", error);
    res.status(500).json({ message: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await Profile.findByIdAndUpdate(id, req.body, { new: true });

    if (!profile) {
      return res.status(404).json({ message: `Profile with id ${id} not found` });
    }

    res.status(200).json(profile);
  } catch (error) {
    console.log("Error updating profile:", error);
    res.status(500).json({ message: error.message });
  }
};

const deleteProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await Profile.findByIdAndDelete(id);

    if (!profile) {
      return res.status(404).json({ message: `Profile with id ${id} not found` });
    }

    res.status(200).json({ message: `Profile with id ${id} deleted successfully` });
  } catch (error) {
    console.log("Error deleting profile:", error);
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
