const express = require("express");
const prisma = require("../lib/prisma");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      difficulty,
      xpReward,
    } = req.body;

    const quest = await prisma.quest.create({
      data: {
        title,
        description,
        category,
        difficulty,
        xpReward,
      },
    });

    res.status(201).json(quest);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create quest",
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const quests = await prisma.quest.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(quests);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch quests",
    });
  }
});

module.exports = router;