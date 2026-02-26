const { getSocialLinksCollection } = require("../config/db");

const SocialLinksCollection = getSocialLinksCollection();

// 🔹 URL Validation Patterns
const validateSocialUrl = (platform, url) => {
  const patterns = {
    facebook: /^(https?:\/\/)?(www\.)?facebook\.com\/.+/i,
    youtube: /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/i,
    instagram: /^(https?:\/\/)?(www\.)?instagram\.com\/.+/i,
    twitter: /^(https?:\/\/)?(www\.)?(twitter\.com|x\.com)\/.+/i,
    linkedin: /^(https?:\/\/)?(www\.)?linkedin\.com\/.+/i,
    tiktok: /^(https?:\/\/)?(www\.)?tiktok\.com\/.+/i,
    whatsapp: /^(https?:\/\/)?(wa\.me|api\.whatsapp\.com)\/.+/i,
  };

  return patterns[platform]?.test(url);
};


// 🔥 UPDATE / REMOVE SOCIAL LINK
const updateSocialLinks = async (req, res) => {
  const { platform, url } = req.body;

  const allowedPlatforms = [
    "facebook",
    "youtube",
    "instagram",
    "twitter",
    "linkedin",
    "tiktok",
    "whatsapp",
  ];

  if (!allowedPlatforms.includes(platform)) {
    return res.status(400).json({ error: "Invalid platform" });
  }

  try {
    // 🔥 যদি empty আসে → delete করে দিবো
    if (!url || url.trim() === "") {
      const deleteResult = await SocialLinksCollection.deleteOne({ platform });

      return res.json({
        success: true,
        deleted: deleteResult.deletedCount > 0,
        message: `${platform} link removed successfully`,
      });
    }

    // 🔥 URL validation only if URL exists
    if (!validateSocialUrl(platform, url)) {
      return res
        .status(400)
        .json({ error: `Invalid ${platform} URL format` });
    }

    // 🔥 Upsert (add or update)
    const result = await SocialLinksCollection.updateOne(
      { platform },
      {
        $set: {
          platform,
          url,
          updatedAt: new Date().toISOString(),
        },
      },
      { upsert: true }
    );

    res.json({
      success: true,
      acknowledged: result.acknowledged,
      message: `${platform} link updated successfully`,
    });

  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ error: "Failed to update link" });
  }
};


// 🔹 Get All Links
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


module.exports = {
  updateSocialLinks,
  getSocialLinks,
};