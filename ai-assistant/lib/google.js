import axios from 'axios';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;

// 1. Exchange authorization code for tokens
export async function getGoogleOAuthTokens(code) {
  const res = await axios.post("https://oauth2.googleapis.com/token", null, {
    params: {
      code,
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      redirect_uri: GOOGLE_REDIRECT_URI,
      grant_type: "authorization_code",
    },
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  return res.data; 
}

// 2. Get user info from Google
export async function getUserInfoFromGoogle(accessToken) {
  const res = await axios.get("https://www.googleapis.com/oauth2/v2/userinfo", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return res.data; 
}

// 3. Fetch Calendar events for a date
export async function fetchGoogleCalendarEvents(date, accessToken) {
  const timeMin = new Date(`${date}T00:00:00Z`).toISOString();
  const timeMax = new Date(`${date}T23:59:59Z`).toISOString();

  const res = await axios.get(
    `https://www.googleapis.com/calendar/v3/calendars/primary/events`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
      params: {
        timeMin,
        timeMax,
        singleEvents: true,
        orderBy: 'startTime',
      },
    }
  );

  return res.data.items.map((event) => ({
    summary: event.summary,
    start: event.start.dateTime || event.start.date,
    end: event.end.dateTime || event.end.date,
  }));
}

