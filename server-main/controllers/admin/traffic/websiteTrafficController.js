const { google } = require("googleapis");
const analyticsData = google.analyticsdata("v1beta");
const GA_PROPERTY_ID = process.env.GA_PROPERTY_ID;

function getFirstDayOfCurrentMonth() {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-01`;
}

async function getTraffic(req, res) {
  try {
    if (!process.env.GOOGLE_PRIVATE_KEY || !process.env.GOOGLE_CLIENT_EMAIL || !GA_PROPERTY_ID) {
      return res.status(400).json({ error: 'Missing required environment variables' });
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'), 
        client_email: process.env.GOOGLE_CLIENT_EMAIL, 
      },
      scopes: "https://www.googleapis.com/auth/analytics.readonly",
    });

    const client = await auth.getClient();

    const allTimeResponse = await analyticsData.properties.runReport({
      property: `properties/${GA_PROPERTY_ID}`,
      requestBody: {
        dateRanges: [{ startDate: "2024-01-01", endDate: "today" }],
        metrics: [{ name: "screenPageViews" }],
      },
      auth: client,
    });

    const allTimePageViews = allTimeResponse.data.rows?.[0]?.metricValues?.[0]?.value || 0;

    const firstDayOfMonth = getFirstDayOfCurrentMonth();
    const currentMonthResponse = await analyticsData.properties.runReport({
      property: `properties/${GA_PROPERTY_ID}`,
      requestBody: {
        dateRanges: [{ startDate: firstDayOfMonth, endDate: "today" }],
        metrics: [{ name: "screenPageViews" }],
      },
      auth: client,
    });

    const monthPageViews = currentMonthResponse.data.rows?.[0]?.metricValues?.[0]?.value || 0;

    const data = {
      month: { views: monthPageViews },
      allTime: { views: allTimePageViews },
    };

    res.json(data);
  } catch (error) {
    console.error('Error fetching traffic data:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
}

module.exports = {
  getTraffic,
};
