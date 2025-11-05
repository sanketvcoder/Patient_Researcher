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



export const getPatientPublications = async (req, res) => {
  try {
    const email = req.cookies?.patientEmail;

    if (!email) {
      return res.status(400).json({ message: "Patient email not found in cookie" });
    }

    // Step 1️⃣ — Fetch patient data
    const patientResponse = await axios.post(
      "http://localhost:3000/api/patients/email/",
      { email },
      { headers: { "Content-Type": "application/json" }, withCredentials: true }
    );

    const patientData = patientResponse.data;
    const disease = patientData?.diseases?.[0];

    if (!disease) {
      return res.status(404).json({ message: "No disease found for this patient" });
    }

    console.log(`🔎 Fetching publications for disease: ${disease}`);

    // Step 2️⃣ — Fetch publications from Apify (Google Scholar)
    const run = await client.actor("marco.gullo/google-scholar-scraper").call({
      keyword: disease,
      maxResults: 10,
      proxyOptions: { useApifyProxy: true },
    });

    await new Promise(resolve => setTimeout(resolve, 8000));

    const { items } = await client.dataset(run.defaultDatasetId).listItems();

    res.status(200).json({
      email,
      topic: disease,
      total: items.length,
      publications: items,
    });

  } catch (error) {
    console.error("❌ Error fetching patient publications:", error);
    res.status(500).json({ message: "Failed to fetch patient publications" });
  }
};



export const getResearcherPublications = async (req, res) => {
  try {
    const email = req.cookies?.researcherEmail;

    if (!email) {
      return res.status(400).json({ message: "Researcher email not found in cookie" });
    }

    // Step 1️⃣ — Fetch researcher data
    const researcherResponse = await axios.post(
      "http://localhost:3000/api/researchers/email/",
      { email },
      { headers: { "Content-Type": "application/json" }, withCredentials: true }
    );

    const researcherData = researcherResponse.data;
    const interest = researcherData?.interest?.[0];

    if (!interest) {
      return res.status(404).json({ message: "No interest found for this researcher" });
    }

    console.log(`🔎 Fetching publications for interest: ${interest}`);

    // Step 2️⃣ — Fetch publications
    const run = await client.actor("marco.gullo/google-scholar-scraper").call({
      keyword: interest,
      maxResults: 10,
      proxyOptions: { useApifyProxy: true },
    });

    await new Promise(resolve => setTimeout(resolve, 8000));

    const { items } = await client.dataset(run.defaultDatasetId).listItems();

    res.status(200).json({
      email,
      topic: interest,
      total: items.length,
      publications: items,
    });

  } catch (error) {
    console.error("❌ Error fetching researcher publications:", error);
    res.status(500).json({ message: "Failed to fetch researcher publications" });
  }
};