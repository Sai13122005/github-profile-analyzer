const axios = require("axios");

const fetchGithubProfile = async (username) => {
  const headers = {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
  };

  const userResponse = await axios.get(
    `https://api.github.com/users/${username}`,
    { headers }
  );

  const repoResponse = await axios.get(
    `https://api.github.com/users/${username}/repos`,
    { headers }
  );

  return {
    user: userResponse.data,
    repos: repoResponse.data
  };
};

module.exports = fetchGithubProfile;