const express = require("express");
const prisma = require("../lib/prisma");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, department, year } = req.body;

    const user = await prisma.user.create({
      data: {
        name,
        email,
        department,
        year,
      },
    });

    res.status(201).json(user);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create user",
    });
  }
});

router.get("/", async (req, res) => {
  res.json({
    message: "Users route working 🚀"
  });
});

module.exports = router;