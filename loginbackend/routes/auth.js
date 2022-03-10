const { Router } = require("express");
const router = Router();
const { Register, Login } = require("../controller/auth");
router.route("/register").post(Register);
router.route("/login").post(Login);
module.exports = router;
