const express = require("express");

const router = express.Router();

const {
  analyzeProfile,
  getAllProfiles,
  getSingleProfile,
  deleteProfile,
  searchProfiles
} = require("../controllers/githubController");
/**
 * @swagger
 * /api/github/analyze/{username}:
 *   post:
 *     summary: Analyze GitHub profile
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Profile analyzed successfully
 */
router.post("/analyze/:username", analyzeProfile);
/**
 * @swagger
 * /api/github/profiles:
 *   get:
 *     summary: Get all analyzed profiles
 *     responses:
 *       200:
 *         description: List of profiles
 */
router.get("/profiles", getAllProfiles);
/**
 * @swagger
 * /api/github/profile/{username}:
 *   get:
 *     summary: Get single profile
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Single profile data
 */
router.get("/profile/:username", getSingleProfile);
/**
 * @swagger
 * /api/github/profile/{username}:
 *   delete:
 *     summary: Delete profile
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Profile deleted
 */
router.delete("/profile/:username", deleteProfile);
/**
 * @swagger
 * /api/github/search:
 *   get:
 *     summary: Search profiles
 *     parameters:
 *       - in: query
 *         name: username
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Search results
 */
router.get("/search", searchProfiles);
module.exports = router;