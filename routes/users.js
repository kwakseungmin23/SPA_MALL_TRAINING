const express = require("express");
const router = express.Router();
const userSchema = require("../schemas/user");
//sign up
router.post("/users", async (req, res) => {
  const { email, nickname, password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    res.status(400).json({ err: "Password does not match." });
    return;
  } //password confirm logic

  //email, nickname DB validation
  const isExistUser = await userSchema.findOne({
    $or: [{ email }, { nickname }], // email or nickname is true -> true
  });
  if (isExistUser) {
    if (isExistUser.email === email) {
      return res.status(400).send({ err: "password does not exist" });
    } else if (isExistUser.nickname === nickname) {
      return res.status(400).send({ err: "email does not exist" });
    }
  } else if (!isExistUser) {
    const user = new userSchema({ email, nickname, password });
    await user.save(); //DB SAVE
    return res.status(201).json({}); // 201 -> something created
  }
});

module.exports = router;
