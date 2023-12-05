const mongoose = require("mongoose");
const { namespace } = require("../namespace");
const Joi = require("joi");

const userSchema = mongoose.Schema(
  {
    uuid: {
      type: "string",
      unique: true,
      required: [true, "Kindly set the uuid for this user"],
    },
    username: {
      type: "string",
      required: [true, "Username field required"],
      unique: true,
      minlength: 2,
      maxlength: 255,
      validate: {
        validator: (value) => /^[a-zA-Z0-9_]{1,20}$/.test(value),
        message:
          "Username must contain only alphanumeric characters and _ and must be btn 3 and 20 digits long",
      },
    },
    email: {
      type: "string",
      required: [true, "Email field required"],
      unique: true,
      minlength: 1,
      maxlength: 255,
      validate: {
        validator: async (value) => {
          const log = namespace.space("validation").getLogger();
          const logErr = namespace.space("validation").getErrLogger();
          log("To validate email: ", value);
          const joiSchema = Joi.string().email().required().messages({
            "email.base":
              "Must be a valid email address with atleast 2 domain segments",
            "required.base": "Email address required",
          });

          try {
            await joiSchema.validateAsync(value);
          } catch (err) {
            logErr("Failed to validate email");
            throw err;
          }
          log("email validated");
        },
        message: "Invalid email address",
      },
    },
    password: {
      type: "string",
      required: [true, "Password field required"],
      maxlength: 4096,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
