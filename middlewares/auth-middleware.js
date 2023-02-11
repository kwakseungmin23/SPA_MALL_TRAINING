const jwt = require("jsonwebtoken");
const User = require("../schemas/user");

module.exports = async (req, res, next) => {
  const { Authorization } = req.cookies;
  // bearer asdasd.asdsad.sad
  // undefined.split -> error
  // authoriziton cookie 가 존재하지 않았을 때를 대비
  // 왼쪽 값이 null 일때 오른쪽 값(빈문자열)로 대치해줍니다. ?? = null 병합 연산자
  const [authType, authToken] = (Authorization ?? "").split(" ");
  //authtype === bearer 인지 확인
  //authtoken 검증
  if (authType !== "Bearer" || !authToken) {
    res.status(400).json({ err: "로그인 후에 이용 가능" });
    return;
  }
  //jwt validation (검증)
  //1. authToken 만료 확인 (.verify)
  //2. 서버가 발급 토큰이 맞는지 검증 (.verify)
  //3. userId 해당 사용자가 DB 에 존재하는지 확인
  try {
    const { userId } = jwt.verify(authToken, "secret-key"); //1,2
    const user = await User.findById(userId); //3
    res.locals.user = user; // locals? 3
    next(); // middle ware pass
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: "로그인 후에 이용 가능" });
  }
};
