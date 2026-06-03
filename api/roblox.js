module.exports = async function handler(req, res) {
  try {
    if (req.method !== "GET") {
      res.status(405).json({ error: "Method not allowed" });
      return;
    }

    const username = String(req.query.username || "").trim();

    if (!username || username.length < 3 || username.length > 30) {
      res.status(400).json({ error: "Invalid Roblox username" });
      return;
    }

    const userResponse = await fetch("https://users.roblox.com/v1/usernames/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "EgoIndex/1.0"
      },
      body: JSON.stringify({
        usernames: [username],
        excludeBannedUsers: false
      })
    });

    if (!userResponse.ok) {
      res.status(502).json({ error: "Roblox username API failed" });
      return;
    }

    const userJson = await userResponse.json();
    const user = userJson.data && userJson.data[0];

    if (!user) {
      res.status(404).json({ error: "Roblox user not found" });
      return;
    }

    const thumbnailUrl =
      "https://thumbnails.roblox.com/v1/users/avatar-headshot" +
      `?userIds=${encodeURIComponent(user.id)}` +
      "&size=420x420&format=Png&isCircular=false";

    const thumbnailResponse = await fetch(thumbnailUrl, {
      headers: { "User-Agent": "EgoIndex/1.0" }
    });

    let avatarUrl = null;

    if (thumbnailResponse.ok) {
      const thumbnailJson = await thumbnailResponse.json();
      const thumbnail = thumbnailJson.data && thumbnailJson.data[0];
      avatarUrl = thumbnail && thumbnail.imageUrl ? thumbnail.imageUrl : null;
    }

    res.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate=604800");

    res.status(200).json({
      id: user.id,
      username: user.name,
      displayName: user.displayName,
      avatarUrl,
      profileUrl: `https://www.roblox.com/users/${user.id}/profile`
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
      details: error.message
    });
  }
};
