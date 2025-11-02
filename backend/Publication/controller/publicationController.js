import { ApifyClient } from "apify-client";
import { apifyToken } from "../config/config.js";

const client = new ApifyClient({
  token: apifyToken,
});

export const getPublications = async (req, res) => {
  try {
    const query = req.query.query || "Sanket Kumar Verma";
    console.log(`🔎 Fetching publications for: ${query}`);

    const run = await client.actor("marco.gullo/google-scholar-scraper").call({
      keyword: query,
      maxResults: 10,
      proxyOptions: { useApifyProxy: true }, // or false if free plan
    });

    // Wait for dataset to be ready
    await new Promise(resolve => setTimeout(resolve, 8000));

    const { items } = await client.dataset(run.defaultDatasetId).listItems();
    console.log(`📚 Found ${items.length} publications`);
    res.status(200).json(items);
  } catch (error) {
    console.error("❌ Error fetching publications:", error);
    res.status(500).json({ error: "Failed to fetch publications" });
  }
};
