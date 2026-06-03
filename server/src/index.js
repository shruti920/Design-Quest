const express = require("express");
const cors = require("cors");

const app = express();
const userRoutes = require("./routes/userRoutes");

app.use("/api/users", userRoutes);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Design Quest API Running ");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});