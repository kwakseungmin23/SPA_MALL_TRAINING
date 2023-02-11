const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    // email 중복 경우에는? -> unique 값 넣어야 한다.
    type: String,
    required: true,
    unique: true, // 동일한 정보 존재 불가.
  },
  nickname: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.virtual("userId").get(function () {
  return this._id.toHexString();
});
userSchema.set("toJSON", {
  virtuals: true, // json 형태로 가공할때, userId를 가상 출력 시킨다.
});

module.exports = mongoose.model("User", userSchema);
