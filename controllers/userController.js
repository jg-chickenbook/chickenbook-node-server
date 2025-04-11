const User = require('../models/userModel');

// Get all users
const getAllUsers = async (req, res) => {
  // Get all users from the users collection in members database
  try {
    const allUsers = await User.find({});
    if (!allUsers || allUsers.length === 0) {
      return res.status(200).json({ message: "No users found", data: [] });
    }
    res.status(200).json(allUsers);
  } catch (error) {
    console.log("Error fetching users:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select('-password');

    if (!user) {
      return res.status(404).json({ message: `User with id ${id} not found` });
    }

    res.status(200).json(user);
  } catch (error) {
    console.log('Error fetching user:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// TODO: Implementovat ostatní potřebné metody pro vytvoření uživatele, aktualizaci a smazání uživatele atd.


// Export all functions
module.exports = {
  getAllUsers,
  getUserById,
}