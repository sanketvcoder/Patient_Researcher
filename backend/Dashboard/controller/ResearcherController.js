import axios from "axios";

export const researcherDashboardClincalTrial = async (req, res) => {
    try {
        const email = req.cookies?.userEmail;
        console.log("Retrieved email from cookie:", email);

        if (!email) {
        return res.status(400).json({ message: "Email is required (cookie not found)" });
        }

        const profileResponse = await axios.post(
        "http://localhost:3000/api/researchers/email",
        { email },
        {
            withCredentials: true,
        }
        );

        const researcherData = profileResponse.data;

        if (!researcherData || !researcherData.interest || researcherData.interest.length === 0) {
        return res.status(404).json({ message: "No interest information found for this researcher" });
        }

        const interestName = researcherData.interest[0];

        const trialsResponse = await axios.get(
        `https://clinicaltrials.gov/api/v2/studies?query.term=${encodeURIComponent(interestName)}`
        );

        const trials = trialsResponse.data.studies || [];

        res.status(200).json({
        researcher: researcherData,
        interestQueried: interestName,
        totalTrials: trials.length,
        trials: trials.slice(0, 10),
        });
    } catch (error) {
        console.error("Error in ResearcherDashboard:", error.response?.data || error.message, error.stack);
        res.status(500).json({
        message: "Failed to load dashboard data",
        error: error.response?.data || error.message,
        });
    }
};

export const researcherProfile = async (req, res) => {
    try {
        const email = req.cookies?.userEmail;
        if (!email) {
        return res.status(400).json({ message: "Researcher email not found in cookie" });
        }

        const profileResponse = await axios.post(
        "http://localhost:3000/api/researchers/email/",
        { email },
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
        );

        res.status(200).json(profileResponse.data);
    } catch (error) {
        console.error("❌ Error fetching researcher profile:", error.message);
        res.status(500).json({ message: "Failed to fetch researcher profile" });
    }
}

export const researcherPublication = async (req, res) => {
    try {
        const email = req.cookies?.userEmail;
        if (!email) {
        return res.status(400).json({ message: "Researcher email not found in cookie" });
        }

        // 1️⃣ Fetch researcher info
        const profileResponse = await axios.post(
        "http://localhost:3000/api/researchers/email/",
        { email },
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
        );

        const researcherData = profileResponse.data;
        const interest = researcherData?.interest?.[0];

        if (!interest) {
        return res.status(404).json({ message: "No interest found for this researcher" });
        }

        // 2️⃣ Ask publication server for related papers
        const publicationResponse = await axios.get(
        `http://localhost:3001/api/publications?query=${encodeURIComponent(interest)}`
        );

        res.status(200).json({
        topic: interest,
        publications: publicationResponse.data,
        });
    } catch (error) {
        console.error("❌ Error fetching researcher publications:", error.message);
        res.status(500).json({ message: "Failed to fetch researcher publications" });
    }
};