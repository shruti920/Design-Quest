require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
 res.send("Design Quest API");
});

const PORT = 5000;

app.listen(PORT, () => {
 console.log(`Server running on ${PORT}`);
});

const testRoutes =
 require("./routes/testRoutes");

app.use("/api/test", testRoutes);

const userRoutes =
require("./routes/userRoutes");

app.use(
"/api/users",
userRoutes
);

const seasonRoutes =
require("./routes/seasonRoutes");

app.use(
"/api/seasons",
seasonRoutes
);

const participantRoutes =
require("./routes/seasonParticipantRoutes");

app.use(
"/api/participants",
participantRoutes
);

const questRoutes =
require("./routes/questRoutes");

app.use(
"/api/quests",
questRoutes
);

const submissionRoutes =
require("./routes/submissionRoutes");

app.use(
"/api/submissions",
submissionRoutes
);

const leaderboardRoutes =
require("./routes/leaderboardRoutes");

app.use(
"/api/leaderboard",
leaderboardRoutes
);

const progressRoutes =
require(
"./routes/progressRoutes"
);

app.use(
"/api/progress",
progressRoutes
);