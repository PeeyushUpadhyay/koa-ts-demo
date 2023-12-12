const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/your_database_name');

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  empID: {
    type: String,
    required: true,
    unique: true,
  },
  dob: {
    type: Date,
    default: Date.now()
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true,
  },
  salary: {
    type: Number,
    default:200000
  },
  manager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Manager',
  },
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;