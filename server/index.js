const express = require("express");
const app = express();

app.use(express.json());

app.post("/", (req, res) => {
  return res.status(200).send({ message: "Hello express" });
});

const PORT = 3500;
app.listen(PORT, () => {
  console.log("Server is listening on", PORT);
});
