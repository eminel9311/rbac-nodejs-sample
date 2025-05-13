const { Schema, model } = require('mongoose');

const EmployeeSchema = new Schema(
  {
    name: {
      type: String,
      require: true
    },
    email: {
      type: String,
      require: true,
    },
    role: {
      type: String,
      enum: ["se", "marketer", "hr", "admin"]
    },
    password: {
      type: String,
      require: true,
    }
  },
  { timestamps: true }
);

module.exports = model("employee", EmployeeSchema);