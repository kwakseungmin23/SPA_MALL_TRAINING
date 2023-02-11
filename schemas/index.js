const mongoose = require("mongoose");
mongoose.set("debug", true);
const connect = () => {
  mongoose
    .set("strictQuery", true)
    .connect(
      "mongodb+srv://Seungmin_Kwak:rhkrtmdals98@cluster0.3hbka9r.mongodb.net/MongPrac"
    )
    .catch((err) => console.log(err));
};

mongoose.connection.on("error", (err) => {
  console.error("몽고디비 연결 에러", err);
});

module.exports = connect;
