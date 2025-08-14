const { getSocialLinksCollection } = require("../config/db");

const SocialLinksCollection = getSocialLinksCollection();

const validateSocialUrl = (platform, url) => {
  const patterns = {
    facebook: /^(https?:\/\/)?(www\.)?facebook\.com\/.+/i,
    youtube: /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/i,
  };
  return patterns[platform].test(url);
};

const updateSocialLinks = async (req, res) => {
  const { platform, url } = req.body;

  if (!["facebook", "youtube"].includes(platform)) {
    return res.status(400).json({ error: "Invalid platform" });
  }

  if (!validateSocialUrl(platform, url)) {
    return res.status(400).json({ error: `Invalid ${platform} URL format` });
  }

  try {
    await SocialLinksCollection.updateOne(
      { platform },
      { $set: { url } },
      { upsert: true }
    );
    res.json({
      success: true,
      message: `${platform} link updated successfully`,
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ error: "Failed to update link" });
  }
};

const getSocialLinks = async (req, res) => {
  try {
    const links = await SocialLinksCollection.find().toArray();
    const result = links.reduce((acc, curr) => {
      acc[curr.platform] = curr.url;
      return acc;
    }, {});
    res.json(result);
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ error: "Failed to fetch links" });
  }
};

module.exports = { updateSocialLinks, getSocialLinks };
