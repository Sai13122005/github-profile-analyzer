const calculateInsights = (user, repos) => {
  let totalStars = 0;
  let totalForks = 0;

  const languageCount = {};

  repos.forEach((repo) => {
    totalStars += repo.stargazers_count;
    totalForks += repo.forks_count;

    if (repo.language) {
      languageCount[repo.language] =
        (languageCount[repo.language] || 0) + 1;
    }
  });

  const mostUsedLanguage =
    Object.keys(languageCount).sort(
      (a, b) => languageCount[b] - languageCount[a]
    )[0] || "None";

  const topRepo =
    repos.sort((a, b) => b.stargazers_count - a.stargazers_count)[0]
      ?.name || "None";

  const profileScore =
    user.followers +
    totalStars +
    user.public_repos * 2;

  return {
    totalStars,
    totalForks,
    mostUsedLanguage,
    topRepo,
    profileScore
  };
};

module.exports = calculateInsights;