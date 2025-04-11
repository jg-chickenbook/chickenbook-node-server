const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    default: uuidv4,
    unique: true,
    required: true
  },
  userName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Prosím zadejte platný e-mail']
  },
  password: {
    type: String,
    required: true
  },
  authToken: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

// Virtuální pole pro celé jméno
userSchema.virtual('fullName').get(function() {
  return `${this.userName}`;
});


// Před uložením možnost provést další operace
userSchema.pre('save', function(next) {
  // Zde můžete přidat logiku před uložením, např. hashování hesla
  next();
});

// Statická metoda pro vyhledání uživatele podle e-mailu
userSchema.statics.findByEmail = function(email) {
  return this.findOne({ email });
};

// Vytvoření modelu
const User = mongoose.model('User', userSchema);

module.exports = User;