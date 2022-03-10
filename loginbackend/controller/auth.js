const AuthSchema = require("../model/Auth");
exports.Register = async (req, res) => {
  try {
    let { username, password, email, role } = req.body;
    let payload = { username, password, email, role };
    let data = await AuthSchema.create(payload);
    sendTokenResponse(user, 201, res);
    // if (data) res.status(200).json({ message: "successfully created", data });
  } catch (err) {
    console.log("server error");
  }
};

exports.Login = async (req, res) => {
  try {
    let { email, password, role } = req.body;
    let data = await AuthSchema.findOne({ email }).select("+password");
    // if (data.role === "admin" || data.role === "student") {
    //   res.send(data.role);
    // }
    // sendTokenResponse(user, 201, res);
    res.status(200).json({ message: "successfully fetched", data });
  } catch (err) {
    console.log("error fetching");
  }
};

function sendTokenResponse(user, statusCode, res) {
  let TOKEN = user.getJWTtoken();
  const options = {
    expires: new Date(Date.now() + JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };
  res
    .status(statusCode)
    .cookie("TOKEN", TOKEN, options)
    .json({ message: "successfully stored", TOKEN });
}
