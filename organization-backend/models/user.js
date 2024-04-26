const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^([A-Z]{1,})+([ A-Za-z0-9_@./#&+-]*$)/.test(v);
      },
      message: (props) => `Please enter a valid password`,
    },
    minLength: [8, "Password must contains atleast 8 characters"],
  },
  role: {
    type: String,
    default: "user",
    enum: {
      values: ["admin", "user"],
      message: "Role must be admin or user",
    },
  },
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization",
  },
});

module.exports = mongoose.model("User", userSchema);
