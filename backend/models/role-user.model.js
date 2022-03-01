const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
   type: {
    type: String,
    required: true,
  }
},{
  timestamps: true,
});

const UserRole = mongoose.model('UserRole', userSchema);

module.exports = UserRole;