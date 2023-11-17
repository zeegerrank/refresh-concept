require("dotenv").config();const express = require("express");
const app = express();

const mongoose = require("mongoose");

app.use(express.json());

//**routes */
app.post("/", (req, res) => {
  return res.status(200).send({ message: "Hello express" });
});

app.use("/api/auth", require("./routes/auth.routes"));

//**connections */
const DB_SECRET = process.env.DB_SECRET;
try {
  mongoose.connect(
    `mongodb+srv://zeegerrank:${DB_SECRET}@cluster0.zvjihnh.mongodb.net/refresh-concept?retryWrites=true&w=majority`
  );
} catch (err) {
  return console.log(err);
}

//**database connect first, then server */
mongoose.connection.once("open", () => {
  console.log("Database is connected!");
  const PORT = 3500 || process.env.PORT;
  try {
    app.listen(PORT, () => {
      console.log("Server is listening on", PORT);
    });
  } catch (err) {
    return console.log(err);
  }
});
