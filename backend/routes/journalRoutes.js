const express = require("express");
const router = express.Router();

const Journal = require("../models/Journal");
const analyzeEmotion = require("../services/geminiService");

// CREATE JOURNAL
router.post("/", async (req, res) => {
  try {
    const { userId, ambience, text } = req.body;

    const journal = new Journal({
      userId,
      ambience,
      text,
    });

    await journal.save();

    res.json(journal);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ENTRIES
router.get("/:userId", async (req, res) => {
  try {
    const entries = await Journal.find({ userId: req.params.userId });

    res.json(entries);
  } catch (err) {
    res.status(500).json(err);
  }
});

// ANALYZE
router.post("/analyze", async (req, res) => {
try {

const { text } = req.body;

// analyze using Gemini
const result = await analyzeEmotion(text);

// update journal entry
const journal = await Journal.findOneAndUpdate(
 { text: text },
 {
   emotion: result.emotion,
   keywords: result.keywords,
   summary: result.summary
 },
{ returnDocument: "after" }
);

res.json(result);

} catch (err) {
res.status(500).json(err);
}
});

// INSIGHTS
router.get("/insights/:userId", async (req, res) => {
  try {
    const entries = await Journal.find({ userId: req.params.userId });

    const totalEntries = entries.length;

    const emotionCount = {};
    const ambienceCount = {};
    let keywords = [];

    entries.forEach((e) => {
      if (e.emotion) {
        emotionCount[e.emotion] = (emotionCount[e.emotion] || 0) + 1;
      }

      ambienceCount[e.ambience] = (ambienceCount[e.ambience] || 0) + 1;

      if (e.keywords) {
        keywords.push(...e.keywords);
      }
    });

    const topEmotion = Object.keys(emotionCount).reduce(
      (a, b) => (emotionCount[a] > emotionCount[b] ? a : b),
      null,
    );

    const mostUsedAmbience = Object.keys(ambienceCount).reduce(
      (a, b) => (ambienceCount[a] > ambienceCount[b] ? a : b),
      null,
    );

    res.json({
      totalEntries,
      topEmotion,
      mostUsedAmbience,
      recentKeywords: keywords.slice(-5),
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/mood-stats/:userId", async (req, res) => {
  try {
    const stats = await Journal.aggregate([
      { $match: { userId: req.params.userId } },
      {
        $group: {
          _id: "$emotion",
          count: { $sum: 1 }
        }
      }
    ]);

    res.json(stats);

  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
