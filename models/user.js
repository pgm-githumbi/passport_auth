const mongoose = require("mongoose");
const { namespace } = require("../namespace");

const userSchema = mongoose.Schema({
  uuid: {
    type: "string",
    required: [true, "Kindly set the uuid for this user"],
  },
  username: {
    type: "string",
    required: [true, "Username field required"],
    minlength: 2,
    maxlength: 255,
    validate: {
      validator: (value) => /^[a-zA-Z0-9_]{3,20}$/.test(value),
      message:
        "Username must contain only alphanumeric characters and _ and must be btn 3 and 20 digits long",
    },
  },
  email: {
    type: "email",
    required: [true, "Email field required"],
    minlength: 3,
    maxlength: 255,
    validate: {
      validator: async (value) => {
        namespace.space("validation").log("To validate email: ", value);
        const joiSchema = Joi.email({ minDomainSegments: 2 })
          .required()
          .messages({
            "email.base":
              "Must be a valid email address with atleast 2 domain segments",
            "required.base": "Email address required",
          });

        try {
          await joiSchema.validateAsync(value);
        } catch (err) {
          namespace.space("validation").logErr("Failed to validate email");
          throw err;
        }
        namespace.space("validation").log("email validated");
      },
      message: "Invalid email address",
    },
  },
  password: {
    type: "string",
    required: [true, "Password field required"],
    maxlength: 4096,
  },
});

module.exports = mongoose.model("User", userSchema);
