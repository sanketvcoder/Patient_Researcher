import axios from "axios";

export const patientDashboardClincalTrial = async (req, res) => {
    try {
        const email = req.cookies?.patientEmail;
        console.log("Retrieved email from cookie:", email);
        if (!email) {
        return res.status(400).json({ message: "Email is required (cookie not found)" });
        }

        
        const profileResponse = await axios.post(
        "http://localhost:3000/api/patients/email/",
        { email },
        {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
        }
        );

        const patientData = profileResponse.data;

        if (!patientData || !patientData.diseases || patientData.diseases.length === 0) {
        return res.status(404).json({ message: "No disease information found for this user" });
        }

        const diseaseName = patientData.diseases[0];

        const trialsResponse = await axios.get(
        `https://clinicaltrials.gov/api/v2/studies?query.term=${encodeURIComponent(diseaseName)}`
        );

        const trials = trialsResponse.data.studies || [];

        res.status(200).json({
        patient: patientData,
        diseaseQueried: diseaseName,
        totalTrials: trials.length,
        trials: trials.slice(0, 10),
        });
    } catch (error) {
        console.error("Error in patientDashboard:", error.message);
        res.status(500).json({ message: "Failed to load dashboard data" });
    }
};

export const patientProfile = async (req, res) => {
    try {
        const email = req.cookies?.patientEmail;
        if (!email) {
        return res.status(400).json({ message: "Patient email not found in cookie" });
        }

        const profileResponse = await axios.post(
        "http://localhost:3000/api/patients/email/",
        { email },
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
        );

        res.status(200).json(profileResponse.data);
    } catch (error) {
        console.error("Error fetching patient profile:", error.message);
        res.status(500).json({ message: "Failed to fetch patient profile" });
    }
}


export const patientPublication = async (req, res) => {
  try {
    const email = req.cookies?.patientEmail;
    if (!email) {
      return res.status(400).json({ message: "Patient email not found in cookie" });
    }

    // 1️⃣ Fetch patient info
    const profileResponse = await axios.post(
      "http://localhost:3000/api/patients/email/",
      { email },
      { headers: { "Content-Type": "application/json" }, withCredentials: true }
    );

    const patientData = profileResponse.data;
    const disease = patientData?.diseases?.[0];

    if (!disease) {
      return res.status(404).json({ message: "No disease found for this patient" });
    }

    // 2️⃣ Ask publication server for related papers
    const publicationResponse = await axios.get(
      `http://localhost:3001/api/publications?query=${encodeURIComponent(disease)}`
    );

    res.status(200).json({
      topic: disease,
      publications: publicationResponse.data,
    });
  } catch (error) {
    console.error("❌ Error fetching patient publications:", error.message);
    res.status(500).json({ message: "Failed to fetch patient publications" });
  }
};



export const patientToKnowExpert = async (req, res) => {
  try {
    const email = req.cookies?.patientEmail;
    if (!email) {
      return res.status(400).json({ message: "Patient email not found in cookie" });
    }

    // 1️⃣ Fetch patient profile from profile server
    const profileResponse = await axios.post(
      "http://localhost:3000/api/patients/email/",
      { email },
      { headers: { "Content-Type": "application/json" }, withCredentials: true }
    );

    const patientData = profileResponse.data;
    const diseaseName = patientData?.diseases?.[0];

    if (!diseaseName) {
      return res.status(404).json({ message: "No disease found for this patient" });
    }

    // 2️⃣ Fetch experts using OpenAlex API (limit 10)
    const openAlexUrl = `https://api.openalex.org/authors?filter=display_name.search:${encodeURIComponent(
      diseaseName
    )}&per-page=10`;

    const expertResponse = await axios.get(openAlexUrl);
    const expertsData = expertResponse.data?.results || [];

    // 3️⃣ Format the expert data
    const experts = expertsData.slice(0, 10).map((exp) => ({
      name: exp.display_name || "Unknown Expert",
      email: exp?.email || "Not available",
      field:
        exp?.x_concepts && exp.x_concepts.length > 0
          ? exp.x_concepts[0].display_name
          : "General Medicine",
      institution: exp?.last_known_institution?.display_name || "Independent Researcher",
      works_count: exp?.works_count || 0,
      citations: exp?.cited_by_count || 0,
      info: `Expert with ${exp.works_count} publications and ${exp.cited_by_count} citations in ${
        exp.x_concepts?.[0]?.display_name || "Medical Research"
      }`,
      profile_link: exp?.id ? `https://openalex.org/${exp.id.split("/").pop()}` : null,
    }));

    // 4️⃣ Send response
    res.status(200).json({
      patient: patientData.name,
      disease: diseaseName,
      totalExperts: experts.length,
      experts,
    });
  } catch (error) {
    console.error("❌ Error fetching expert data:", error.message);
    res.status(500).json({ message: "Failed to fetch expert data" });
  }
};

