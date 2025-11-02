// controllers/publicationController.js
import scholar from 'google-scholar';

// Controller function
export const getPublications = async (req, res) => {
  try {
    const { query, page = 1 } = req.query;

    if (!query) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    // Fetch results from google-scholar
    const resultsObj = await scholar.search(query);

    // Limit results to 10 per page
    const startIndex = (page - 1) * 10;
    const endIndex = startIndex + 10;
    const paginatedResults = resultsObj.results.slice(startIndex, endIndex);

    // Pagination metadata
    const totalPages = Math.ceil(resultsObj.results.length / 10);

    res.status(200).json({
      page: Number(page),
      totalPages,
      totalResults: resultsObj.results.length,
      results: paginatedResults,
    });
  } catch (error) {
    console.error('Error fetching publications:', error);
    res.status(500).json({ error: error.message });
  }
};
