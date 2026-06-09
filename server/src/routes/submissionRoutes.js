const express = require("express");
const prisma = require("../lib/prisma");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { userId, questId, answer } = req.body;

    const submission = await prisma.submission.create({
      data: {
        userId,
        questId,
        answer,
      },
    });

    res.status(201).json(submission);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to submit quest",
    });
  }
});

module.exports = router;