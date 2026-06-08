const db = require("../config/db");
const fetchGithubProfile = require("../services/githubService");
const calculateInsights = require("../utils/calculateInsights");

exports.analyzeProfile = async (req, res) => {
  try {
    const username = req.params.username;

    const { user, repos } = await fetchGithubProfile(username);

    const insights = calculateInsights(user, repos);

    const sql =`
INSERT INTO github_profiles (
  github_username,
  name,
  bio,
  followers,
  following_count,
  public_repos,
  total_stars,
  total_forks,
  most_used_language,
  top_repo,
  profile_score,
  github_created_at
)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)

ON DUPLICATE KEY UPDATE
name = VALUES(name),
bio = VALUES(bio),
followers = VALUES(followers),
following_count = VALUES(following_count),
public_repos = VALUES(public_repos),
total_stars = VALUES(total_stars),
total_forks = VALUES(total_forks),
most_used_language = VALUES(most_used_language),
top_repo = VALUES(top_repo),
profile_score = VALUES(profile_score),
github_created_at = VALUES(github_created_at)
`;

    const values = [
      user.login,
      user.name,
      user.bio,
      user.followers,
      user.following,
      user.public_repos,
      insights.totalStars,
      insights.totalForks,
      insights.mostUsedLanguage,
      insights.topRepo,
      insights.profileScore,
      new Date(user.created_at)
    ];

    db.query(sql, values, (err) => {
      if (err) {
        return res.status(500).json({
          message: err.message
        });
      }

      res.status(201).json({
  success: true,
  message: "GitHub profile analyzed successfully",
  profile: {
    username: user.login,
    name: user.name,
    followers: user.followers,
    publicRepos: user.public_repos,
    profileUrl: user.html_url
  },
  insights
});
    });
  } catch (error) {
  console.log(error);

  res.status(500).json({
    success: false,
    message: error.message
  });
}
};

exports.getAllProfiles = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;

  const offset = (page - 1) * limit;

  const sql = `
    SELECT * FROM github_profiles
    LIMIT ? OFFSET ?
  `;

  db.query(sql, [limit, offset], (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: err.message
      });
    }

    res.json({
      success: true,
      page,
      limit,
      count: results.length,
      profiles: results
    });
  });
};

exports.getSingleProfile = (req, res) => {
  const username = req.params.username;

  db.query(
    "SELECT * FROM github_profiles WHERE github_username = ?",
    [username],
    (err, results) => {
      if (err) {
        return res.status(500).json({
          message: err.message
        });
      }

      if (results.length === 0) {
        return res.status(404).json({
          message: "Profile not found"
        });
      }

      res.json(results[0]);
    }
  );
};
exports.deleteProfile = (req, res) => {
  const username = req.params.username;

  db.query(
    "DELETE FROM github_profiles WHERE github_username = ?",
    [username],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err.message
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "Profile not found"
        });
      }

      res.json({
        success: true,
        message: "Profile deleted successfully"
      });
    }
  );
};
exports.searchProfiles = (req, res) => {
  const username = req.query.username;

  const sql = `
    SELECT * FROM github_profiles
    WHERE github_username LIKE ?
  `;

  db.query(sql, [`%${username}%`], (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: err.message
      });
    }

    res.json({
      success: true,
      count: results.length,
      profiles: results
    });
  });
};