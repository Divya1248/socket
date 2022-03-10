const { Schema, model } = require("mongoose");
const { jwt } = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/index");
const AuthSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: [""],
    enum: ["student", "admin", "publisher", "trainer"],
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

AuthSchema.pre("save", async function () {
  let salt = await bcrypt.gensalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  console.log(this);
});

AuthSchema.methods.getJWTtoken = function () {
  return (
    jwt.sign({ id: this._id }),
    JWT_SECRET,
    {
      expiresIn: JWT_EXPIRE,
    }
  );
};

module.exports = model("authentication", AuthSchema);
